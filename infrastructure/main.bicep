// Naming conventions for Azure resources
// https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-naming

// Abbreviation recommendations for Azure resources
// https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ready/azure-best-practices/resource-abbreviations

targetScope = 'subscription'

@description('The name of the project')
param projectName string = 'gaia'

@description('The environment for the resource(s) to be deployed')
param environment string = 'dev'

@description('The location for the resource(s) to be deployed')
param location string = 'northeurope'

resource rg 'Microsoft.Resources/resourceGroups@2024-11-01' = {
    name: 'rg-${projectName}-${environment}-${location}'
    location: location
}

module aca_env './aca-env/aca-env.bicep' = {
  name: 'aca-env'
  scope: rg
  params: {
    location: location
  }
}

module serviceBus './service-bus/service-bus.bicep' = {
  name: 'service-bus'
  scope: rg
}

module pgAssistant './pg-assistant/pg-assistant.bicep' = {
  name: 'pg-assistant'
  scope: rg
}


