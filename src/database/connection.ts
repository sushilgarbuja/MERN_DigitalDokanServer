import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";

const sequelize = new Sequelize("postgresql://postgres.epqcndohwcldxhqoqxev:hahahehe@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres");

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