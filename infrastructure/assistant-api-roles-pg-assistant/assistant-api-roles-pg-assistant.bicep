param pg_assistant_outputs_name string

param principalId string

param principalName string

resource pg_assistant 'Microsoft.DBforPostgreSQL/flexibleServers@2024-08-01' existing = {
  name: pg_assistant_outputs_name
}

resource pg_assistant_admin 'Microsoft.DBforPostgreSQL/flexibleServers/administrators@2024-08-01' = {
  name: principalId
  properties: {
    principalName: principalName
    principalType: 'ServicePrincipal'
  }
  parent: pg_assistant
}
