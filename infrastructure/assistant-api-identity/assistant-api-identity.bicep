@description('The location for the resource(s) to be deployed.')
param location string = resourceGroup().location

resource assistant_api_identity 'Microsoft.ManagedIdentity/userAssignedIdentities@2023-01-31' = {
  name: take('assistant_api_identity-${uniqueString(resourceGroup().id)}', 128)
  location: location
}

output id string = assistant_api_identity.id

output clientId string = assistant_api_identity.properties.clientId

output principalId string = assistant_api_identity.properties.principalId

output principalName string = assistant_api_identity.name
