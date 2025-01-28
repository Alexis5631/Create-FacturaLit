import { LitElement, html, css } from 'lit';
import { listProduct } from "../controllers/products.js";
import { addProductToDetail } from "../controllers/detail.js";

class ProductsComponent extends LitElement {
  static properties = {
    products: { type: Array },
    selectedProductId: { type: String },
    selectedProduct: { type: Object }
  };

  constructor() {
    super();
    this.products = [];
    this.selectedProductId = '';
    this.selectedProduct = { cod: 'cod', product: 'Producto', price: 'value' };
  }

  firstUpdated() {
    // Llamamos la función para llenar el select al primer renderizado
    listProduct(this);
  }

  render() {
    return html`
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css">
      <div class="container mt-5">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light text-center">
            <h3 class="mb-0" style="color:rgb(0, 0, 0);">Productos</h3>
          </div>
          <div class="card-body">
            <div class="row mb-4 align-items-center">
              <label class="col-md-3 col-form-label fw-bold">Código de Producto</label>
              <div class="col-md-9">
                <input id="productIdInput" class="form-control text-center" type="text" value="${this.selectedProduct.cod}" disabled readonly>
              </div>
            </div>
            <div class="row mb-4 align-items-center">
              <label class="col-md-3 col-form-label fw-bold">Producto</label>
              <div class="col-md-9">
                <select id="productList" class="form-select" @change="${this.handleProductChange}" aria-label="Seleccionar producto">
                  <option value="">Seleccione un producto</option>
                  ${this.products.map(product => html`<option value="${product.id}">${product.product}</option>`)}
                </select>
              </div>
            </div>
            <div class="row mb-4 align-items-center">
              <label class="col-md-3 col-form-label fw-bold">Precio Unitario</label>
              <div class="col-md-4">
                <input id="unitaryValue" class="form-control text-center" type="text" value="${this.selectedProduct.price}" disabled readonly>
              </div>
              <label class="col-md-2 col-form-label fw-bold">Cantidad</label>
              <div class="col-md-3">
                <input id="quantity" class="form-control text-center" type="number" min="1" step="1" value="1">
              </div>
            </div>
            <div class="text-center">
              <button id="submitBtn" class="btn btn-outline-primary btn-lg w-50" @click="${this.handleSubmit}">
                <i class="bi bi-cart-plus"></i> Agregar a la factura
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  handleProductChange(event) {
    const selectedId = event.target.value;
    this.selectedProductId = selectedId;
    
    const selectedProduct = this.products.find(product => product.id === selectedId);
    if (selectedProduct) {
      this.selectedProduct = selectedProduct;
    } else {
      this.selectedProduct = { cod: 'cod', product: 'Producto', price: 'value' };
    }
  }

  handleSubmit() {
    const quantityInput = this.shadowRoot.querySelector('#quantity');
    const quantity = parseInt(quantityInput.value, 10);

    if (this.selectedProductId && this.selectedProduct.product !== 'Producto' && !isNaN(quantity) && quantity > 0) {
      const product = {
        cod: this.selectedProduct.cod,
        product: this.selectedProduct.product,
        price: this.selectedProduct.price,
        quantity: quantity,
      };

      addProductToDetail(product);

      // Restablecer los valores después de agregar el producto
      this.selectedProductId = '';
      this.selectedProduct = { cod: 'cod', product: 'Producto', price: 'value' };
      quantityInput.value = "1";
    } else {
      alert("Por favor, seleccione un producto y una cantidad válida.");
    }
  }
}

customElements.define('products-component', ProductsComponent);

