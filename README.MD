
📄 Proyecto: Facturación con Web Components



🔎 Descripción

Este proyecto es una aplicación web de gestión de facturas desarrollada utilizando Lit y estructurada con Vite como herramienta de construcción. El proyecto está desplegado en https://facturalit.netlify.app/ y permite gestionar facturas de manera dinámica e intuitiva con funcionalidades clave y almacenamiento local.





🚀 Tecnologías utilizadas

Lit: Para la creación de los componentes web.

JavaScript: Para la lógica del cliente.

Bootstrap: Para el diseño responsivo y estilizado de la interfaz.

HTML/CSS: Para la estructura y el estilo.





🔹 Componentes principales

1. ProductsComponent

🔢 Permite seleccionar un producto desde un desplegable.
🔑 Muestra el código y el precio unitario del producto seleccionado.
🛒 Permite especificar la cantidad del producto y agregarlo al detalle de la factura.



2. DetailComponent

🗊1 Muestra una tabla con el detalle de los productos agregados a la factura.
📈 Incluye columnas para el código, nombre, precio unitario, cantidad, subtotal y acción para eliminar productos.
🔄 Se actualiza en tiempo real al agregar o eliminar productos.



3. Controladores

⚖️ detail.js

Gestiona la lógica del detalle de la factura.
Permite agregar, actualizar y eliminar productos del detalle.
Emite eventos personalizados para actualizar la vista.

📊 products.js

Proporciona una lista simulada de productos disponibles para seleccionar.