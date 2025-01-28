// Array para almacenar los detalles del producto
const detailData = [];

export function addProductToDetail(product) {
  const existingProduct = detailData.find((item) => item.cod === product.cod);

  if (existingProduct) {
    existingProduct.quantity += product.quantity; // Actualizar cantidad
    existingProduct.subtotal = existingProduct.quantity * existingProduct.price; // Actualizar subtotal
  } else {
    detailData.push({
      ...product,
      subtotal: product.quantity * product.price, // Calcular subtotal inicial
    });
  }

  console.log("Detalles actualizados:", detailData);

  // Emitir evento para actualizar la tabla en la interfaz
  const event = new CustomEvent("detailUpdated", {
    detail: [...detailData] // Pasar una copia para evitar referencias compartidas
  });
  document.dispatchEvent(event);
}

/**
 * Eliminar un producto de la tabla de detalles por su código.
 * @param {string} cod - Código del producto a eliminar
 */
export function removeProductFromDetail(cod) {
  const index = detailData.findIndex((item) => item.cod === cod);

  if (index !== -1) {
    detailData.splice(index, 1); // Eliminar producto del array

    // Emitir evento para actualizar la tabla en la interfaz
    const event = new CustomEvent("detailUpdated", {
      detail: [...detailData] // Pasar una copia para evitar referencias compartidas
    });
    document.dispatchEvent(event);
  }
}

/**
 * Obtener todos los detalles del producto.
 * @returns {Array} - Array con los detalles de los productos
 */
export function getInvoiceDetails() {
  return [...detailData]; // Retornar una copia del array
}

/**
 * Limpiar todos los datos del detalle.
 */
export function clearDetails() {
  detailData.length = 0; // Vaciar el array

  // Emitir evento para limpiar la tabla en la interfaz
  document.dispatchEvent(new CustomEvent("detailUpdated", { detail: [] }));
}