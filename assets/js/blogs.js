document.addEventListener('DOMContentLoaded', function() {
    // Realistic blog data with 16 unique entries
    const allBlogs = [
        {
            id: "blog1.html",
            title: "The Role of Zinc Oxide in Rubber Vulcanization",
            excerpt: "Explore how Zinc Oxide enhances the vulcanization process and improves rubber product durability.",
            category: "applications",
            date: "June 15, 2023",
            readTime: "5 min read",
            image: "../../assets/images/blog-rubber.jpg"
        },
        {
            id: "blog1.html",
            title: "Zinc Oxide in Sunscreens: Benefits and Formulation Tips",
            excerpt: "Learn why Zinc Oxide is the preferred UV filter in mineral sunscreens and how to formulate effectively.",
            category: "applications",
            date: "June 12, 2023",
            readTime: "6 min read",
            image: "../../assets/images/blog-sunscreen.jpg"
        },
        {
            id: "blog1.html",
            title: "Global Zinc Oxide Market Trends 2023",
            excerpt: "Analysis of current market trends and future projections for the Zinc Oxide industry worldwide.",
            category: "industry",
            date: "June 8, 2023",
            readTime: "8 min read",
            image: "../../assets/images/blog-market.jpg"
        },
        {
            id: "blog1.html",
            title: "Improving Paint Durability with Zinc Oxide",
            excerpt: "Technical guide on using Zinc Oxide to enhance weather resistance in paint formulations.",
            category: "technical",
            date: "June 5, 2023",
            readTime: "7 min read",
            image: "../../assets/images/blog-paint.jpg"
        },
        {
            id: "blog1.html",
            title: "Zinc Oxide vs. Titanium Dioxide: A Comparative Analysis",
            excerpt: "Detailed comparison of these two important industrial oxides and their respective applications.",
            category: "technical",
            date: "May 30, 2023",
            readTime: "9 min read",
            image: "../../assets/images/blog-comparison.jpg"
        },
        {
            id: "blog1.html",
            title: "Sustainable Production Methods for Zinc Oxide",
            excerpt: "Exploring eco-friendly manufacturing processes in the Zinc Oxide industry.",
            category: "industry",
            date: "May 25, 2023",
            readTime: "6 min read",
            image: "../../assets/images/blog-sustainability.jpg"
        },
        {
            id: "blog1.html",
            title: "Zinc Oxide in Ceramic Glazes: Technical Insights",
            excerpt: "How Zinc Oxide affects thermal properties and color development in ceramic applications.",
            category: "technical",
            date: "May 20, 2023",
            readTime: "5 min read",
            image: "../../assets/images/blog-ceramics.jpg"
        },
        {
            id: "blog1.html",
            title: "New Research on Zinc Oxide Nanoparticles",
            excerpt: "Breakthrough studies on the unique properties of nano-sized Zinc Oxide particles.",
            category: "technical",
            date: "May 15, 2023",
            readTime: "7 min read",
            image: "../../assets/images/blog-nano.jpg"
        },
        {
            id: "blog1.html",
            title: "Pavansut Zinox Expands Production Capacity",
            excerpt: "Announcing our new manufacturing facility to meet growing global demand for high-quality Zinc Oxide.",
            category: "news",
            date: "May 10, 2023",
            readTime: "4 min read",
            image: "../../assets/images/blog-facility.jpg"
        },
        {
            id: "blog1.html",
            title: "Zinc Oxide in Animal Nutrition: Essential Benefits",
            excerpt: "Understanding the critical role of Zinc Oxide in livestock feed and health.",
            category: "applications",
            date: "May 5, 2023",
            readTime: "6 min read",
            image: "../../assets/images/blog-feed.jpg"
        },
        {
            id: "blog1.html",
            title: "Quality Control in Zinc Oxide Manufacturing",
            excerpt: "Our rigorous quality assurance processes to ensure product consistency and purity.",
            category: "technical",
            date: "April 28, 2023",
            readTime: "5 min read",
            image: "../../assets/images/blog-quality.jpg"
        },
        {
            id: "blog1.html",
            title: "Innovative Uses of Zinc Oxide in Electronics",
            excerpt: "Emerging applications in semiconductors, sensors, and optoelectronic devices.",
            category: "industry",
            date: "April 22, 2023",
            readTime: "7 min read",
            image: "../../assets/images/blog-electronics.jpg"
        },
        {
            id: "blog1.html",
            title: "Zinc Oxide Safety and Handling Guidelines",
            excerpt: "Best practices for safe storage, handling, and transportation of Zinc Oxide powder.",
            category: "technical",
            date: "April 15, 2023",
            readTime: "5 min read",
            image: "../../assets/images/blog-safety.jpg"
        },
        {
            id: "blog1.html",
            title: "Customer Success Story: Rubber Manufacturer",
            excerpt: "How one client improved product quality using our high-purity Zinc Oxide.",
            category: "news",
            date: "April 10, 2023",
            readTime: "4 min read",
            image: "../../assets/images/blog-casestudy.jpg"
        },
        {
            id: "blog1.html",
            title: "The Chemistry Behind Zinc Oxide's Versatility",
            excerpt: "Scientific explanation of why Zinc Oxide has such diverse industrial applications.",
            category: "technical",
            date: "April 5, 2023",
            readTime: "8 min read",
            image: "../../assets/images/blog-chemistry.jpg"
        },
        {
            id: "blog1.html",
            title: "Zinc Oxide in Cosmetics: Beyond Sun Protection",
            excerpt: "Exploring additional skin benefits and formulation techniques for cosmetic applications.",
            category: "applications",
            date: "March 30, 2023",
            readTime: "6 min read",
            image: "../../assets/images/blog-cosmetics.jpg"
        }
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
                    <div class="blog-category">${formatCategory(blog.category)}</div>
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