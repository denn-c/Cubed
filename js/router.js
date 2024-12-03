const routes = {
    '/bloquetas': 'pages/bloquetas.html',
    '/fierros': 'pages/fierros.html',
    '/agregado': 'pages/agregado.html',
    '/instalaciones': 'pages/instalaciones.html',
    '/electricidad': 'pages/electricidad.html',
    '/gasfiteria': 'pages/gasfiteria.html',
    '/camaras': 'pages/camaras.html',
}

const scripts = {
    '/bloquetas': 'js/pages/bloquetas.js',
    '/fierros': 'js/pages/fierros.js',
    '/agregado': 'js/pages/agregado.js',
    '/electricidad': 'js/pages/electricidad.js',
    '/gasfiteria': 'js/pages/gasfiteria.js',
    '/camaras': 'js/pages/camaras.js',
}

export async function router() {
    const hash = window.location.hash.slice(1) || '/electricidad'
    const route = routes[hash] || 'pages/404.html'
    const app = document.getElementById('content')

    try {
        const response = await fetch(route)
        if (response.ok) {
            app.innerHTML = await response.text()
            loadScript(scripts[hash])
        } else {
            app.innerHTML = '<h1>Error 404: Página no encontrada</h1>'
        }

        const links = document.querySelectorAll('.item__link')
        links.forEach((link) => link.classList.remove('item__link--active'))
        const mainItem = document.querySelector('.list__item.sub')
        if (['/electricidad', '/gasfiteria', '/camaras'].includes(hash)) {
            mainItem.classList.add('item__link--active')
        } else {
            const activeLink = document.querySelector(`a[href="#${hash}"]`)
            if (activeLink) {
                activeLink.classList.add('item__link--active')
            }
            if (mainItem) mainItem.classList.remove('item__link--active')
        }
    } catch (error) {
        app.innerHTML = '<h1>Error al cargar la página</h1>'
    }
}

function loadScript(scriptPath) {
    if (!scriptPath) return
    const existingScript = document.querySelector(`script[src="${scriptPath}"]`)
    if (existingScript) {
        existingScript.remove()
    }
    const script = document.createElement('script')
    script.src = scriptPath
    script.type = 'module'
    script.defer = true
    document.body.appendChild(script)
}

window.addEventListener('hashchange', router)
window.addEventListener('load', router)
