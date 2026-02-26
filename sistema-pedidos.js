const catalogo = {
    producto1: { nombre: "Camiseta", precio: 25 },
    producto2: { nombre: "Pantalón", precio: 45 },
    producto3: { nombre: "Zapatos", precio: 80 },
    producto4: { nombre: "Gorra", precio: 15 }
};

function mostrarCatalogo() {
    console.log("=== CATÁLOGO DE PRODUCTOS ===");
    for (const clave in catalogo) {
        console.log(`${catalogo[clave].nombre} - $${catalogo[clave].precio}`);
    }
    console.log("=============================");
}

function aplicarDescuento(total) {
    if (total > 100) {
        return total * 0.80;
    } else if (total > 50) {
        return total * 0.90;
    }
    return total;
}

function calcularTotal(pedido) {
    let total = 0;
    for (const producto of pedido) {
        total += producto.precio;
    }
    total = aplicarDescuento(total);
    return total;
}

function realizarPedido(pedido) {
    const total = calcularTotal(pedido);
    console.log(`\n=== RESUMEN DEL PEDIDO ===`);
    for (const producto of pedido) {
        console.log(`- ${producto.nombre}: $${producto.precio}`);
    }
    console.log(`Total con descuento: $${total.toFixed(2)}`);
    console.log("¡Pedido confirmado! Gracias por tu compra.");
}

mostrarCatalogo();

const miPedido = [
    { nombre: "Camiseta", precio: 25 },
    { nombre: "Pantalón", precio: 45 },
    { nombre: "Zapatos", precio: 80 }
];

realizarPedido(miPedido);
