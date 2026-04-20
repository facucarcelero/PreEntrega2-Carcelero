# 📚 Guía para Principiantes - Simulador de Tienda

Esta guía explica **cada concepto** del proyecto como si fuera la primera vez que lo ves. Léela tranquilamente.

---

## 🎯 ¿Qué hace este proyecto?

Simula una tienda donde puedes:
1. Ver productos disponibles
2. Elegir qué comprar y cuántas unidades
3. Ver el total a pagar (con IVA incluido)

---

## 📁 Estructura del proyecto

```
PreEntrega1/
├── index.html          ← Página web (estructura y contenido)
├── js/
│   └── script.js       ← Toda la lógica del simulador
└── GUIA_PRINCIPIANTE.md  ← Esta guía
```

**¿Por qué separar HTML y JS?** Para organizar: el HTML es la "cara" y el JS es el "cerebro". Así el código es más fácil de mantener.

---

## 🔤 Conceptos explicados

### 1. Variables y constantes

```javascript
const NOMBRE_TIENDA = "Mi Tienda Virtual";  // const = NO cambia
let totalCompra = 0;                         // let = SÍ puede cambiar
let carrito = [];                            // Array vacío
```

- **const**: valor fijo durante toda la ejecución (nombre de tienda, IVA).
- **let**: valor que puede cambiar (carrito, total).
- **Array [ ]**: lista ordenada. Puede estar vacía `[]` o tener elementos `[1, 2, 3]`.

---

### 2. Arrays de objetos

```javascript
const productos = [
    { nombre: "Lápiz", precio: 150, stock: 50 },
    { nombre: "Cuaderno", precio: 450, stock: 30 },
    // ...
];
```

Cada producto es un **objeto** con propiedades: `nombre`, `precio`, `stock`.
Para acceder: `productos[0].nombre` → "Lápiz", `productos[0].precio` → 150.

---

### 3. Funciones (entrada → procesamiento → salida)

Toda función bien diseñada sigue este flujo:

| Fase | ¿Qué es? | Ejemplo |
|------|----------|---------|
| **Entrada** | Datos que recibe | `prompt()`, parámetros, arrays globales |
| **Procesamiento** | Lógica que aplica | cálculos, condicionales, ciclos |
| **Salida** | Resultado que devuelve/muestra | `alert()`, `console.log()`, `return` |

**Nuestras 3 funciones:**

1. **mostrarProductos()**: Entrada = array productos → Procesamiento = ciclo for → Salida = alert con lista
2. **seleccionarProducto()**: Entrada = prompt del usuario → Procesamiento = validaciones con IF → Salida = agrega al carrito
3. **calcularTotal()**: Entrada = array carrito → Procesamiento = ciclo for + cálculos → Salida = alert con total

---

### 4. Condicionales (IF)

```javascript
if (indice < 0 || indice >= productos.length) {
    alert("Número inválido");
    return;  // Sale de la función
}
```

- **if**: "Si se cumple esta condición, ejecuta este bloque".
- **||**: operador "O" (OR) - si alguna condición es verdadera.
- **return**: termina la función ahí mismo.

---

### 5. Ciclos (for y while)

**for** - cuando sabes cuántas veces repetir:
```javascript
for (let i = 0; i < productos.length; i++) {
    // Se ejecuta una vez por cada producto
}
```

**while** - cuando repites hasta que una condición sea falsa:
```javascript
while (continuar) {
    mostrarProductos();
    seleccionarProducto();
    continuar = confirm("¿Agregar más?");
}
```

---

### 6. Cuadros de diálogo

| Método | Uso | Devuelve |
|--------|-----|----------|
| **alert()** | Mostrar mensaje al usuario | Nada |
| **prompt()** | Pedir texto al usuario | Lo que escribió (string) |
| **confirm()** | Pregunta Sí/No | `true` o `false` |

**Concatenar textos:**
```javascript
"Subtotal: $" + subtotalGeneral + "\nIVA: $" + montoIVA
```
- `+` une textos con variables
- `\n` hace salto de línea

---

### 7. Consola (console.log)

```javascript
console.log("Carrito actualizado:", carrito);
```

Sirve para **depurar** (ver qué está pasando) sin molestar al usuario. Solo visible en F12 → Consola.

---

## ✅ Checklist de la consigna

| Requisito | ¿Dónde está? |
|-----------|---------------|
| Variables, constantes y arrays | Líneas 15-25 de script.js |
| Funciones con interacción | 3 funciones + iniciarSimulador |
| Ciclos (for, while) | for en mostrarProductos, calcularTotal; while en iniciarSimulador |
| Condicionales (if) | En seleccionarProducto y calcularTotal |
| Prompt, Confirm, Alert | En todas las funciones |
| Consola JS | console.log en varias funciones |
| HTML + JS referenciado | index.html línea con script src |
| Descripción en HTML | 2 párrafos en index.html |
| 3 funciones (entrada-proceso-salida) | mostrarProductos, seleccionarProducto, calcularTotal |
| Invocación de funciones | iniciarSimulador() llama a las 3 |
| Mensajes claros, concatenación, \n | En todos los alert y prompt |

---

## 📦 Cómo entregar

1. Renombra la carpeta: `Entregable1+TuApellido`
2. Comprímela en formato .ZIP
3. El archivo final debe llamarse: `Entregable1+TuApellido.zip`

---

## 🚀 Cómo probar

1. Abre `index.html` en tu navegador (doble clic)
2. Se abrirán los diálogos automáticamente
3. Abre F12 → Consola para ver los `console.log`
4. O escribe `iniciarSimulador()` en la consola para reiniciar

---

## 💡 Ideas para expandir en el futuro

- Agregar más productos al array
- Descuento si compra más de 5 unidades
- Guardar el carrito en localStorage
- Filtrar productos por categoría
- Validar que el usuario no deje campos vacíos
