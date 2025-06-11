import chalk from "chalk";

export const databaseHost = "localhost";
export const databaseUser = "admin";
export const databasePassword = "password";
export const databaseName = "mydatabase";

export const databasePort = 3306;
export const databaseSocket = "/var/run/mysqld/mysqld.sock";

export const databaseConnectionString = `mysql://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`;


export const establishDatabaseConnection = () => {
    console.log(chalk.red("Establishing database connection..."));
}