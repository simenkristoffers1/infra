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

module keyvault './keyvault/keyvault.bicep' = {
  name: 'keyvault'
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

module aca_env './aca-env/aca-env.bicep' = {
  name: 'aca-env'
  scope: rg
  params: {
    location: location
  }
}

module assistant_api_identity './assistant-api-identity/assistant-api-identity.bicep' = {
  name: 'assistant-api-identity'
  scope: rg
  params: {
    location: location
  }
}

module assistant_api_roles_pg_assistant './assistant-api-roles-pg-assistant/assistant-api-roles-pg-assistant.bicep' = {
  name: 'assistant-api-roles-pg-assistant'
  scope: rg
  params: {
    pg_assistant_outputs_name: pgAssistant.outputs.name
    principalId: assistant_api_identity.outputs.principalId
    principalName: assistant_api_identity.outputs.principalName
  }
}

module assistant_api_roles_keyvault './assistant-api-roles-keyvault/assistant-api-roles-keyvault.bicep' = {
  name: 'assistant-api-roles-keyvault'
  scope: rg
  params: {
    keyvault_outputs_name: keyvault.outputs.name
    principalId: assistant_api_identity.outputs.principalId
  }
}

module assistant_api './assistant-api/assistant-api.bicep' = {
  name: 'assistant-api'
  scope: rg
  params: {
    assistant_api_identity_outputs_client_id: assistant_api_identity.outputs.clientId
    aca_env_outputs_azure_container_apps_environment_id: aca_env.outputs.AZURE_CONTAINER_APPS_ENVIRONMENT_ID
    aca_env_outputs_azure_container_registry_endpoint: aca_env.outputs.AZURE_CONTAINER_REGISTRY_ENDPOINT
    aca_env_outputs_azure_container_registry_managed_identity_id: aca_env.outputs.AZURE_CONTAINER_REGISTRY_MANAGED_IDENTITY_ID
    assistant_api_containerimage: 'assistant-api'
    assistant_api_containerport: 8000
    assistant_api_identity_outputs_id: assistant_api_identity.outputs.id
  }
}



