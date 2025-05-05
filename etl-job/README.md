

## Push image

Login to ACR

```
az acr login --name acr31oi23218
```

Build the image

```
docker buildx build --platform linux/amd64 -t acr31oi23218.azurecr.io/job:latest .
```

Push the image to acr

```
docker push acr31oi23218.azurecr.io/job:latest
```

Update revision

**Option 1**

Existing revision

```
az containerapp revision restart --name api --resource-group rg-test --revision api--0000003
```

**Option 2**

New revision

```
az containerapp update --name api --resource-group rg-test --image acr31oi23218.azurecr.io/api:latest
```