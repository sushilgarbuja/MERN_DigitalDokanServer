import { Sequelize } from "sequelize-typescript";
import { envConfig } from "../config/config";

const sequelize = new Sequelize(process.env.DATABASE_URL as string,{
   
    models: [__dirname + '/models'],
    
});

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
sequelize.sync({force : false,alter:false}).then(()=>{
    console.log("synced !!")
}) 
export default sequelize