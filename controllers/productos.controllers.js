const { ProductosApi } = require('../models/index');

const productos = new ProductosApi();

const listarProductosController = (req, res) => {
  const { edad, busqueda } = req.query;
  let respuestaProductos = productos.listarTodos();
  if (Object.keys(req.query).length) {
    if (edad) {
      if (isNaN(+edad)) {
        return res.status(400).send('precioMaximo must be a valid number');
      }
      respuestaProductos = respuestaProductos.filter(producto => producto.edad <= +edad);
    }
    if (busqueda) {
      respuestaProductos = respuestaProductos
        .filter(producto => 
          producto.nombre.toLowerCase().startsWith(busqueda.toLowerCase()) || 
          producto.apellido.toLowerCase().startsWith(busqueda.toLowerCase())
        )
    }
  }
  return res.json(respuestaProductos);
};

const listarProductosPorIdController = (req, res) => {
  const { idproducto } = req.params;
  const producto = productos.listarPorId(idproducto);
  if (producto.error) return res.status(404).send(producto.error);
  return res.json(producto);
};

const guardarproductoController = (req, res) => {
  const nuevaproducto = productos.guardar(req.body);
  if (nuevaproducto.error) return res.status(400).send(nuevaproducto.error);
  return res.json(nuevaproducto);
};

const actualizarproductoController = (req, res) => {
  const { params: { idproducto } } = req;
  const productoActualizada = productos.actualizar(req.body, idproducto);
  if (productoActualizada.error) return res.status(404).send(productoActualizada.error);
  return res.json(productoActualizada);
};

const eliminarproductoController = (req, res) => {
  const { idproducto } = req.params;
  const productoEliminada = productos.eliminar(idproducto);
  if (productoEliminada.error) return res.status(404).send(productoEliminada.error);
  return res.json(productoEliminada);
};

module.exports = {
  listarProductosController,
  listarProductosPorIdController,
  guardarproductoController,
  actualizarproductoController,
  eliminarproductoController,
};