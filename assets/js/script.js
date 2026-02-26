// ===== URBAN D.N.A - Y2K STYLE =====

// =====================
// 📦 DATOS GLOBALES
// =====================

//  PRODUCTOS - CATÁLOGO CHILENO 2007
const productos = [

    { id: 1, nombre: "Pulseras Neón", precio: 1000, cat: "emo", img: "https://acdn-us.mitiendanube.com/stores/326/260/products/0-793cf19615cebbedb317072462814477-1024-1024.webp", glow: true },
    { id: 2, nombre: "Cinturón Cadenas mujer ", precio: 8000, cat: "punk", img: "https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/0df9c03296311498ef545bc2f478a2c7.jpg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp" },
    { id: 3, nombre: "Polera Negativa", precio: 12000, cat: "emo", img: "https://http2.mlstatic.com/D_NQ_NP_2X_943372-CBT101772481228_122025-T.webp" },
    { id: 4, nombre: "Pantalón punk negro", precio: 18000, cat: "punk", img: "https://m.media-amazon.com/images/I/71II8rGM6JL._AC_UY1000_.jpg" },
    { id: 5, nombre: "Botines Plataforma", precio: 25000, cat: "goth", img: "https://http2.mlstatic.com/D_NQ_NP_828212-CBT72909774504_112023-O-botas-de-plataforma-goticas-demonia-martin-para-mujer-23a.webp" },
    { id: 6, nombre: "Labial Negro", precio: 3500, cat: "emo", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBPDwaYlpBJBIhD-K2PTHnZ9aXn11-CtE0FA_oMSyY5kkIsd1W" },
    { id: 7, nombre: "Collar de Púas", precio: 6000, cat: "goth", img: "https://demaskotas.cl/wp-content/uploads/2021/08/collar-para-perros-puas.jpg" },
    { id: 8, nombre: "Gorra Nike", precio: 15000, cat: "urban", img: "https://http2.mlstatic.com/D_722034-MLA73064112383_112023-O.jpg" },
    { id: 9, nombre: "Gel Caprice", precio: 4500, cat: "emo", img: "https://static.salcobrandonline.cl/spree/products/19037/large_webp/5990511.webp?1641480106" },
    { id: 10, nombre: "Anillo Calavera", precio: 3000, cat: "goth", img: "https://static.wixstatic.com/media/e9f324_12376b6c13d84f92954c79fceb6ceac5~mv2.jpg/v1/fit/w_500,h_500,q_90/file.jpgÍ" },
    { id: 11, nombre: "Parche Ramones", precio: 2500, cat: "punk", img: "https://http2.mlstatic.com/D_NQ_NP_883887-MLC69691811049_052023-O.webp" },
    { id: 12, nombre: "Pulsera Cuero", precio: 5000, cat: "goth", img: "https://http2.mlstatic.com/D_NQ_NP_883887-MLC69691811049_052023-O.webp" }
];

// Carrito como objeto: { id_producto: { producto, cantidad } }
let carrito = {};

// =====================
// 🪟 CONTROL DE VENTANAS FLOTANTES
// =====================

function minimizeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (win) {
        win.style.display = 'none';
        updateTaskbarButton(windowId, false);
    }
}

function restoreWindow(windowId) {
    const win = document.getElementById(windowId);
    if (win) {
        win.style.display = 'block';
        updateTaskbarButton(windowId, true);
    }
}

function updateTaskbarButton(windowId, isActive) {
    const taskbarBtn = document.getElementById('taskbar-' + windowId.replace('main-window', 'main').replace('-window', ''));
    const menuBtn = document.getElementById('btn-' + windowId);
    
    if (taskbarBtn) {
        if (isActive) {
            taskbarBtn.classList.add('active');
        } else {
            taskbarBtn.classList.remove('active');
        }
    }
    
    if (menuBtn) {
        if (isActive) {
            menuBtn.classList.add('active');
        } else {
            menuBtn.classList.remove('active');
        }
    }
}

function toggleWindowFromMenu(windowId) {
    const win = document.getElementById(windowId);
    if (win) {
        if (win.style.display === 'none') {
            restoreWindow(windowId);
        } else {
            // Si está visible, minimizar
            minimizeWindow(windowId);
        }
    }
    // Cerrar menú inicio
    const menu = document.getElementById('start-menu');
    if (menu) {
        menu.classList.remove('active');
    }
}

function maximizeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (win) {
        if (win.dataset.maximized === 'true') {
            win.style.top = win.dataset.prevTop;
            win.style.left = win.dataset.prevLeft;
            win.style.width = win.dataset.prevWidth;
            win.dataset.maximized = 'false';
        } else {
            win.dataset.prevTop = win.style.top;
            win.dataset.prevLeft = win.style.left;
            win.dataset.prevWidth = win.style.width;
            win.style.top = '10px';
            win.style.left = '10px';
            win.style.width = '90%';
            win.dataset.maximized = 'true';
        }
    }
}

function closeWindow(windowId) {
    const win = document.getElementById(windowId);
    if (win) {
        win.style.display = 'none';
        updateTaskbarButton(windowId, false);
    }
}

// Drag and drop para ventanas
let dragWindow = null;
let dragOffsetX = 0;
let dragOffsetY = 0;
let dragOriginalTransform = '';

function startDrag(e, windowId) {
    dragWindow = document.getElementById(windowId);
    if (dragWindow) {
        const rect = dragWindow.getBoundingClientRect();
        
        // Guardar el transform original para ventanas centradas
        dragOriginalTransform = dragWindow.style.transform;
        
        // Quitar el transform durante el arrastre
        dragWindow.style.transform = 'none';
        
        // Calcular offset desde el borde de la ventana
        dragOffsetX = e.clientX - rect.left;
        dragOffsetY = e.clientY - rect.top;
        
        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', stopDrag);
    }
}

function doDrag(e) {
    if (dragWindow) {
        dragWindow.style.position = 'fixed';
        dragWindow.style.left = (e.clientX - dragOffsetX) + 'px';
        dragWindow.style.top = (e.clientY - dragOffsetY) + 'px';
    }
}

function stopDrag() {
    if (dragWindow) {
        // Restaurar el transform original si existía
        if (dragOriginalTransform) {
            // Mantener la posición actual sin transform
        }
    }
    dragWindow = null;
    dragOriginalTransform = '';
    document.removeEventListener('mousemove', doDrag);
    document.removeEventListener('mouseup', stopDrag);
}

// =====================
// 🪟 REDIMENSIONAR VENTANAS
// =====================

let resizeWindow = null;
let resizeDirection = '';
let resizeStartX = 0;
let resizeStartY = 0;
let resizeStartWidth = 0;
let resizeStartHeight = 0;

function startResize(e, windowId, direction) {
    e.preventDefault();
    e.stopPropagation();
    resizeWindow = document.getElementById(windowId);
    resizeDirection = direction;
    resizeStartX = e.clientX;
    resizeStartY = e.clientY;
    resizeStartWidth = parseInt(getComputedStyle(resizeWindow).width);
    resizeStartHeight = parseInt(getComputedStyle(resizeWindow).height);
    document.addEventListener('mousemove', doResize);
    document.addEventListener('mouseup', stopResize);
}

// Redimensionar desde el handle de la esquina
function startResizeFromHandle(e, windowId) {
    e.preventDefault();
    e.stopPropagation();
    resizeWindow = document.getElementById(windowId);
    resizeDirection = 'se';
    resizeStartX = e.clientX;
    resizeStartY = e.clientY;
    resizeStartWidth = parseInt(getComputedStyle(resizeWindow).width);
    resizeStartHeight = parseInt(getComputedStyle(resizeWindow).height);
    document.addEventListener('mousemove', doResizeFromHandle);
    document.addEventListener('mouseup', stopResizeFromHandle);
}

function doResizeFromHandle(e) {
    if (!resizeWindow) return;
    
    const dx = e.clientX - resizeStartX;
    const dy = e.clientY - resizeStartY;
    
    const newWidth = Math.max(200, resizeStartWidth + dx);
    const newHeight = Math.max(150, resizeStartHeight + dy);
    
    resizeWindow.style.width = newWidth + 'px';
    resizeWindow.style.height = newHeight + 'px';
}

function stopResizeFromHandle() {
    resizeWindow = null;
    document.removeEventListener('mousemove', doResizeFromHandle);
    document.removeEventListener('mouseup', stopResizeFromHandle);
}

function doResize(e) {
    if (!resizeWindow) return;
    
    const dx = e.clientX - resizeStartX;
    const dy = e.clientY - resizeStartY;
    
    if (resizeDirection.includes('e')) {
        resizeWindow.style.width = Math.max(200, resizeStartWidth + dx) + 'px';
    }
    if (resizeDirection.includes('s')) {
        resizeWindow.style.height = Math.max(150, resizeStartHeight + dy) + 'px';
    }
    if (resizeDirection.includes('w')) {
        const newWidth = Math.max(200, resizeStartWidth - dx);
        resizeWindow.style.width = newWidth + 'px';
    }
    if (resizeDirection.includes('n')) {
        const newHeight = Math.max(150, resizeStartHeight - dy);
        resizeWindow.style.height = newHeight + 'px';
    }
}

function stopResize() {
    resizeWindow = null;
    resizeDirection = '';
    document.removeEventListener('mousemove', doResize);
    document.removeEventListener('mouseup', stopResize);
}

// =====================
// 🟦 MENÚ INICIO WINDOWS
// =====================

function toggleStartMenu() {
    const menu = document.getElementById('start-menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(e) {
    const menu = document.getElementById('start-menu');
    const button = document.getElementById('start-button');
    if (menu && button) {
        if (!menu.contains(e.target) && !button.contains(e.target)) {
            menu.classList.remove('active');
        }
    }
});

// =====================
// ⏰ RELOJ DE LA BARRA DE TAREAS
// =====================

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const clockEl = document.getElementById('taskbar-clock');
    if (clockEl) {
        clockEl.textContent = hours + ':' + minutes;
    }
}

// Actualizar reloj cada segundo
setInterval(updateClock, 1000);
updateClock(); // Llamada inicial

// =====================
// 🎵 AUDIO REACTIVE & TIME-BASED BACKGROUND
// =====================

const audioPlayer = document.getElementById("audio-player");
const playBtnFloat = document.getElementById("play-btn-float");
const pauseBtnFloat = document.getElementById("pause-btn-float");
const audioGlow = document.getElementById("audio-glow");
const timeOverlay = document.getElementById("time-overlay");

// Análisis de audio para reactividad
let audioContext, analyser, dataArray;
let audioInitialized = false;
let analysisStarted = false;

function initAudioAnalyser() {
    if (audioInitialized) return;
    
    try {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.8;
        
        const source = audioContext.createMediaElementSource(audioPlayer);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        
        dataArray = new Uint8Array(analyser.frequencyBinCount);
        audioInitialized = true;
        
        console.log('Audio analyser inicializado');
        
        // Iniciar loop de análisis solo si no ha comenzado
        if (!analysisStarted) {
            analysisStarted = true;
            analyzeAudio();
        }
    } catch (e) {
        console.log('Audio analyser no disponible:', e);
    }
}

// Forzar análisis continuo aunque no haya audio cargando
function startAudioAnalysis() {
    if (!audioInitialized) {
        initAudioAnalyser();
    }
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

function analyzeAudio() {
    // Siempre continuar el loop
    requestAnimationFrame(analyzeAudio);
    
    if (!analyser || !audioPlayer || !audioInitialized) return;
    
    // Si el audio no está sonando, remover glow
    if (audioPlayer.paused) {
        if (audioGlow) {
            audioGlow.classList.remove('active');
        }
        return;
    }
    
    try {
        analyser.getByteFrequencyData(dataArray);
    } catch(e) {
        return;
    }
    
    // Calcular promedio de frecuencias
    let sum = 0;
    let bassSum = 0;
    let midSum = 0;
    
    const len = dataArray.length;
    for (let i = 0; i < len; i++) {
        sum += dataArray[i];
        if (i < len * 0.2) bassSum += dataArray[i];
        else if (i < len * 0.5) midSum += dataArray[i];
    }
    
    const average = sum / len;
    const bass = bassSum / (len * 0.2);
    const mid = midSum / (len * 0.3);
    
    // Reaccionar según intensidad - Más sensible
    if (audioGlow) {
        // Threshold más bajo para que reaccione más fácil
        const threshold = 10;
        if (average > threshold || bass > 20) {
            audioGlow.classList.add('active');
            
            // Intensidad ligeramente aumentada
            const intensity = Math.min(Math.max(average / 100, 0.3), 0.55);
            audioGlow.style.opacity = intensity;
            
            // Cambiar posición gradualmente - solo cambiar cada cierto tiempo
            // Usamos los datos del audio para una transición más fluida
            const x = 30 + (bass / 255) * 40; // Posición basada en bajos
            const y = 30 + (mid / 255) * 40;   // Posición basada en medios
            
            // Colores más suaves
            audioGlow.style.background = `radial-gradient(ellipse at ${x}% ${y}%, 
                rgba(47, 157, 220, ${0.12 + bass/400}) 0%,
                rgba(0, 200, 255, ${0.08 + mid/500}) 30%,
                rgba(136, 216, 176, ${0.04 + average/800}) 50%,
                transparent 70%)`;
        } else {
            audioGlow.classList.remove('active');
            // Las estrellas siempre permanecen activas, nunca se detienen
        }
    }
}

// Sistema de tiempo (día/noche)
function updateTimeOfDay() {
    const hour = new Date().getHours();
    const timeLayer = document.getElementById('time-overlay');
    
    if (timeLayer) {
        // Día: 6am - 6pm, Noche: 6pm - 6am
        if (hour >= 6 && hour < 18) {
            timeLayer.className = 'bg-layer bg-time day';
        } else {
            timeLayer.className = 'bg-layer bg-time night';
        }
    }
    
    // Actualizar cada minuto
    setTimeout(updateTimeOfDay, 60000);
}

// Volumen bajo
audioPlayer.volume = 0.4;

// Iniciar análisis inmediatamente para capturar el audio cuando reproduzca
initAudioAnalyser();

// Iniciar analyser cuando el audio comienza
audioPlayer.addEventListener('play', () => {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
    updatePlayStatus('♪ Playing...');
    console.log('Audio reproduciendo, luces activadas');
});

audioPlayer.addEventListener('pause', () => {
    updatePlayStatus('❚❚ Paused');
    if (audioGlow) audioGlow.classList.remove('active');
    // Las estrellas siempre permanecen activas
});

// =====================
// 🎵 AUDIO PLAYER CONTROLS (Winamp Flotante)
// =====================

playBtnFloat?.addEventListener("click", () => {
    audioPlayer.play();
});

pauseBtnFloat?.addEventListener("click", () => {
    audioPlayer.pause();
});

// Floating Winamp controls
playBtnFloat?.addEventListener("click", () => {
    audioPlayer.play();
});

pauseBtnFloat?.addEventListener("click", () => {
    audioPlayer.pause();
});

function toggleAudio() {
    if (audioPlayer.paused) {
        audioPlayer.play();
    } else {
        audioPlayer.pause();
    }
}

function updatePlayStatus(text) {
    const nowPlaying = document.querySelector('.now-playing');
    if (nowPlaying) nowPlaying.textContent = text;
    
    const trackName = document.querySelector('.track-name');
    if (trackName) trackName.textContent = 'Kawaii Kaiwai - Bisque Doll ED';
}

// Activar audio con primer click
window.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play().then(() => {
            if (!audioContext) initAudioAnalyser();
            updatePlayStatus('♪ Playing...');
        }).catch(e => console.log('Esperando interacción...'));
    }
}, { once: true });

// Iniciar sistema de tiempo
updateTimeOfDay();

//  RENDER PRODUCTOS
function renderProductos(lista = productos) {
    const grid = document.getElementById("products-grid");
    if (!grid) return;
    
    grid.innerHTML = "";
    
    lista.forEach(producto => {
        const card = document.createElement("div");
        card.className = "vista-card" + (producto.glow ? " glow-product" : "");
        
        // Verificar si es emoji o URL de imagen
        const isEmoji = producto.img && producto.img.length <= 10;
        const imgContent = isEmoji 
            ? producto.img 
            : `<img src="${producto.img}" alt="${producto.nombre}" onerror="this.style.display='none'">`;
        
        card.innerHTML = `
            <div class="vista-card-img">${imgContent}</div>
            <h4>${producto.nombre}</h4>
            <div class="price">$${producto.precio.toLocaleString("es-CL")}</div>
            <div class="tag">${producto.cat}</div>
            ${producto.glow ? '<div class="glow-indicator">💫 BRILLA</div>' : ''}
            <button onclick="agregarAlCarrito(${producto.id})">+ Agregar</button>
        `;
        
        grid.appendChild(card);
    });
}

// 🛒 AGREGAR AL CARRITO
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (!producto) return;
    
    if (carrito[id]) {
        carrito[id].cantidad++;
    } else {
        carrito[id] = { producto, cantidad: 1 };
    }
    actualizarCarrito();
    
    // Mostrar en chat
    const chat = document.getElementById("chat-historial");
    if (chat) {
        const msg = document.createElement("p");
        msg.className = "user-msg";
        msg.textContent = `→ Agregué ${producto.nombre} al carrito`;
        chat.appendChild(msg);
        chat.scrollTop = chat.scrollHeight;
    }
}

// 🔢 ACTUALIZAR CANTIDAD DESDE INPUT
function actualizarCantidad(id, nuevaCantidad) {
    nuevaCantidad = parseInt(nuevaCantidad);
    if (!carrito[id] || isNaN(nuevaCantidad) || nuevaCantidad < 1) return;
    
    if (nuevaCantidad === 0) {
        delete carrito[id];
    } else {
        carrito[id].cantidad = nuevaCantidad;
    }
    actualizarCarrito();
}

// 🗑️ ELIMINAR PRODUCTO COMPLETO
function eliminarProducto(id) {
    if (!carrito[id]) return;
    
    const nombre = carrito[id].producto.nombre;
    delete carrito[id];
    actualizarCarrito();
    
    const chat = document.getElementById("chat-historial");
    if (chat) {
        const msg = document.createElement("p");
        msg.className = "user-msg";
        msg.textContent = `→ Eliminé ${nombre} del carrito`;
        chat.appendChild(msg);
        chat.scrollTop = chat.scrollHeight;
    }
}

//  ACTUALIZAR CARRITO
function actualizarCarrito() {
    const countEl = document.getElementById("cart-count");
    const totalEl = document.getElementById("cart-total");
    const itemsEl = document.getElementById("cart-items");
    
    // Calcular total de items
    let totalItems = 0;
    Object.values(carrito).forEach(item => {
        totalItems += item.cantidad;
    });
    
    if (countEl) countEl.textContent = totalItems;
    if (totalEl) {
        const total = calcularTotal();
        totalEl.textContent = "$" + total.toLocaleString("es-CL");
    }
    
    // Renderizar items en el panel
    if (itemsEl) {
        if (Object.keys(carrito).length === 0) {
            itemsEl.innerHTML = '<p class="cart-empty">Carrito vacío</p>';
        } else {
            itemsEl.innerHTML = Object.values(carrito).map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.producto.nombre}</div>
                        <div class="cart-item-qty">
                            <button onclick="actualizarCantidad(${item.producto.id}, ${item.cantidad - 1})">-</button>
                            <input type="number" value="${item.cantidad}" min="0" 
                                onchange="actualizarCantidad(${item.producto.id}, this.value)"
                                onkeyup="if(event.key==='Enter') actualizarCantidad(${item.producto.id}, this.value)">
                            <button onclick="actualizarCantidad(${item.producto.id}, ${item.cantidad + 1})">+</button>
                        </div>
                        <div class="cart-item-price">$${(item.producto.precio * item.cantidad).toLocaleString("es-CL")}</div>
                    </div>
                    <div class="cart-item-actions">
                        <button class="cart-item-remove" onclick="eliminarProducto(${item.producto.id})" title="Eliminar">×</button>
                    </div>
                </div>
            `).join('');
        }
    }
}

//  CALCULAR TOTAL CON DESCUENTOS
function calcularTotal() {
    let total = 0;
    Object.values(carrito).forEach(item => {
        total += item.producto.precio * item.cantidad;
    });
    
    if (total > 100000) return total * 0.75;
    if (total > 50000) return total * 0.85;
    if (total > 25000) return total * 0.90;
    return total;
}

//  FILTRAR POR CATEGORÍA
function filter(categoria) {
    if (categoria === "all") {
        renderProductos(productos);
    } else {
        const filtrados = productos.filter(p => p.cat === categoria);
        renderProductos(filtrados);
    }
    
    // Resaltar botón activo
    document.querySelectorAll('.category-list button').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase().includes(categoria) || 
            (categoria === 'all' && btn.textContent.includes('Todo'))) {
            btn.classList.add('active');
        }
    });
}

// ✅ REALIZAR PEDIDO
function realizarPedidoWeb() {
    if (Object.keys(carrito).length === 0) {
        alert("¡Tu carrito está vacío! Agrega productos primero");
        return;
    }
    
    // Calcular total original
    let totalOriginal = 0;
    let totalItems = 0;
    Object.values(carrito).forEach(item => {
        totalOriginal += item.producto.precio * item.cantidad;
        totalItems += item.cantidad;
    });
    
    const total = calcularTotal();
    const ahorro = totalOriginal - total;
    
    const chat = document.getElementById("chat-historial");
    if (chat) {
        chat.innerHTML += `
            <p class="system-msg" style="color: #00aa00; font-weight: bold;">
                ★ PEDIDO CONFIRMADO ★<br>
                Items: ${totalItems}<br>
                Total: $${total.toLocaleString("es-CL")}<br>
                ${ahorro > 0 ? `Ahorro: -$${ahorro.toLocaleString("es-CL")}` : ''}<br>
                ¡Gracias por tu compra!
            </p>
        `;
        chat.scrollTop = chat.scrollHeight;
    }
    
    alert(`¡Pedido confirmado!\nTotal: $${total.toLocaleString("es-CL")}\n¡Gracias por comprar en Tribu Shop 2007!`);
    
    carrito = {};
    actualizarCarrito();
}

// ⚡ EFECTO ZUMBIDO (para compatibilidad)
function darZumbido() {
    const mainWindow = document.querySelector(".main-container");
    if (mainWindow) {
        mainWindow.classList.add("shake");
        setTimeout(() => mainWindow.classList.remove("shake"), 600);
    }
}

// 🎵 ACTIVAR SONIDO AL HACER CLICK
window.addEventListener("click", () => {
    // Iniciar análisis de audio al hacer click
    initAudioAnalyser();
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
    if (audioPlayer.paused) {
        audioPlayer.play().then(() => {
            console.log('Audio started after click');
        }).catch(e => console.log('No se pudo reproducir audio:', e));
    }
}, { once: true });

// Iniciar análisis inmediatamente (pero puede fallar hasta que haya interacción del usuario)
initAudioAnalyser();
requestAnimationFrame(analyzeAudio);

// =====================
// 🧭 NAVEGACIÓN DEL NAVBAR
// =====================

function showSection(sectionName) {
    const welcomePanel = document.getElementById('welcome-panel');
    const productsPanel = document.getElementById('products-panel');
    const contactPanel = document.getElementById('contact-panel');
    const ordersPanel = document.getElementById('orders-panel');
    
    // Ocultar todos los paneles
    if (welcomePanel) welcomePanel.style.display = 'none';
    if (productsPanel) productsPanel.style.display = 'none';
    if (contactPanel) contactPanel.style.display = 'none';
    if (ordersPanel) ordersPanel.style.display = 'none';
    
    // Mostrar según sección
    switch(sectionName) {
        case 'inicio':
            if (welcomePanel) welcomePanel.style.display = 'block';
            if (productsPanel) productsPanel.style.display = 'block';
            break;
        case 'tienda':
            if (productsPanel) productsPanel.style.display = 'block';
            filter('all');
            break;
        case 'coleccion':
            if (productsPanel) productsPanel.style.display = 'block';
            break;
        case 'pedidos':
            if (ordersPanel) ordersPanel.style.display = 'block';
            break;
        case 'contacto':
            if (contactPanel) contactPanel.style.display = 'block';
            break;
    }
    
    // Actualizar menú activo
    document.querySelectorAll('.navbar-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.section === sectionName) {
            link.classList.add('active');
        }
    });
}

// Event listeners para el navbar
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.navbar-menu a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            if (section) {
                showSection(section);
            }
        });
    });
});

// =====================
// 🔍 BUSCADOR DE PRODUCTOS
// =====================

function buscarProductos(termino) {
    termino = termino.toLowerCase().trim();
    
    if (termino === '') {
        renderProductos(productos);
        return;
    }
    
    const resultados = productos.filter(p => 
        p.nombre.toLowerCase().includes(termino) || 
        p.cat.toLowerCase().includes(termino)
    );
    
    renderProductos(resultados);
    
    // Mostrar mensaje si no hay resultados
    const grid = document.getElementById('products-grid');
    if (grid && resultados.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 20px;">No se encontraron productos</p>';
    }
}

// =====================
// 🚀 INICIALIZAR
// =====================

// Resaltar categoría "Todo" al inicio
document.querySelectorAll('.category-list button').forEach(btn => {
    btn.classList.remove('active');
    if (btn.textContent.includes('Todo')) {
        btn.classList.add('active');
    }
});

renderProductos();
