

resource openai_service 'Microsoft.CognitiveServices/accounts@2024-10-01' = {
  name: take('oai-${uniqueString(resourceGroup().id)}', 50)
  location: resourceGroup().location
  sku: {
      name: 'S0'
  }
  kind: 'OpenAI'
  properties: {}
}

resource openai_deployment_gpt_4_1 'Microsoft.CognitiveServices/accounts/deployments@2024-10-01' = {
  name: 'gpt-4.1'
  parent: openai_service
  sku: {
    name: 'GlobalStandard'
    capacity: 50
  }
  properties: {
    model: {
      format: 'OpenAI'
      name: 'gpt-4.1'
      version: '2025-04-14'
    }
    versionUpgradeOption: 'OnceNewDefaultVersionAvailable'
    currentCapacity: 50
    raiPolicyName: 'Microsoft.DefaultV2'
  }
}

resource openai_deployment_gpt_4_1_mini 'Microsoft.CognitiveServices/accounts/deployments@2024-10-01' = {
  name: 'gpt-4.1-mini'
  parent: openai_service
  sku: {
    name: 'GlobalStandard'
    capacity: 100
  }
  properties: {
    model: {
      format: 'OpenAI'
      name: 'gpt-4.1-mini'
      version: '2025-04-14'
    }
    versionUpgradeOption: 'OnceNewDefaultVersionAvailable'
    currentCapacity: 100
    raiPolicyName: 'Microsoft.DefaultV2'
  }
}

output openai_service_key string = openai_service.listKeys().key1

output openai_service_endpoint string = openai_service.properties.endpoint

output openai_service_name string = openai_service.name

