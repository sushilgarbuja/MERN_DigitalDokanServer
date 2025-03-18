import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";

const sequelize = new Sequelize(envConfig.connectionString as string);

try {
    sequelize.authenticate().then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
} catch (err) {
    console.error("Unable to connect to the database:", err);
}

export default sequelize