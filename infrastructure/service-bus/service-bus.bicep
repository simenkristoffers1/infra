@description('The location for the resource(s) to be deployed')
param location string = resourceGroup().location

resource serviceBus 'Microsoft.ServiceBus/namespaces@2024-01-01' = {
  name: take('sbns-${uniqueString(resourceGroup().id)}', 50)
  location: location
  properties: {
    disableLocalAuth: true
  }
  sku: {
    name: 'Basic'
    tier: 'Basic'
  }
}

resource pipelineQueue 'Microsoft.ServiceBus/namespaces/queues@2024-01-01' = {
  name: take('sbq-pipeline-${uniqueString(resourceGroup().id)}', 260)
  parent: serviceBus
  properties: {
    maxDeliveryCount: 10
    maxSizeInMegabytes: 1024
    defaultMessageTimeToLive: 'P1D'
  }
}

output serviceBusEndpoint string = serviceBus.properties.serviceBusEndpoint
output name string = serviceBus.name
output pipelineQueueName string = pipelineQueue.name
