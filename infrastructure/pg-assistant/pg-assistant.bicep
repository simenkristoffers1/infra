@description('The location for the resource(s) to be deployed')
param location string = resourceGroup().location

resource pg_assistant 'Microsoft.DBforPostgreSQL/flexibleServers@2024-08-01' = {
  name: 'pg-assistant'
  location: location
  properties: {
    authConfig: {
      activeDirectoryAuth: 'Enabled'
      passwordAuth: 'Disabled'
    }
    availabilityZone: '1'
    backup: {
      backupRetentionDays: 7
      geoRedundantBackup: 'Disabled'
    }
    highAvailability: {
      mode: 'Disabled'
    }
    storage: {
      storageSizeGB: 32
    }
    version: '16'
  }
  sku: {
    name: 'Standard_B1ms'
    tier: 'Burstable'
  }
  tags: {
    'aspire-resource-name': 'pg-assistant'
  }
}

resource postgreSqlFirewallRule 'Microsoft.DBforPostgreSQL/flexibleServers/firewallRules@2024-08-01' = {
  name: 'AllowAllAzureIps'
  properties: {
    startIpAddress: '0.0.0.0'
    endIpAddress: '0.0.0.0'
  }
  parent: pg_assistant
}

resource assistantdb 'Microsoft.DBforPostgreSQL/flexibleServers/databases@2024-08-01' = {
  name: 'assistantdb'
  parent: pg_assistant
}

resource pg_azure_extensions 'Microsoft.DBforPostgreSQL/flexibleServers/configurations@2024-08-01' = {
  name: 'azure.extensions'
  parent: pg_assistant
  properties: {
    value: 'VECTOR,UUID-OSSP'
    source: 'user-override'
  }
}

output connectionString string = pg_assistant.properties.fullyQualifiedDomainName
output name string = pg_assistant.name
