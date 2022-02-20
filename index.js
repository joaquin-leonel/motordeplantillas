
const path = require('path');
const rutasApi = require('./routers/index');
const express = require('express');
const { PersonasApi } = require('./models');


const app = express();
const PORT = process.env.PORT || 8080;
const productos=[];

// Middlewares
app.use(express.static(path.resolve(__dirname, './public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//template engines
app.set('views','./views');
app.set('view engine', 'ejs'),

// Rutas
app.use('/api', rutasApi);

//ejs
// app.get ('/ejs', (req,res) => {
//     res.render('ejs/index');   
//  })

//  app.get ('/ejs/productos', (req,res) => {
//   res.render('ejs/productos');   
// })

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

const connectedServer = app.listen(PORT, () => {
  console.log(`Servidor activo y escuchando en el puerto ${PORT}`);
});

connectedServer.on('error', (error) => {
  console.log(error.message);
});