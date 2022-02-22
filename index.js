const http = require('http');

const express = require('express');

const cors = require('cors');
const users = [{}]
const socketIO = require("socket.io")
const app=express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST"],
    
  }));
app.get('/', (req, res)=>(
    res.send('Socket Is Working')
))
const server = http.createServer(app);
const port = 4500 || process.env.PORT;
const io = socketIO(server);

io.on('connection', (socket)=>{
    console.log('new connection, joined')

    socket.on('joined',(data)=>{
        console.log('joined', data.user, data)
        socket.broadcast.emit('fetchuser', {msg:'Successfully Joined', users:data.user})
        users[socket.id]=data.user
    })

    
    //Messages Received

    // socket.on('userjoin', (data)=>{
    //     console.log("messages.......")
    //     console.log(data.msg)
    //     //socket.broadcast.emit('recivermsg',{send:data.senderuser, rcv:data.reciveruser, msg:data.msg})
    //     //users[socket.id]='newid'
    // })


        
    


    socket.on('disconnect', ()=>{
        console.log('user left', users[socket.id])
        socket.broadcast.emit('leave', {msg:`User Leave ${users[socket.id]}`, data:users[socket.id]})
        
    })


    //console.log('server', users[socket.id])
    //console.log('joined')
    
})




server.listen(port,()=>{
    const socketLink = 'http://127.0.0.1:'+port
    console.log("server is running on ", socketLink)
})
