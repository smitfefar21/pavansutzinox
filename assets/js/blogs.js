document.addEventListener('DOMContentLoaded', function() {
    // Realistic blog data with 16 unique entries
    const allBlogs = [
        {
            id: "blog1.html",
            title: "The Role of Zinc Oxide in Rubber Vulcanization",
            excerpt: "Explore how Zinc Oxide enhances the vulcanization process and improves rubber product durability.",
            date: "June 15, 2023",
            readTime: "5 min read",
            image: "../../assets/images/blog-rubber.jpg"
        },
        {
            id: "blog1.html",
            title: "Zinc Oxide in Sunscreens: Benefits and Formulation Tips",
            excerpt: "Learn why Zinc Oxide is the preferred UV filter in mineral sunscreens and how to formulate effectively.",
            date: "June 12, 2023",
            readTime: "6 min read",
            image: "../../assets/images/blog-sunscreen.jpg"
        },
    ];

    // DOM Elements
    const blogsContainer = document.getElementById('blogs-container');
    const pageNumbers = document.getElementById('page-numbers');
    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');
    const categoryFilter = document.getElementById('category-filter');
    
    // Configuration
    const blogsPerPage = 9;
    let currentPage = 1;
    let filteredBlogs = [...allBlogs];
    
    // Initialize
    updatePage();

    // Render blogs for current page
    function renderBlogs() {
        blogsContainer.innerHTML = '';
        
        const startIndex = (currentPage - 1) * blogsPerPage;
        const blogsToShow = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);
        
        if (blogsToShow.length === 0) {
            blogsContainer.innerHTML = '<p class="no-blogs">No articles found matching your criteria.</p>';
            return;
        }
        
        blogsToShow.forEach(blog => {
            const blogCard = document.createElement('div');
            blogCard.className = 'blog-card';
            blogCard.dataset.category = blog.category;
            
            blogCard.innerHTML = `
                <a href="${blog.id}" class="blog-image">
                    <img src="${blog.image}" alt="${blog.title}">
                </a>
                <div class="blog-content">
                    <h3><a href="${blog.id}">${blog.title}</a></h3>
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
    
    // Format category for display
    function formatCategory(category) {
        const categories = {
            applications: "Applications",
            industry: "Industry Trends",
            technical: "Technical Insights",
            news: "Company News"
        };
        return categories[category] || category;
    }
    
    // Render pagination controls
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
        prevPage.classList.toggle('disabled', currentPage === 1);
        nextPage.classList.toggle('disabled', currentPage === totalPages);
        
        // Always show first page
        addPageNumber(1);
        
        // Show ellipsis if needed after first page
        if (currentPage > 3) {
            addEllipsis();
        }
        
        // Show pages around current page
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);
        
        for (let i = startPage; i <= endPage; i++) {
            addPageNumber(i);
        }
        
        // Show ellipsis if needed before last page
        if (currentPage < totalPages - 2) {
            addEllipsis();
        }
        
        // Always show last page if different from first
        if (totalPages > 1) {
            addPageNumber(totalPages);
        }
    }
    
    function addPageNumber(page) {
        // Don't add duplicate page numbers
        if (pageNumbers.querySelector(`a[data-page="${page}"]`)) return;
        
        const pageLink = document.createElement('a');
        pageLink.href = '#';
        pageLink.textContent = page;
        pageLink.dataset.page = page;
        
        if (page === currentPage) {
            pageLink.classList.add('active');
        }
        
        pageLink.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = page;
            updatePage();
        });
        
        pageNumbers.appendChild(pageLink);
    }
    
    function addEllipsis() {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = '...';
        pageNumbers.appendChild(ellipsis);
    }
    
    // Update page and pagination
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
        filteredBlogs = selectedCategory === 'all' 
            ? [...allBlogs] 
            : allBlogs.filter(blog => blog.category === selectedCategory);
        
        currentPage = 1;
        updatePage();
    });
});