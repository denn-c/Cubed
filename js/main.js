// Elementos
const content = document.getElementById('content')
const drawerMenu = document.querySelectorAll(
    '.nav__list:first-child .item__link'
)

// Evento para manejar clics en los enlaces del menú
drawerMenu.forEach((link) => {
    link.addEventListener('click', async (event) => {
        event.preventDefault()

        const target = event.target.getAttribute('data-target')
        const url = target || 'partials/bloquetas.html'        

        // Actualizar URL sin recargar
        history.pushState({ path: url }, '', event.target.href)

        // Cargar contenido dinámico
        await loadContent(url)
    })
})

// Función para cargar contenido
async function loadContent(url) {
    try {
        const response = await fetch(`partials/${url}`);
        if (!response.ok) throw new Error(`Error al cargar ${url}`);
        const html = await response.text();
        content.innerHTML = html;
    } catch (error) {
        console.error(error);
        content.innerHTML = `<h1>Error al cargar el contenido.</h1>`;
    }
}