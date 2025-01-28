import { LitElement, html, css } from "lit";
/*import 'boostrap/dist/css/boostrap.min.css';
import 'boostrap/dist/js/boostrap.min.js';*/

class UserComponent extends LitElement {
  static properties = {
    idFactura: { type: String }
  };

  constructor() {
    super();
    this.idFactura = Date.now().toString(16).toUpperCase();  // Genera un ID único para la factura
  }

  render() {
    return html`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css">
      <div class="container mt-5">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light text-center">
            <h3 class="mb-0">Factura</h3>
          </div>
          <div class="card-body">
            <div class="row mb-4 align-items-center">
              <label class="col-md-3 col-form-label fw-bold">Número de Factura</label>
              <div class="col-md-9">
                <input class="form-control text-center" type="text" value="${this.idFactura}" disabled readonly>
              </div>
            </div>

            <div class="row mb-4 align-items-center">
              <label class="col-md-3 col-form-label fw-bold">Nro. Id</label>
              <div class="col-md-9">
                <input class="form-control" id="idClient">
              </div>
            </div>

            <div class="row mb-4 align-items-center">
              <label class="col-md-3 col-form-label fw-bold">Nombres</label>
              <div class="col-md-4">
                <input class="form-control" id="nameClient">
              </div>
              <label class="col-md-2 col-form-label fw-bold">Apellidos</label>
              <div class="col-md-3">
                <input class="form-control" id="lastNameClient">
              </div>
            </div>

            <div class="row mb-4 align-items-center">
              <label class="col-md-3 col-form-label fw-bold">Dirección</label>
              <div class="col-md-9">
                <input class="form-control" id="direction">
              </div>
            </div>

            <div class="row mb-4 align-items-center">
              <label class="col-md-3 col-form-label fw-bold">Email</label>
              <div class="col-md-9">
                <input class="form-control" id="email">
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("user-component", UserComponent);


