FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build

WORKDIR /App

COPY ./src/Api ./Api

WORKDIR /App/Api

RUN dotnet restore

RUN dotnet publish -c Release -o ../out

FROM mcr.microsoft.com/dotnet/aspnet:9.0

WORKDIR /App

COPY --from=build /App/out .

ENV ASPNETCORE_HTTP_PORTS=80

EXPOSE 80

CMD ["dotnet", "Api.dll"]
