export function calculateSummary(component) {
    const subtotalInput = component.shadowRoot.querySelector("#subtotal");
    const ivaInput = component.shadowRoot.querySelector("#iva");
    const totalInput = component.shadowRoot.querySelector("#total");
  
    document.addEventListener("detailUpdated", (event) => {
      const details = event.detail;
  
      // Calcular el subtotal sumando los subtotales de todos los productos
      const subtotal = details.reduce((acc, product) => acc + product.subtotal, 0);
  
      // Calcular IVA (19%)
      const iva = subtotal * 0.19;
  
      // Calcular el total (subtotal + IVA)
      const total = subtotal + iva;
  
      // Mostrar los valores en los inputs
      subtotalInput.value = subtotal.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
      });
      ivaInput.value = iva.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
      });
      totalInput.value = total.toLocaleString("es-CO", {
        style: "currency",
        currency: "COP",
      });
    });
  }
  
  export function processPayment(component) {
    const shadow = component.shadowRoot;
  
    // Verificar campos de cliente
    const userComponent = document.querySelector("user-component")?.shadowRoot;
    const idClient = userComponent?.querySelector("#idClient").value.trim();
    const nameClient = userComponent?.querySelector("#nameClient").value.trim();
    const lastNameClient = userComponent?.querySelector("#lastNameClient").value.trim();
    const direction = userComponent?.querySelector("#direction").value.trim();
    const email = userComponent?.querySelector("#email").value.trim();
  
    // Validar campos obligatorios
    if (!idClient || !nameClient || !lastNameClient || !direction || !email) {
      alert("Por favor, complete todos los campos obligatorios en los datos del cliente.");
      return;
    }
  
    // Verificar si hay productos en el detalle
    const subtotalInput = shadow.querySelector("#subtotal");
    const subtotalValue = parseFloat(subtotalInput.value.replace(/[^0-9.-]+/g, ""));
    if (subtotalValue === 0) {
      alert("Por favor, agregue productos a la factura antes de pagar.");
      return;
    }
  
    // Alerta de pago exitoso
    alert("Factura pagada con éxito");
  
    // Reiniciar los valores de la factura
    const ivaInput = shadow.querySelector("#iva");
    const totalInput = shadow.querySelector("#total");
    subtotalInput.value = "$0.00";
    ivaInput.value = "$0.00";
    totalInput.value = "$0.00";
  
    // Reiniciar datos de cliente
    userComponent.querySelector("#idClient").value = "";
    userComponent.querySelector("#nameClient").value = "";
    userComponent.querySelector("#lastNameClient").value = "";
    userComponent.querySelector("#direction").value = "";
    userComponent.querySelector("#email").value = "";
  
    // Emitir evento para limpiar el detalle de productos
    const clearDetailEvent = new CustomEvent("clearDetail");
    document.dispatchEvent(clearDetailEvent);
  }
  
    