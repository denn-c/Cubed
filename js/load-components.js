// Función para cargar una sección desde un archivo HTML
function loadSection(containerId, filePath) {
    const container = document.getElementById(containerId)
    if (container) {
        fetch(filePath)
            .then((response) => {
                if (!response.ok) throw new Error(`Error al cargar ${filePath}`)
                return response.text()
            })
            .then((data) => {
                container.innerHTML = data
            })
            .catch((error) => console.error(error))
    }
}

// Cargar el encabezado y el pie de página
document.addEventListener('DOMContentLoaded', () => {
    loadSection('header', 'components/header.html')
    loadSection('footer', 'components/footer.html')
})
