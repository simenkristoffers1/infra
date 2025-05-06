using System.Reflection;
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

var connectionString = configuration.GetConnectionString("postgresdb");
Console.WriteLine(connectionString);
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