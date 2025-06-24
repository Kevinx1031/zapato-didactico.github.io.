document.addEventListener('DOMContentLoaded', async function() {
    // Menú móvil
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
        });
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
            });
        });
    }

    // Cargar materiales desde JSON
    const container = document.getElementById('materials-container');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let allMaterials = [];

    try {
        // Simular carga (reemplaza con tu JSON real)
        const response = await fetch('data/materials.json');
        allMaterials = await response.json();
        renderMaterials(allMaterials);
    } catch (error) {
        container.innerHTML = `
            <div class="error-message">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error al cargar los materiales. Por favor, recarga la página.</p>
            </div>
        `;
    }

    // Filtros por categoría
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            if (category === 'all') {
                renderMaterials(allMaterials);
            } else {
                const filtered = allMaterials.filter(material => material.category === category);
                renderMaterials(filtered);
            }
        });
    });

    // Función para renderizar materiales
    function renderMaterials(materials) {
        if (materials.length === 0) {
            container.innerHTML = '<p class="no-results">No hay materiales en esta categoría.</p>';
            return;
        }

        container.innerHTML = materials.map(material => `
            <div class="material-card" data-category="${material.category}">
                <img src="${material.image}" alt="${material.title}">
                <div class="material-info">
                    <h3>${material.title}</h3>
                    <p>${material.description}</p>
                    <div class="material-meta">
                        <span class="date">${material.date}</span>
                        <a href="${material.file}" class="download-btn" download>
                            <i class="fas fa-download"></i> Descargar
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    // Buscador (opcional)
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    if (searchInput && searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchTerm = searchInput.value.toLowerCase();
            const filtered = allMaterials.filter(material => 
                material.title.toLowerCase().includes(searchTerm) || 
                material.description.toLowerCase().includes(searchTerm)
            );
            renderMaterials(filtered);
        });
    }
});