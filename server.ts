import adminSeeder from "./adminSeeder";
import app from "./src/app";
import { envConfig } from "./src/config/config";
import categoryController from "./src/controllers/categoryController";
import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import User from "./src/database/models/userModel";

function startServer() {
    const port = envConfig.port || 3000;
    const server = app.listen(port, () => {
        categoryController.seedCategory();
        console.log(`Server is running on port [${port}]`);
        adminSeeder();
    });

    const io = new Server(server, {
        cors: {
            origin: "http://localhost:3000"
        }
    });

    let onlineUsers: { socketId: string, userId: string, role: string }[] = [];

    let addToOnlineUsers = (socketId: string, userId: string, role: string) => {
        onlineUsers = onlineUsers.filter((user) => user.userId !== userId);
        onlineUsers.push({ socketId, userId, role });
    };

    io.on('connection', (socket) => {
        const { token } = socket.handshake.auth;
        if (token) {
            jwt.verify(token, envConfig.jwtSecret as string, async (err:any, result: any) => {
                if (err) {
                    socket.emit("error", err.message);
                } else {
                    console.log(result);
                    const userData = await User.findByPk(result?.userId); // {email}
                    if (!userData) {
                        socket.emit("error", "User not found");
                        return;
                    }
                    // Correctly pass userId to addToOnlineUsers
                    addToOnlineUsers(socket.id, result.userId, userData.role);
                }
            });
        }
    });
}

startServer();
