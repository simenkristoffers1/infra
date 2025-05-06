using System.Data.Common;
using System.Reflection;
using Azure.Identity;
using DbUp;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

var configuration = new ConfigurationBuilder()
    .SetBasePath(AppContext.BaseDirectory)
    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
    .AddEnvironmentVariables()
    .Build();

using var factory = LoggerFactory.Create(builder => builder.AddConsole());
var logger = factory.CreateLogger("DbUpMigrator");

var environment = configuration.GetValue<string>("ASPNETCORE_ENVIRONMENT") ?? "Development";

string connectionString;
if (environment == "Staging" || environment == "Production")
{
    var tokenCredential = new DefaultAzureCredential();
    var accessToken = tokenCredential.GetToken(
        new Azure.Core.TokenRequestContext(["https://ossrdbms-aad.database.windows.net/.default"])
    );

    var csBuilder = new DbConnectionStringBuilder
    {
        ["Host"] = configuration.GetValue<string>("DB_HOST") ?? throw new Exception("DB_HOST not found"),
        ["Port"] = configuration.GetValue<string>("DB_PORT") ?? throw new Exception("DB_PORT not found"),
        ["Username"] = configuration.GetValue<string>("DB_USERNAME") ?? throw new Exception("DB_USERNAME not found"),
        ["Database"] = configuration.GetValue<string>("DB_DATABASE") ?? throw new Exception("DB_DATABASE not found"),
        ["Password"] = accessToken.Token,
        ["SSL Mode"] = "Require",
        ["Trust Server Certificate"] = "true"
    };

    connectionString = csBuilder.ConnectionString;
}
else
{
    connectionString = configuration.GetConnectionString("TargetDatabase")
        ?? throw new Exception("TargetDatabase connection string not found");
}


var upgrader =
    DeployChanges.To
        .PostgresqlDatabase(connectionString)
        .WithScriptsEmbeddedInAssembly(Assembly.GetExecutingAssembly())
        .LogToConsole()
        .WithTransaction()
        .Build();

if (!upgrader.TryConnect(out var connectErrorMessage))
{
    logger.LogCritical("Unable to connect to the database: {Error}", connectErrorMessage);
    return 1;
}

if (!upgrader.IsUpgradeRequired())
{
    logger.LogInformation("Exited without action. No upgrade required.");
    return 0;
}

var result = upgrader.PerformUpgrade();

if (!result.Successful)
{
    logger.LogCritical("Migration failed: {Error}", result.Error);
    Environment.ExitCode = 1;
    return 1;
}

logger.LogInformation("Migration completed successfully.");
return 0;