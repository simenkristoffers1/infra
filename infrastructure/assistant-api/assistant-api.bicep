param assistant_api_identity_outputs_id string

param assistant_api_identity_outputs_client_id string

param assistant_api_containerport int

param assistant_api_containerimage string

param aca_env_outputs_azure_container_apps_environment_id string

param aca_env_outputs_azure_container_registry_endpoint string

param aca_env_outputs_azure_container_registry_managed_identity_id string

resource assistant_api 'Microsoft.App/containerApps@2024-03-01' = {
  name: 'assistant-api'
  location: resourceGroup().location
  properties: {
    configuration: {
      activeRevisionsMode: 'Single'
      ingress: {
        allowInsecure: false
        external: true
        targetPort: assistant_api_containerport
        transport: 'http'
      }
      registries: [
        {
          server: aca_env_outputs_azure_container_registry_endpoint
          identity: aca_env_outputs_azure_container_registry_managed_identity_id
        }
      ]
    }
    environmentId: aca_env_outputs_azure_container_apps_environment_id
    template: {
      containers: [
        {
          name: 'assistant-api'
          image: 'mcr.microsoft.com/azuredocs/aci-helloworld'
          env: [
            {
              name: 'AZURE_CLIENT_ID'
              value: assistant_api_identity_outputs_client_id
            }
            {
              name: 'OTEL_DOTNET_EXPERIMENTAL_OTLP_EMIT_EXCEPTION_LOG_ATTRIBUTES'
              value: 'true'
            }
            {
              name: 'OTEL_DOTNET_EXPERIMENTAL_OTLP_EMIT_EVENT_LOG_ATTRIBUTES'
              value: 'true'
            }
            {
              name: 'OTEL_DOTNET_EXPERIMENTAL_OTLP_RETRY'
              value: 'in_memory'
            }
            {
              name: 'ASPNETCORE_FORWARDEDHEADERS_ENABLED'
              value: 'true'
            }
            {
              name: 'HTTP_PORTS'
              value: '${assistant_api_containerport}'
            }
          ]
        }
      ]
      scale: {
        minReplicas: 1
      }
    }
  }
  identity: {
    type: 'UserAssigned'
    userAssignedIdentities: {
      '${assistant_api_identity_outputs_id}': {}
      '${aca_env_outputs_azure_container_registry_managed_identity_id}': {}
    }
  }
}

