import { LitElement, html, css } from 'lit';
import { calculateSummary, processPayment } from "../controllers/summary.js";

class SummaryComponent extends LitElement {
  static properties = {
    subtotal: { type: String },
    iva: { type: String },
    total: { type: String }
  };

  constructor() {
    super();
    this.subtotal = "$0.00";
    this.iva = "$0.00";
    this.total = "$0.00";
  }

  connectedCallback() {
    super.connectedCallback();
    calculateSummary(this);

    // Evento click para el pago de la factura
    this.shadowRoot.querySelector("#submitBtn").addEventListener("click", () => {
      processPayment(this);
    });
  }

  render() {
    return html`
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css">
      <div class="container mt-5">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-light text-center">
            <h3 class="mb-0" style="color:rgb(0, 0, 0);">Resumen de Factura</h3>
          </div>
          <div class="card-body">
            <div class="row mb-4 align-items-center">
              <label class="col-md-4 col-form-label fw-bold">Subtotal</label>
              <div class="col-md-8">
                <input id="subtotal" class="form-control text-center" type="text" .value="${this.subtotal}" disabled readonly>
              </div>
            </div>
            <div class="row mb-4 align-items-center">
              <label class="col-md-4 col-form-label fw-bold">IVA (19%)</label>
              <div class="col-md-8">
                <input id="iva" class="form-control text-center" type="text" .value="${this.iva}" disabled readonly>
              </div>
            </div>
            <div class="row mb-4 align-items-center">
              <label class="col-md-4 col-form-label fw-bold">Total</label>
              <div class="col-md-8">
                <input id="total" class="form-control text-center" type="text" .value="${this.total}" disabled readonly>
              </div>
            </div>
            <div class="text-center">
              <button id="submitBtn" class="btn btn-outline-success btn-lg w-50">
                <i class="bi bi-check2-circle"></i> Realizar Pago
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('summary-component', SummaryComponent);

