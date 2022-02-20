class ProductosApi {
  constructor() {
    this.productos = [];
  }
  static idCount = 0;

  listarTodos() {
    return [...this.productos];
  };

  listarPorId(id) {
    const producto = this.productos.find(prod => prod.id === +id);
    return producto || { error: `producto con id ${id} no encontrado!` };
  };

  guardar(prod) {
    const { nombre, descripcion, precio, imagen } = prod;
    if (!nombre || !descripcion || !precio || !imagen ) return { error: 'nombre y precio son campos obligatorios' };
    if (precio < 0 || precio % 1 !== 0 || isNaN(precio)) return { error: 'La edad debe ser un número entero positivo' };
    const nuevaproducto = { ...prod, id: ++ProductosApi.idCount };
    this.productos.push(nuevaproducto);
    return nuevaproducto;
  };

  actualizar(prod, id) {
    const indice = this.productos.findIndex(prod => prod.id === +id);
    if (indice < 0) return { error: `producto con id ${id} no encontrado!` };
    this.productos[indice] = { id: +id, ...prod };
    return this.productos[indice];
  };

  eliminar(id) {
    const indice = this.productos.findIndex(prod => prod.id === +id);
    if (indice < 0) return { error: `producto con id ${id} no encontrado!` };
    return this.productos.splice(indice, 1);
  }
}

module.exports = ProductosApi;