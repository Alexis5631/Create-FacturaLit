import { LitElement, html } from 'lit';
import { listProduct } from "../controllers/products.js";
import { addProductToDetail } from "../controllers/detail.js";

class ProductsComponent extends LitElement {
  static properties = {
    products: { type: Array },
    selectedProductId: { type: String },
    selectedProduct: { type: Object },
  };

  constructor() {
    super();
    this.products = [];
    this.selectedProductId = '';
    this.selectedProduct = { cod: 'cod', product: 'Producto', price: 0 };
  }

  firstUpdated() {
    // Llenar la lista de productos al cargar el componente
    listProduct(this);
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css">
      <div class="container mt-5">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light text-center">
            <h3 class="mb-0 text-dark">Productos</h3>
          </div>
          <div class="card-body">
            <!-- Lista desplegable de productos -->
            <div class="mb-3">
              <label for="productList" class="form-label fw-bold">Producto</label>
              <select id="productList" class="form-select" @change=${this.handleProductChange}>
                <option value="">Seleccione un producto</option>
                ${this.products.map(
                  (product) =>
                    html`<option value="${product.id}">${product.product}</option>`
                )}
              </select>
            </div>

            <!-- Código del producto -->
            <div class="mb-3">
              <label for="productIdInput" class="form-label fw-bold">Código</label>
              <input
                id="productIdInput"
                class="form-control"
                type="text"
                .value=${this.selectedProduct.cod}
                disabled
              />
            </div>

            <!-- Precio unitario -->
            <div class="mb-3">
              <label for="unitaryValue" class="form-label fw-bold">Precio Unitario</label>
              <input
                id="unitaryValue"
                class="form-control"
                type="text"
                .value=${this.selectedProduct.price.toLocaleString('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                })}
                disabled
              />
            </div>

            <!-- Cantidad -->
            <div class="mb-3">
              <label for="quantity" class="form-label fw-bold">Cantidad</label>
              <input
                id="quantity"
                type="number"
                class="form-control"
                min="1"
                step="1"
                value="1"
              />
            </div>

            <!-- Botón para agregar el producto -->
            <button
              class="btn btn-primary w-100"
              @click=${this.handleSubmit}
            >
              Agregar a la factura
            </button>
          </div>
        </div>
      </div>
    `;
  }

  handleProductChange(event) {
    const selectedId = event.target.value;
    this.selectedProductId = selectedId;

    // Buscar el producto seleccionado por su ID
    const selectedProduct = this.products.find(
      (product) => product.id === selectedId
    );

    // Actualizar los valores del producto seleccionado
    if (selectedProduct) {
      this.selectedProduct = {
        cod: selectedProduct.cod,
        product: selectedProduct.product,
        price: selectedProduct.price,
      };
    } else {
      this.selectedProduct = { cod: 'cod', product: 'Producto', price: 0 };
    }
  }

  handleSubmit() {
    const quantityInput = this.shadowRoot.querySelector('#quantity');
    const quantity = parseInt(quantityInput.value, 10);

    if (this.selectedProductId && quantity > 0) {
      const product = {
        cod: this.selectedProduct.cod,
        product: this.selectedProduct.product,
        price: this.selectedProduct.price,
        quantity,
      };

      addProductToDetail(product);

      // Restablecer los valores después de agregar el producto
      this.selectedProductId = '';
      this.selectedProduct = { cod: 'cod', product: 'Producto', price: 0 };
      quantityInput.value = '1';
    } else {
      alert('Seleccione un producto y una cantidad válida.');
    }
  }
}

customElements.define('products-component', ProductsComponent);