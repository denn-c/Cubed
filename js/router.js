// js/router.js

const routes = {
    '/bloquetas': 'pages/bloquetas.html',
    '/fierros': 'pages/fierros.html',
    '/agregado': 'pages/agregado.html',
    '/instalaciones': 'pages/instalaciones.html',
}

// Función para manejar el cambio de ruta
export async function router() {
    const hash = window.location.hash.slice(1) || '/bloquetas'
    const route = routes[hash] || 'pages/404.html' // Ruta por defecto si no se encuentra la ruta
    const app = document.getElementById('content')

    try {
        // Cargar el contenido del archivo HTML
        const response = await fetch(route)
        if (response.ok) {
            app.innerHTML = await response.text()
        } else {
            app.innerHTML = '<h1>Error 404: Página no encontrada</h1>'
        }
    } catch (error) {
        app.innerHTML = '<h1>Error al cargar la página</h1>'
    }
}

// Escuchar los eventos de cambio en el hash
window.addEventListener('hashchange', router)
window.addEventListener('load', router)
