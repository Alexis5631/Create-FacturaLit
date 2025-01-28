// Array para almacenar los detalles del producto
const detailData = [];

/**
 * Agregar o actualizar un producto en los detalles
 */
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

  // Emitir evento para actualizar la tabla en la interfaz
  const event = new CustomEvent("detailUpdated", {
    detail: [...detailData], // Pasar una copia para evitar referencias compartidas
  });
  document.dispatchEvent(event);
}

/**
 * Eliminar un producto de los detalles
 */
export function removeProductFromDetail(cod) {
  const index = detailData.findIndex((item) => item.cod === cod);

  if (index !== -1) {
    detailData.splice(index, 1);

    // Emitir evento para actualizar la tabla
    const event = new CustomEvent("detailUpdated", {
      detail: [...detailData],
    });
    document.dispatchEvent(event);
  }
}

/**
 * Obtener todos los detalles
 */
export function getInvoiceDetails() {
  return [...detailData];
}

/**
 * Limpiar todos los detalles
 */
export function clearDetails() {
  detailData.length = 0;

  // Emitir evento para limpiar la tabla
  const event = new CustomEvent("detailUpdated", { detail: [] });
  document.dispatchEvent(event);
}
