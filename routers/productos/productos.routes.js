const express = require('express');
const {
  listarProductosController, 
  listarProductosPorIdController,
  guardarproductoController, 
  actualizarproductoController,
  eliminarproductoController
} = require('../../controllers/productos.controllers');

const router = express.Router();

router.get('/', listarProductosController);

router.get('/:idproducto', listarProductosPorIdController);

router.post('/', guardarproductoController);

router.put('/:idproducto', actualizarproductoController);

router.delete('/:idproducto', eliminarproductoController);

module.exports = router;