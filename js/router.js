const routes = {
    '/bloquetas': 'pages/bloquetas.html',
    '/fierros': 'pages/fierros.html',
    '/agregado': 'pages/agregado.html',
    '/instalaciones': 'pages/instalaciones.html',
}

export async function router() {
    const hash = window.location.hash.slice(1) || '/instalaciones'
    const route = routes[hash] || 'index.html'
    const app = document.getElementById('content')

    try {
        const response = await fetch(route)
        if (response.ok) {
            app.innerHTML = await response.text()
        } else {
            app.innerHTML = '<h1>Error 404: Página no encontrada</h1>'
        }

        const links = document.querySelectorAll('.item__link')
        links.forEach((link) => link.classList.remove('item__link--active'))
        const activeLink = document.querySelector(`a[href="#${hash}"]`)
        if (activeLink) {
            activeLink.classList.add('item__link--active')
        }
    } catch (error) {
        app.innerHTML = '<h1>Error al cargar la página</h1>'
    }
}

window.addEventListener('hashchange', router)
window.addEventListener('load', router)
