import adminSeeder from "./adminSeeder";
import app from "./src/app";
import { envConfig } from "./src/config/config";
import categoryController from "./src/controllers/categoryController";


function startServer(){
    const port=envConfig.port || 3000
    app.listen(port,()=>{
        categoryController.seedCategory();
        console.log(`Server is running on port [${port}]`);
    adminSeeder();

    })
}
startServer();