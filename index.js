const path = require('path');
const rutasApi = require('./routers/index');
const express = require('express');
const moment = require('moment');

const http = require('http');
const socketIo=require('socket.io');

const { PersonasApi } = require('./models');


const app = express();
const PORT = process.env.PORT || 8081;
const httpServer = http.createServer(app);
const io = socketIo(httpServer);


const messages = [];


const productos=[];



// Middlewares
// app.use(express.static(path.resolve(__dirname, './views/ejs')));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, './views/ejs')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



//socket events
io.on('connection', (socket) => {
  console.log('nuevo cliente conectado');
  console.log(socket.id);
  socket.emit('messages',[...messages])

    socket.on('new-message',data => {
      messages.push(data);
      io.sockets.emit('messages', messages);
  });

});


//template engines
app.set('views','./views');
app.set('view engine', 'ejs'),

// Rutas
app.use('/api', rutasApi);


 app.get('/ejs', (req,res)=>{
    res.render('ejs/index', { productos })
 })

 app.get('/ejs/productos',(req,res)=>{
  
  res.render('ejs/productos', { productos })
})

app.post('/ejs/productos',(req,res)=>{
  productos.push(req.body);
     res.redirect('/ejs/');
})






// const connectedServer = app.listen(PORT, () => {
//   console.log(`Servidor activo y escuchando en el puerto ${PORT}`);
// });

httpServer.listen(PORT, () => {
  console.log(`Servidor activo y escuchando en el puerto ${PORT}`);
});

// connectedServer.on('error', (error) => {
//   console.log(error.message);
// });

httpServer.on('error', (error) => {
  console.log(error.message);
});

