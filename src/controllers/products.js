import { dataBase } from "../js/data.js";

export function listProduct(productsComponent) {
  const productList = productsComponent.shadowRoot.getElementById('productList');
  const codeInput = productsComponent.shadowRoot.querySelector('input[id="productIdInput"]');
  const valueInput = productsComponent.shadowRoot.querySelector('input[id="unitaryValue"]');

  console.log("Base de datos de productos:", dataBase); // Verificar que los productos estén cargados

  // Llenar el select con los productos
  dataBase.forEach(element => {
    const option = document.createElement("option");
    option.value = element.id;
    option.textContent = `${element.product}`;
    productList.appendChild(option);
  });

  // Escuchar cambios en el select
  productList.addEventListener('change', (event) => {
    const productId = event.target.value;

    if (productId) {
      // Buscar el producto seleccionado
      const selectedProduct = dataBase.find(p => p.id === productId);

      // Actualizar el campo de código y precio
      if (selectedProduct) {
        codeInput.value = selectedProduct.cod; // Mostrar el código del producto
        valueInput.value = selectedProduct.price.toLocaleString('es-CO', { style: 'currency', currency: 'COP' }); // Mostrar el precio formateado
      }
    } else {
      // Restablecer campos si no se selecciona un producto
      codeInput.value = "cod";
      valueInput.value = "value";
    }

    
  });

  
}