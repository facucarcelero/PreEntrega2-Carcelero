/**
 * ============================================
 * SIMULADOR DE TIENDA - Entrega 2
 * ============================================
 * Integración con DOM, Eventos y localStorage.
 * Sin prompt(), alert() ni confirm().
 */

// ========== CONSTANTES Y VARIABLES ==========
const NOMBRE_TIENDA = "Mi Tienda Virtual";
const IVA = 0.21;
const CLAVE_CARRITO = "carritoTienda";

let productos = [];
let carrito = [];

// ========== REFERENCIAS AL DOM ==========
const gridProductos = document.getElementById("grid-productos");
const listaCarrito = document.getElementById("lista-carrito");
const resumenCompra = document.getElementById("resumen-compra");
const mensajeFeedback = document.getElementById("mensaje-feedback");

// ========== FUNCIÓN: CARGAR PRODUCTOS ==========
/**
 * Carga productos desde JSON o usa fallback.
 * ENTRADA: ninguna
 * PROCESAMIENTO: fetch a data/productos.json
 * SALIDA: actualiza array productos
 */
function cargarProductos() {
    fetch("data/productos.json")
        .then((respuesta) => respuesta.json())
        .then((datos) => {
            productos = datos;
            renderizarProductos();
        })
        .catch(() => {
            productos = [
                { nombre: "Lápiz", precio: 150, stock: 50 },
                { nombre: "Cuaderno", precio: 450, stock: 30 },
                { nombre: "Goma", precio: 80, stock: 100 },
                { nombre: "Regla", precio: 200, stock: 25 },
                { nombre: "Sacapuntas", precio: 120, stock: 40 }
            ];
            renderizarProductos();
        });
}

// ========== FUNCIÓN: CARGAR CARRITO DESDE LOCALSTORAGE ==========
/**
 * Recupera el carrito guardado en localStorage.
 * ENTRADA: clave CLAVE_CARRITO
 * PROCESAMIENTO: JSON.parse
 * SALIDA: actualiza array carrito
 */
function cargarCarritoDesdeStorage() {
    const guardado = localStorage.getItem(CLAVE_CARRITO);
    if (guardado) {
        try {
            carrito = JSON.parse(guardado);
        } catch {
            carrito = [];
        }
    } else {
        carrito = [];
    }
}

// ========== FUNCIÓN: GUARDAR CARRITO EN LOCALSTORAGE ==========
/**
 * Persiste el carrito en localStorage.
 * ENTRADA: array carrito
 * PROCESAMIENTO: JSON.stringify
 * SALIDA: guarda en localStorage
 */
function guardarCarritoEnStorage() {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
}

// ========== FUNCIÓN: MOSTRAR MENSAJE EN DOM ==========
/**
 * Muestra feedback al usuario sin usar alert().
 * ENTRADA: texto, tipo ('exito' | 'error')
 * PROCESAMIENTO: modifica clases y texto del elemento
 * SALIDA: mensaje visible en el DOM
 */
function mostrarMensaje(texto, tipo = "exito") {
    mensajeFeedback.textContent = texto;
    mensajeFeedback.className = tipo;
    mensajeFeedback.setAttribute("class", tipo);
}

// ========== FUNCIÓN: OCULTAR MENSAJE ==========
function ocultarMensaje() {
    mensajeFeedback.textContent = "";
    mensajeFeedback.setAttribute("class", "vacio");
}

// ========== FUNCIÓN: RENDERIZAR PRODUCTOS EN EL DOM ==========
/**
 * Crea las tarjetas de productos en el HTML.
 * ENTRADA: array productos
 * PROCESAMIENTO: forEach, createElement, appendChild
 * SALIDA: nodos en grid-productos
 */
function renderizarProductos() {
    gridProductos.innerHTML = "";
    productos.forEach((producto, indice) => {
        const tarjeta = crearTarjetaProducto(producto, indice);
        gridProductos.appendChild(tarjeta);
    });
}

// ========== FUNCIÓN: CREAR TARJETA DE PRODUCTO ==========
/**
 * Genera el HTML de una tarjeta de producto con input y botón.
 * ENTRADA: producto (objeto), indice (número)
 * PROCESAMIENTO: createElement, eventos
 * SALIDA: elemento DOM
 */
function crearTarjetaProducto(producto, indice) {
    const div = document.createElement("div");
    div.className = "tarjeta-producto";
    div.setAttribute("data-indice", indice);

    const h3 = document.createElement("h3");
    h3.textContent = producto.nombre;

    const precio = document.createElement("p");
    precio.className = "precio";
    precio.textContent = `$${producto.precio}`;

    const stock = document.createElement("p");
    stock.className = "stock";
    stock.textContent = `Stock: ${producto.stock}`;

    const grupoAgregar = document.createElement("div");
    grupoAgregar.className = "agregar-grupo";

    const inputCantidad = document.createElement("input");
    inputCantidad.type = "number";
    inputCantidad.min = "1";
    inputCantidad.max = producto.stock;
    inputCantidad.value = "1";
    inputCantidad.setAttribute("aria-label", `Cantidad de ${producto.nombre}`);

    const btnAgregar = document.createElement("button");
    btnAgregar.textContent = "Agregar al carrito";
    btnAgregar.type = "button";
    btnAgregar.disabled = producto.stock <= 0;

    btnAgregar.addEventListener("click", () => {
        agregarAlCarrito(indice, parseInt(inputCantidad.value) || 1);
    });

    grupoAgregar.appendChild(inputCantidad);
    grupoAgregar.appendChild(btnAgregar);

    div.appendChild(h3);
    div.appendChild(precio);
    div.appendChild(stock);
    div.appendChild(grupoAgregar);

    return div;
}

// ========== FUNCIÓN: AGREGAR AL CARRITO ==========
/**
 * Valida y agrega producto al carrito.
 * ENTRADA: indice (número), cantidad (número)
 * PROCESAMIENTO: validaciones, push, localStorage
 * SALIDA: actualiza carrito y DOM
 */
function agregarAlCarrito(indice, cantidad) {
    if (indice < 0 || indice >= productos.length) {
        mostrarMensaje("Producto no válido.", "error");
        return;
    }

    const producto = productos[indice];

    if (cantidad <= 0 || isNaN(cantidad)) {
        mostrarMensaje("Ingresá una cantidad válida mayor a 0.", "error");
        return;
    }

    if (cantidad > producto.stock) {
        mostrarMensaje(`No hay suficiente stock. Máximo: ${producto.stock}`, "error");
        return;
    }

    const subtotal = producto.precio * cantidad;
    const itemCarrito = {
        producto: producto.nombre,
        cantidad: cantidad,
        precioUnitario: producto.precio,
        subtotal: subtotal
    };

    const existente = carrito.find((item) => item.producto === producto.nombre);
    if (existente) {
        existente.cantidad += cantidad;
        existente.subtotal = existente.cantidad * existente.precioUnitario;
    } else {
        carrito.push(itemCarrito);
    }

    guardarCarritoEnStorage();
    renderizarCarrito();
    mostrarMensaje(`Agregado: ${cantidad} x ${producto.nombre} = $${subtotal}`, "exito");
    setTimeout(ocultarMensaje, 2500);
}

// ========== FUNCIÓN: RENDERIZAR CARRITO EN EL DOM ==========
/**
 * Actualiza la lista del carrito en el HTML.
 * ENTRADA: array carrito
 * PROCESAMIENTO: forEach, createElement
 * SALIDA: nodos en lista-carrito
 */
function renderizarCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        const li = document.createElement("li");
        li.className = "carrito-vacio";
        li.textContent = "Tu carrito está vacío. Agregá productos para comenzar.";
        listaCarrito.appendChild(li);
        resumenCompra.innerHTML = "";
        return;
    }

    carrito.forEach((item, indice) => {
        const li = document.createElement("li");
        li.textContent = `${item.cantidad} x ${item.producto} - $${item.subtotal}`;

        const btnEliminar = document.createElement("button");
        btnEliminar.className = "eliminar-item";
        btnEliminar.textContent = "Eliminar";
        btnEliminar.type = "button";
        btnEliminar.addEventListener("click", () => eliminarDelCarrito(indice));

        li.appendChild(btnEliminar);
        listaCarrito.appendChild(li);
    });
}

// ========== FUNCIÓN: ELIMINAR DEL CARRITO ==========
function eliminarDelCarrito(indice) {
    carrito.splice(indice, 1);
    guardarCarritoEnStorage();
    renderizarCarrito();
    mostrarMensaje("Producto eliminado del carrito.", "exito");
    setTimeout(ocultarMensaje, 2000);
}

// ========== FUNCIÓN: CALCULAR Y MOSTRAR TOTAL ==========
/**
 * Calcula subtotal, IVA y total. Muestra en el DOM.
 * ENTRADA: array carrito
 * PROCESAMIENTO: reduce, cálculos
 * SALIDA: resumen en resumen-compra
 */
function calcularTotal() {
    if (carrito.length === 0) {
        mostrarMensaje("Tu carrito está vacío. Agregá productos antes de ver el total.", "error");
        return;
    }

    const subtotalGeneral = carrito.reduce((acum, item) => acum + item.subtotal, 0);
    const montoIVA = subtotalGeneral * IVA;
    const totalFinal = subtotalGeneral + montoIVA;

    resumenCompra.innerHTML = `
        <p>Subtotal: $${Math.round(subtotalGeneral)}</p>
        <p>IVA (21%): $${Math.round(montoIVA)}</p>
        <p class="total-final">TOTAL: $${Math.round(totalFinal)}</p>
        <p><em>¡Gracias por tu compra en ${NOMBRE_TIENDA}!</em></p>
    `;

    mostrarMensaje(`Total calculado: $${Math.round(totalFinal)}`, "exito");
    setTimeout(ocultarMensaje, 3000);
}

// ========== FUNCIÓN: VACIAR CARRITO ==========
function vaciarCarrito() {
    carrito = [];
    guardarCarritoEnStorage();
    renderizarCarrito();
    resumenCompra.innerHTML = "";
    mostrarMensaje("Carrito vaciado.", "exito");
    setTimeout(ocultarMensaje, 2000);
}

// ========== CONFIGURACIÓN DE EVENTOS ==========
/**
 * Asigna los event listeners a los botones.
 */
function configurarEventos() {
    document.getElementById("btn-calcular-total").addEventListener("click", calcularTotal);
    document.getElementById("btn-vaciar-carrito").addEventListener("click", vaciarCarrito);
}

// ========== INICIALIZACIÓN ==========
/**
 * Punto de entrada: carga datos, restaura carrito, renderiza y configura eventos.
 */
function iniciarSimulador() {
    cargarCarritoDesdeStorage();
    cargarProductos();
    renderizarCarrito();
    configurarEventos();
}

// Ejecutar al cargar el DOM
document.addEventListener("DOMContentLoaded", iniciarSimulador);
