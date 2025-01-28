import { LitElement, html, css } from "lit";
import { removeProductFromDetail } from "../controllers/detail.js";

export class DetailComponent extends LitElement {
  static properties = {
    details: { type: Array },
  };

  constructor() {
    super();
    this.details = []; // Inicialización de la propiedad
  }

  connectedCallback() {
    super.connectedCallback();

    // Escuchar los eventos del DOM global
    document.addEventListener("detailUpdated", this.updateDetails.bind(this));
    document.addEventListener("clearDetail", this.clearDetails.bind(this));
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // Eliminar listeners para evitar fugas de memoria
    document.removeEventListener("detailUpdated", this.updateDetails.bind(this));
    document.removeEventListener("clearDetail", this.clearDetails.bind(this));
  }

  updateDetails(event) {
    this.details = [...event.detail]; // Actualizar los detalles con los nuevos datos
  }

  clearDetails() {
    this.details = []; // Limpiar la lista de detalles
  }

  handleRemoveProduct(cod) {
    removeProductFromDetail(cod); // Llamar al controlador para eliminar el producto
  }

  render() {
    return html`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css">
      <div class="container">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light text-center">
            <h3 class="mb-0 text-dark">Detalle de la Compra</h3>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table id="detailTable" class="table table-bordered align-middle">
                <thead class="text-white bg-dark">
                  <tr>
                    <th scope="col">Cod</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Valor Unitario</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col">Acción</th>
                  </tr>
                </thead>
                <tbody class="text-center">
                  ${this.details.map(
                    (product) => html`
                      <tr>
                        <td>${product.cod}</td>
                        <td>${product.product}</td>
                        <td>
                          ${product.price.toLocaleString("es-CO", {
                            style: "currency",
                            currency: "COP",
                          })}
                        </td>
                        <td>${product.quantity}</td>
                        <td>$${product.subtotal.toFixed(2)}</td>
                        <td>
                          <button
                            class="btn btn-outline-danger btn-sm"
                            @click=${() => this.handleRemoveProduct(product.cod)}
                          >
                            <i class="bi bi-trash3"></i> Eliminar
                          </button>
                        </td>
                      </tr>
                    `
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("detail-component", DetailComponent);
