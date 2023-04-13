const express = require("express");
const mongoose = require("mongoose");
const app= express();
const http= require("http");
require('dotenv').config();
const cors= require("cors");
const authRoutes= require('./routes/authRoutes');
const friendInvitationRoutes = require('./routes/friendInvitationRoutes');
//port var
const PORT = process.env.PORT || process.env.API_PORT;

const socketServer = require('./socketServer');

//express use these
app.use(express.json());
app.use(cors({origin:"*"}));

//register the routes
app.use("/api/auth",authRoutes);
app.use("/api/friend-invitation",friendInvitationRoutes);
app.get('/',(req,res)=>{
    res.json({response:"link has been hit"});
});

//server setup
const server= http.createServer(app);

socketServer.registerSocketServer(server);


mongoose.connect(process.env.MONGO_URI).then(
    ()=>{
        server.listen(PORT,()=>{
            console.log(`server is listening on port: ${PORT}`);
        });
    }
).catch(err=>{
    console.log("database connection failed"+`:${err}`);
});