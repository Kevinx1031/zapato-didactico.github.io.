document.addEventListener('DOMContentLoaded', async () => {
    const blogContainer = document.getElementById('blog-container');
    const featuredArticle = document.getElementById('featured-article');
    const modal = document.getElementById('article-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.getElementById('close-modal');
    let allPosts = [];

    // Cargar artículos desde JSON
    async function loadPosts() {
        try {
            const response = await fetch('data/blog.json');
            allPosts = await response.json();
            renderPosts();
        } catch (error) {
            blogContainer.innerHTML = `
                <div class="error">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Error al cargar los artículos. Recarga la página.</p>
                </div>
            `;
        }
    }

    // Renderizar todos los posts
    function renderPosts() {
        // Artículo destacado
        const featured = allPosts.find(post => post.is_featured);
        if (featured) {
            featuredArticle.innerHTML = `
                <div class="featured-image">
                    <img src="${featured.image}" alt="${featured.title}">
                    <span class="badge">Destacado</span>
                </div>
                <div class="featured-content">
                    <div class="meta">
                        <span class="author">Por ${featured.author}</span>
                        <span class="date">${featured.date}</span>
                        <span class="category">${featured.category}</span>
                    </div>
                    <h2>${featured.title}</h2>
                    <p class="excerpt">${featured.excerpt}</p>
                    <a href="#" class="btn btn-primary" data-id="${featured.id}">Leer más</a>
                </div>
            `;
        }

        // Grid de artículos
        const nonFeatured = allPosts.filter(post => !post.is_featured);
        blogContainer.innerHTML = nonFeatured.map(post => `
            <article class="blog-card" data-id="${post.id}">
                <img src="${post.image}" alt="${post.title}">
                <div class="blog-card-content">
                    <div class="meta">
                        <span class="category">${post.category}</span>
                        <span class="date">${post.date}</span>
                    </div>
                    <h3>${post.title}</h3>
                    <p>${post.excerpt}</p>
                    <a href="#" class="read-more" data-id="${post.id}">Leer más <i class="fas fa-arrow-right"></i></a>
                </div>
            </article>
        `).join('');

        // Eventos para abrir modal
        document.querySelectorAll('[data-id]').forEach(element => {
            element.addEventListener('click', (e) => {
                if (e.target.closest('a')) {
                    e.preventDefault();
                    const postId = element.getAttribute('data-id');
                    const post = allPosts.find(p => p.id == postId);
                    if (post) showModal(post);
                }
            });
        });
    }

    // Mostrar modal con artículo
    function showModal(post) {
        modalBody.innerHTML = `
            <div class="article-header">
                <span class="category">${post.category}</span>
                <h1>${post.title}</h1>
                <div class="meta">
                    <span class="author">Por ${post.author}</span>
                    <span class="date">${post.date}</span>
                </div>
                <img src="${post.image}" alt="${post.title}" class="featured-image">
            </div>
            <div class="article-body">
                ${post.content}
            </div>
        `;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    // Cerrar modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Cargar todo al inicio
    loadPosts();
});