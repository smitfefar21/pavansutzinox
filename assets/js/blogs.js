document.addEventListener('DOMContentLoaded', function() {
    // Sample blog data - in a real implementation, this would come from a CMS or API
    const blogData = [
        {
            id: 1,
            title: "Enhancing Rubber Products with Zinc Oxide",
            excerpt: "Discover how Zinc Oxide improves durability and performance in rubber formulations...",
            category: "applications",
            date: "June 15, 2023",
            readTime: "5 min read",
            image: "../../assets/images/blog1.jpg"
        },
        {
            id: 2,
            title: "The Future of Zinc Oxide in Paints",
            excerpt: "Exploring new innovations in paint technology using Zinc Oxide...",
            category: "industry",
            date: "June 10, 2023",
            readTime: "4 min read",
            image: "../../assets/images/blog2.jpg"
        },
        // Add 22 more blog objects here...
        // In a real implementation, you would fetch this data from a server
    ];

    const blogsContainer = document.getElementById('blogs-container');
    const pageNumbers = document.getElementById('page-numbers');
    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');
    const categoryFilter = document.getElementById('category-filter');
    
    let currentPage = 1;
    const blogsPerPage = 8; // Changed from 24 to 8 for better demo
    let filteredBlogs = [...allBlogs];
    
    // Render blogs for current page
    function renderBlogs() {
        blogsContainer.innerHTML = '';
        
        const startIndex = (currentPage - 1) * blogsPerPage;
        const endIndex = startIndex + blogsPerPage;
        const blogsToShow = filteredBlogs.slice(startIndex, endIndex);
        
        if (blogsToShow.length === 0) {
            blogsContainer.innerHTML = '<p class="no-blogs">No blogs found matching your criteria.</p>';
            return;
        }
        
        blogsToShow.forEach(blog => {
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card';
            blogCard.dataset.category = blog.category;
            
            blogCard.innerHTML = `
                <a href="blog${blog.id}.html" class="blog-image">
                    <img src="${blog.image}" alt="${blog.title}">
                    <div class="blog-category">${blog.category.charAt(0).toUpperCase() + blog.category.slice(1)}</div>
                </a>
                <div class="blog-content">
                    <h3><a href="blog${blog.id}.html">${blog.title}</a></h3>
                    <p class="blog-excerpt">${blog.excerpt}</p>
                    <div class="blog-meta">
                        <span class="blog-date"><i class="far fa-calendar-alt"></i> ${blog.date}</span>
                        <span class="blog-readtime"><i class="far fa-clock"></i> ${blog.readTime}</span>
                    </div>
                </div>
            `;
            
            blogsContainer.appendChild(blogCard);
        });
    }
    
    // Render pagination
    function renderPagination() {
        pageNumbers.innerHTML = '';
        const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
        
        if (totalPages <= 1) {
            pageNumbers.style.display = 'none';
            prevPage.classList.add('disabled');
            nextPage.classList.add('disabled');
            return;
        }
        
        pageNumbers.style.display = 'flex';
        
        // Previous button state
        prevPage.classList.toggle('disabled', currentPage === 1);
        
        // Page numbers
        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        if (startPage > 1) {
            const firstPage = document.createElement('a');
            firstPage.href = '#';
            firstPage.textContent = '1';
            firstPage.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = 1;
                updatePage();
            });
            pageNumbers.appendChild(firstPage);
            
            if (startPage > 2) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                pageNumbers.appendChild(ellipsis);
            }
        }
        
        for (let i = startPage; i <= endPage; i++) {
            const pageLink = document.createElement('a');
            pageLink.href = '#';
            pageLink.textContent = i;
            if (i === currentPage) {
                pageLink.classList.add('active');
            }
            pageLink.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = i;
                updatePage();
            });
            pageNumbers.appendChild(pageLink);
        }
        
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const ellipsis = document.createElement('span');
                ellipsis.textContent = '...';
                pageNumbers.appendChild(ellipsis);
            }
            
            const lastPage = document.createElement('a');
            lastPage.href = '#';
            lastPage.textContent = totalPages;
            lastPage.addEventListener('click', (e) => {
                e.preventDefault();
                currentPage = totalPages;
                updatePage();
            });
            pageNumbers.appendChild(lastPage);
        }
        
        // Next button state
        nextPage.classList.toggle('disabled', currentPage === totalPages);
    }
    
    // Update page
    function updatePage() {
        renderBlogs();
        renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // Event listeners
    prevPage.addEventListener('click', (e) => {
        e.preventDefault();
        if (currentPage > 1) {
            currentPage--;
            updatePage();
        }
    });
    
    nextPage.addEventListener('click', (e) => {
        e.preventDefault();
        const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updatePage();
        }
    });
    
    categoryFilter.addEventListener('change', () => {
        const selectedCategory = categoryFilter.value;
        if (selectedCategory === 'all') {
            filteredBlogs = [...allBlogs];
        } else {
            filteredBlogs = allBlogs.filter(blog => blog.category === selectedCategory);
        }
        currentPage = 1;
        updatePage();
    });
    
    // Initial render
    updatePage();
});