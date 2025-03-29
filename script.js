document.addEventListener('DOMContentLoaded', function() {
    // Performance monitoring
    const perfData = {
        startTime: performance.now(),
        loadComplete: 0,
        resourcesLoaded: 0
    };
    
    // Add a global flag to track slider initialization
    window.sliderInitialized = false;
    
    // Resource loading optimization
    function optimizeResourceLoading() {
        // Preload important images
        const imagesToPreload = [
            'images/Banner-img 1.png',
            'images/Banner-img 2.png',
            'images/About us img.png',
            'images/Best Quality Img.png'
        ];
        
        imagesToPreload.forEach(imageSrc => {
            const preloadLink = document.createElement('link');
            preloadLink.rel = 'preload';
            preloadLink.as = 'image';
            preloadLink.href = imageSrc;
            document.head.appendChild(preloadLink);
        });
        
        // Defer non-critical CSS
        const deferredStyles = `
            @media print {
                /* Print styles */
                body { font-size: 12pt; }
                .banner-slider, .back-to-top, .quick-actions { display: none; }
            }
        `;
        
        const styleElement = document.createElement('style');
        styleElement.textContent = deferredStyles;
        document.head.appendChild(styleElement);
        
        // Add resource hints
        const commonDomains = [
            'https://fonts.googleapis.com',
            'https://fonts.gstatic.com',
            'https://cdnjs.cloudflare.com'
        ];
        
        commonDomains.forEach(domain => {
            const dnsPreconnect = document.createElement('link');
            dnsPreconnect.rel = 'dns-prefetch';
            dnsPreconnect.href = domain;
            document.head.appendChild(dnsPreconnect);
            
            const preconnect = document.createElement('link');
            preconnect.rel = 'preconnect';
            preconnect.href = domain;
            document.head.appendChild(preconnect);
        });
    }
    
    // Initialize performance optimizations
    optimizeResourceLoading();
    
    // Detect low-end devices or slow connections
    const isLowEndDevice = () => {
        return (
            navigator.deviceMemory < 4 || // Less than 4GB RAM
            navigator.hardwareConcurrency < 4 || // Less than 4 cores
            /2g|slow-2g/.test(navigator.connection?.effectiveType) // Slow connection
        );
    };
    
    // Adjust animations based on device capabilities
    function optimizeForDevice() {
        // Check if it's a low-end device or slow connection
        if (isLowEndDevice() || window.innerWidth < 768) {
            console.log('Low-end device or mobile detected, optimizing animations');
            
            // Reduce animation complexity
            const reducedAnimations = document.createElement('style');
            reducedAnimations.textContent = `
                @media (max-width: 768px), (prefers-reduced-motion) {
                    * {
                        animation-duration: 0.3s !important;
                        transition-duration: 0.3s !important;
                    }
                    
                    .coffee-animation {
                        display: none !important;
                    }
                    
                    .coffee-bean-accent {
                        display: none !important;
                    }
                    
                    .custom-cursor {
                        display: none !important;
                    }
                    
                    .btn-ripple {
                        display: none !important;
                    }
                }
            `;
            document.head.appendChild(reducedAnimations);
            
            // Disable parallax on mobile and low-end devices
            window.disableParallax = true;
        }
    }
    
    // Initialize device-specific optimizations
    optimizeForDevice();
    
    // Enhanced responsive design adjustments
    function enhanceResponsiveness() {
        // Handle orientation changes
        window.addEventListener('orientationchange', function() {
            // Force recalculation of responsive elements
            setTimeout(() => {
                // Update slider dimensions
                if (typeof initSlider === 'function') {
                    initSlider();
                }
                
                // Update gallery layout
                const gallery = document.querySelector('.gallery-grid');
                if (gallery) {
                    gallery.style.opacity = '0';
                    setTimeout(() => {
                        gallery.style.opacity = '1';
                    }, 300);
                }
                
                // Update any responsive components
                window.dispatchEvent(new Event('resize'));
            }, 300);
        });
        
        // Adjust touch targets for mobile
        if (window.innerWidth < 768) {
            const touchTargets = document.querySelectorAll('nav ul li a, .btn, .tab-btn, .gallery-zoom, .social-icon');
            touchTargets.forEach(target => {
                target.style.padding = '10px';
                target.style.minHeight = '44px';  // Apple guidelines recommend 44px minimum
                target.style.minWidth = '44px';
            });
        }
        
        // Enhance table responsiveness
        const tables = document.querySelectorAll('table');
        tables.forEach(table => {
            const tableWrapper = document.createElement('div');
            tableWrapper.className = 'table-responsive';
            tableWrapper.style.overflowX = 'auto';
            tableWrapper.style.width = '100%';
            table.parentNode.insertBefore(tableWrapper, table);
            tableWrapper.appendChild(table);
        });
        
        // Add responsive font sizing
        const responsiveFonts = document.createElement('style');
        responsiveFonts.textContent = `
            @media (max-width: 1200px) {
                html {
                    font-size: 95%;
                }
            }
            
            @media (max-width: 992px) {
                html {
                    font-size: 90%;
                }
            }
            
            @media (max-width: 768px) {
                html {
                    font-size: 85%;
                }
            }
            
            @media (max-width: 576px) {
                html {
                    font-size: 80%;
                }
            }
        `;
        document.head.appendChild(responsiveFonts);
    }
    
    // Initialize responsive enhancements
    enhanceResponsiveness();
    
    // Banner Slider Functionality
    function initSlider() {
        const slides = document.querySelectorAll('.banner-slider .slide');
        const dots = document.querySelectorAll('.slider-dots .dot');
        const prevBtn = document.getElementById('prev-btn');
        const nextBtn = document.getElementById('next-btn');
        let currentSlide = 0;
        let slideInterval;
        const slideDelay = 3000; // 3 seconds between slides
        
        console.log('Initializing slider with', slides.length, 'slides');
        
        // Function to set the active slide
        function setSlideActive(index) {
            // Reset all slides and dots
            slides.forEach(slide => slide.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Set the active slide and dot
            currentSlide = index;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            console.log('Changed to slide', currentSlide + 1);
        }
        
        // Function to go to the next slide
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            setSlideActive(currentSlide);
        }
        
        // Function to go to the previous slide
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            setSlideActive(currentSlide);
        }
        
        // Start automatic slide rotation
        function startSlideAutoplay() {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
            console.log('Starting autoplay');
            slideInterval = setInterval(() => {
                nextSlide();
            }, slideDelay);
        }
        
        // Stop automatic slide rotation
        function stopSlideAutoplay() {
            console.log('Stopping autoplay');
            if (slideInterval) {
                clearInterval(slideInterval);
                slideInterval = null;
            }
        }
        
        // Event listeners for buttons
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                prevSlide();
                stopSlideAutoplay();
                startSlideAutoplay(); // Restart timer after manual navigation
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                nextSlide();
                stopSlideAutoplay();
                startSlideAutoplay(); // Restart timer after manual navigation
            });
        }
        
        // Event listeners for dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                setSlideActive(index);
                stopSlideAutoplay();
                startSlideAutoplay(); // Restart timer after manual navigation
            });
        });
        
        // Pause slideshow when user hovers over the slider
        const bannerSlider = document.querySelector('.banner-slider');
        if (bannerSlider) {
            bannerSlider.addEventListener('mouseenter', stopSlideAutoplay);
            bannerSlider.addEventListener('mouseleave', startSlideAutoplay);
            
            // Also handle touch events for mobile
            bannerSlider.addEventListener('touchstart', stopSlideAutoplay, { passive: true });
            bannerSlider.addEventListener('touchend', startSlideAutoplay, { passive: true });
        }
        
        // Start the slideshow
        startSlideAutoplay();
        
        // Force first slide to be active
        setSlideActive(0);
        
        // Make sure the slider is visible
        if (bannerSlider) {
            bannerSlider.style.opacity = '1';
            bannerSlider.style.visibility = 'visible';
        }
        
        // Handle visibility change to pause/resume slideshow
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopSlideAutoplay();
            } else {
                startSlideAutoplay();
            }
        });
        
        // Add swipe support for mobile
        if ('ontouchstart' in window) {
            let touchStartX = 0;
            let touchEndX = 0;
            
            bannerSlider.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopSlideAutoplay();
            }, { passive: true });
            
            bannerSlider.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
                startSlideAutoplay();
            }, { passive: true });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Swiped left - go to next slide
                    nextSlide();
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    // Swiped right - go to previous slide
                    prevSlide();
                }
            }
        }
        
        return {
            next: nextSlide,
            prev: prevSlide,
            stop: stopSlideAutoplay,
            start: startSlideAutoplay,
            setActive: setSlideActive
        };
    }

    // Initialize the slider
    let sliderControls;
    if (document.querySelector('.banner-slider')) {
        // Wait a bit for page to fully load before starting slider
        setTimeout(() => {
            sliderControls = initSlider();
            window.sliderInitialized = true;
            
            // Force restart the slider after 2 seconds to handle any initial setup issues
            setTimeout(() => {
                if (sliderControls) {
                    console.log('Forcing slider restart');
                    sliderControls.stop();
                    sliderControls.start();
                }
            }, 2000);
            
            // Auto-restart slider if it stops for some reason
            setInterval(() => {
                if (sliderControls) {
                    sliderControls.stop();
                    sliderControls.start();
                    console.log('Periodic slider restart');
                }
            }, 15000); // Check every 15 seconds
        }, 500); // Small delay to ensure DOM is ready
    }
    
    // Mobile gesture support
    function addMobileGestures() {
        if ('ontouchstart' in window) {
            // Swipe detection for main sections
            let touchStartX = 0;
            let touchEndX = 0;
            
            document.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            }, false);
            
            document.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            }, false);
            
            function handleSwipe() {
                const swipeThreshold = 100;
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Left swipe
                    const nextBtn = document.getElementById('next-btn');
                    if (nextBtn) nextBtn.click();
                }
                
                if (touchEndX > touchStartX + swipeThreshold) {
                    // Right swipe
                    const prevBtn = document.getElementById('prev-btn');
                    if (prevBtn) prevBtn.click();
                }
            }
            
            // Fix for scrolling issues
            document.addEventListener('touchmove', function(e) {
                // Allow all scrolling behavior on mobile
                // Remove any scrolling restrictions
            }, { passive: true });
        }
    }
    
    // Initialize mobile gesture support
    addMobileGestures();
    
    // Mobile Menu Toggle
    function initMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const nav = document.querySelector('nav');
        const menuLinks = document.querySelectorAll('nav ul li a');
        
        if (mobileMenuBtn) {
            // Create overlay for the menu background
            const menuOverlay = document.createElement('div');
            menuOverlay.className = 'menu-overlay';
            document.body.appendChild(menuOverlay);
            
            // Toggle menu on hamburger button click
            mobileMenuBtn.addEventListener('click', function() {
                mobileMenuBtn.classList.toggle('active');
                nav.classList.toggle('active');
                menuOverlay.classList.toggle('active');
                document.body.classList.toggle('menu-open');
                
                // Improve accessibility
                const expanded = mobileMenuBtn.classList.contains('active');
                mobileMenuBtn.setAttribute('aria-expanded', expanded);
                nav.setAttribute('aria-hidden', !expanded);
            });
            
            // Close menu when clicking on the overlay
            menuOverlay.addEventListener('click', function() {
                mobileMenuBtn.classList.remove('active');
                nav.classList.remove('active');
                menuOverlay.classList.remove('active');
                document.body.classList.remove('menu-open');
                
                // Update accessibility attributes
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                nav.setAttribute('aria-hidden', 'true');
            });
            
            // Close menu when clicking on menu links
            menuLinks.forEach(link => {
                link.addEventListener('click', function() {
                    mobileMenuBtn.classList.remove('active');
                    nav.classList.remove('active');
                    menuOverlay.classList.remove('active');
                    document.body.classList.remove('menu-open');
                    
                    // Update accessibility attributes
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    nav.setAttribute('aria-hidden', 'true');
                });
            });
        }
    }
    
    // Initialize mobile menu
    initMobileMenu();
    
    // Performance monitoring
    window.addEventListener('load', function() {
        perfData.loadComplete = performance.now();
        console.log(`Page load time: ${(perfData.loadComplete - perfData.startTime).toFixed(2)}ms`);
        
        // Log any long tasks
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                console.log(`Long task detected: ${entry.duration.toFixed(2)}ms`);
            }
        });
        
        observer.observe({entryTypes: ['longtask']});
    });
    
    // Theme Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    
    if (themeToggle) {
        // Check for saved theme preference or use device preference
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            updateThemeIcon('dark');
        }
        
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    // Function to update theme icon
    function updateThemeIcon(theme) {
        if (themeToggle) {
            const moonIcon = themeToggle.querySelector('.fa-moon');
            const sunIcon = themeToggle.querySelector('.fa-sun');
            
            if (!sunIcon && theme === 'dark') {
                // Need to create sun icon
                moonIcon.classList.remove('fa-moon');
                moonIcon.classList.add('fa-sun');
            } else if (theme === 'light' && moonIcon.classList.contains('fa-sun')) {
                // Revert to moon icon
                moonIcon.classList.remove('fa-sun');
                moonIcon.classList.add('fa-moon');
            }
        }
    }
    
    // Search Functionality
    const searchToggle = document.getElementById('search-toggle');
    const searchContainer = document.querySelector('.search-container');
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchClose = document.getElementById('search-close');
    
    if (searchToggle && searchContainer) {
        // Toggle search container
        searchToggle.addEventListener('click', function() {
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchInput.focus();
            }
        });
        
        // Close search on close button click
        if (searchClose) {
            searchClose.addEventListener('click', function() {
                searchContainer.classList.remove('active');
            });
        }
        
        // Submit search form
        if (searchForm) {
            searchForm.addEventListener('submit', function(e) {
                e.preventDefault();
                const searchTerm = searchInput.value.trim().toLowerCase();
                
                if (searchTerm.length > 0) {
                    // Perform search function
                    performSearch(searchTerm);
                    // Clear input after search
                    searchInput.value = '';
                    // Close search container
                    searchContainer.classList.remove('active');
                }
            });
        }
        
        // Close search when clicking outside
        document.addEventListener('click', function(event) {
            if (!searchContainer.contains(event.target) && 
                !searchToggle.contains(event.target) && 
                searchContainer.classList.contains('active')) {
                searchContainer.classList.remove('active');
            }
        });
        
        // Close search on escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && searchContainer.classList.contains('active')) {
                searchContainer.classList.remove('active');
            }
        });
    }
    
    // Function to perform search
    function performSearch(searchTerm) {
        // Content to search through
        const sections = document.querySelectorAll('section');
        const searchResults = [];
        
        // Create or get the search results container
        let searchResultsContainer = document.getElementById('search-results');
        if (!searchResultsContainer) {
            searchResultsContainer = document.createElement('div');
            searchResultsContainer.id = 'search-results';
            searchResultsContainer.className = 'search-results';
            document.body.appendChild(searchResultsContainer);
            
            // Add styles for search results
            const style = document.createElement('style');
            style.textContent = `
                .search-results {
                    position: fixed;
                    top: 80px;
                    left: 0;
                    width: 100%;
                    background: var(--white);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    z-index: 900;
                    max-height: 70vh;
                    overflow-y: auto;
                    transform: translateY(-10px);
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                }
                
                .search-results.active {
                    transform: translateY(0);
                    opacity: 1;
                    visibility: visible;
                }
                
                .search-results h3 {
                    margin-bottom: 15px;
                    font-family: var(--font-secondary);
                    color: var(--primary-color);
                }
                
                .search-results-list {
                    list-style: none;
                    padding: 0;
                }
                
                .search-result-item {
                    padding: 15px;
                    border-bottom: 1px solid var(--gray);
                    transition: background 0.3s ease;
                }
                
                .search-result-item:hover {
                    background: var(--gray-light);
                }
                
                .search-result-item a {
                    display: block;
                    color: var(--text-dark);
                    text-decoration: none;
                }
                
                .search-result-item h4 {
                    margin-bottom: 5px;
                    color: var(--primary-color);
                }
                
                .search-result-item p {
                    font-size: 14px;
                    color: var(--text-light);
                }
                
                .search-result-close {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: transparent;
                    border: none;
                    color: var(--text-dark);
                    font-size: 18px;
                    cursor: pointer;
                    padding: 5px;
                    transition: color 0.3s ease;
                }
                
                .search-result-close:hover {
                    color: var(--primary-color);
                }
                
                .no-results {
                    padding: 20px;
                    text-align: center;
                    color: var(--text-light);
                }
                
                [data-theme="dark"] .search-results {
                    background: var(--white);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                }
            `;
            document.head.appendChild(style);
        }
        
        // Clear previous results
        searchResultsContainer.innerHTML = '';
        
        // Create close button
        const closeBtn = document.createElement('button');
        closeBtn.className = 'search-result-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        closeBtn.addEventListener('click', function() {
            searchResultsContainer.classList.remove('active');
        });
        
        // Create header
        const header = document.createElement('h3');
        header.textContent = `Search Results for "${searchTerm}"`;
        
        // Add header and close button
        searchResultsContainer.appendChild(closeBtn);
        searchResultsContainer.appendChild(header);
        
        // Search through content
        sections.forEach(section => {
            const sectionId = section.getAttribute('id');
            const sectionTitle = section.querySelector('.section-title')?.textContent || '';
            const textContent = section.textContent.toLowerCase();
            
            if (textContent.includes(searchTerm)) {
                // Find a relevant snippet of text
                const contentWords = textContent.split(' ');
                const searchTermIndex = contentWords.findIndex(word => word.includes(searchTerm));
                
                let snippet = '';
                if (searchTermIndex !== -1) {
                    // Get words before and after the search term
                    const startIndex = Math.max(0, searchTermIndex - 5);
                    const endIndex = Math.min(contentWords.length, searchTermIndex + 15);
                    snippet = contentWords.slice(startIndex, endIndex).join(' ') + '...';
                } else {
                    // If exact word not found, use first part of content
                    snippet = contentWords.slice(0, 20).join(' ') + '...';
                }
                
                searchResults.push({
                    id: sectionId,
                    title: sectionTitle,
                    snippet: snippet,
                    relevance: textContent.split(searchTerm).length - 1 // Count occurrences
                });
            }
        });
        
        // Sort results by relevance
        searchResults.sort((a, b) => b.relevance - a.relevance);
        
        // Create results list
        if (searchResults.length > 0) {
            const resultsList = document.createElement('ul');
            resultsList.className = 'search-results-list';
            
            searchResults.forEach(result => {
                const listItem = document.createElement('li');
                listItem.className = 'search-result-item';
                
                listItem.innerHTML = `
                    <a href="#${result.id}">
                        <h4>${result.title}</h4>
                        <p>${result.snippet}</p>
                    </a>
                `;
                
                // Add click event to scroll to section
                listItem.querySelector('a').addEventListener('click', function(e) {
                    e.preventDefault();
                    searchResultsContainer.classList.remove('active');
                    
                    const targetSection = document.getElementById(result.id);
                    if (targetSection) {
                        // Smooth scroll to section
                        const headerHeight = document.querySelector('header').offsetHeight;
                        const targetPosition = targetSection.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Highlight the section briefly
                        targetSection.style.transition = 'background-color 0.5s ease';
                        targetSection.style.backgroundColor = 'rgba(210, 180, 140, 0.2)';
                        setTimeout(() => {
                            targetSection.style.backgroundColor = '';
                            setTimeout(() => {
                                targetSection.style.transition = '';
                            }, 500);
                        }, 1000);
                    }
                });
                
                resultsList.appendChild(listItem);
            });
            
            searchResultsContainer.appendChild(resultsList);
        } else {
            // No results found
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <i class="fas fa-search" style="font-size: 24px; margin-bottom: 15px;"></i>
                <p>No results found for "${searchTerm}"</p>
                <p>Try different keywords or check spelling</p>
            `;
            searchResultsContainer.appendChild(noResults);
        }
        
        // Show results
        searchResultsContainer.classList.add('active');
        
        // Close on escape key
        document.addEventListener('keydown', function escHandler(event) {
            if (event.key === 'Escape') {
                searchResultsContainer.classList.remove('active');
                document.removeEventListener('keydown', escHandler);
            }
        });
        
        // Close when clicking outside
        document.addEventListener('click', function clickHandler(event) {
            if (!searchResultsContainer.contains(event.target) && 
                searchResultsContainer.classList.contains('active')) {
                searchResultsContainer.classList.remove('active');
                document.removeEventListener('click', clickHandler);
            }
        });
    }
    
    // Quick Actions Functionality
    const menuBtn = document.getElementById('menu-btn');
    const shareBtn = document.getElementById('share-btn');
    const quickMenu = document.querySelector('.quick-menu');
    const shareMenu = document.querySelector('.share-menu');
    
    if (menuBtn && quickMenu) {
        menuBtn.addEventListener('click', function() {
            quickMenu.classList.toggle('active');
            // Close share menu if open
            if (shareMenu.classList.contains('active')) {
                shareMenu.classList.remove('active');
            }
        });
    }
    
    if (shareBtn && shareMenu) {
        shareBtn.addEventListener('click', function() {
            shareMenu.classList.toggle('active');
            // Close quick menu if open
            if (quickMenu.classList.contains('active')) {
                quickMenu.classList.remove('active');
            }
        });
        
        // Share functionality
        const shareOptions = document.querySelectorAll('.share-option');
        shareOptions.forEach(option => {
            option.addEventListener('click', function(e) {
                e.preventDefault();
                const platform = this.getAttribute('data-platform');
                const url = window.location.href;
                const text = "Check out this amazing coffee shop!";
                
                let shareUrl;
                
                switch(platform) {
                    case 'facebook':
                        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
                        break;
                    case 'twitter':
                        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
                        break;
                    case 'whatsapp':
                        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + url)}`;
                        break;
                    case 'email':
                        shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
                        break;
                }
                
                if (shareUrl) {
                    window.open(shareUrl, '_blank');
                }
                
                // Close share menu after clicking an option
                shareMenu.classList.remove('active');
            });
        });
    }
    
    // Close quick menus when clicking outside
    document.addEventListener('click', function(event) {
        if (quickMenu && quickMenu.classList.contains('active') && 
            !quickMenu.contains(event.target) && 
            !menuBtn.contains(event.target)) {
            quickMenu.classList.remove('active');
        }
        
        if (shareMenu && shareMenu.classList.contains('active') && 
            !shareMenu.contains(event.target) && 
            !shareBtn.contains(event.target)) {
            shareMenu.classList.remove('active');
        }
    });
    
    // Coffee animation enhancement
    const coffeeAnimation = document.querySelector('.coffee-animation');
    
    if (coffeeAnimation) {
        // Initially hide the coffee animation
        coffeeAnimation.style.opacity = '0';
        coffeeAnimation.style.visibility = 'hidden';
        coffeeAnimation.style.transition = 'opacity 0.5s ease, visibility 0.5s ease, transform 0.5s ease';
        
        // Add hover effect
        coffeeAnimation.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(0.9)';
        });
        
        coffeeAnimation.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(0.8)';
        });
        
        // Add click effect - drinking animation
        coffeeAnimation.addEventListener('click', function() {
            const coffeeCup = this.querySelector('.coffee-cup');
            const steam = this.querySelector('.steam');
            
            // Disable hover effect temporarily
            this.style.pointerEvents = 'none';
            
            // Drinking animation
            coffeeCup.style.transform = 'rotate(45deg)';
            coffeeCup.style.transition = 'transform 0.8s ease';
            
            // Hide steam while drinking
            steam.style.opacity = '0';
            steam.style.transition = 'opacity 0.3s ease';
            
            // Reset after animation
            setTimeout(() => {
                coffeeCup.style.transform = '';
                
                // Simulate the liquid decreasing
                const liquidAfter = document.createElement('style');
                liquidAfter.textContent = `
                    .coffee-cup::after {
                        top: 20px !important;
                        height: 10px !important;
                        transition: top 0.5s ease, height 0.5s ease;
                    }
                `;
                document.head.appendChild(liquidAfter);
                
                // Show steam again
                setTimeout(() => {
                    steam.style.opacity = '1';
                    this.style.pointerEvents = 'auto';
                    
                    // Reset liquid after 5 seconds
                    setTimeout(() => {
                        document.head.removeChild(liquidAfter);
                    }, 5000);
                }, 800);
            }, 1000);
        });
        
        // Show the coffee animation after scrolling
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                coffeeAnimation.style.opacity = '1';
                coffeeAnimation.style.visibility = 'visible';
            } else {
                coffeeAnimation.style.opacity = '0';
                coffeeAnimation.style.visibility = 'hidden';
            }
        });
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 768) {
                closeMobileMenu();
            }
        }, 250);
    });
    
    // iOS specific fixes
    if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
        // Fix for iOS 100vh issue
        function setAppHeight() {
            const doc = document.documentElement;
            doc.style.setProperty('--app-height', `${window.innerHeight}px`);
        }
        
        window.addEventListener('resize', setAppHeight);
        window.addEventListener('orientationchange', setAppHeight);
        setAppHeight();
    }
    
    // Typing effect for section subtitles
    function typeEffect() {
        const subtitles = document.querySelectorAll('.subtitle');
        
        subtitles.forEach(subtitle => {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            subtitle.style.visibility = 'visible';
            
            function typeText(index) {
                if (index < text.length) {
                    subtitle.textContent += text.charAt(index);
                    setTimeout(() => typeText(index + 1), 50);
                }
            }
            
            // Start typing when element is in view
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => typeText(0), 300);
                        observer.unobserve(subtitle);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(subtitle);
        });
    }
    
    // Initialize typing effect
    typeEffect();
    
    // Image Lazy Loading
    function setupLazyLoading() {
        const lazyImages = document.querySelectorAll('.lazy-image');
        
        // Use Intersection Observer for better performance
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const image = entry.target;
                        const dataSrc = image.getAttribute('data-src');
                        
                        if (dataSrc) {
                            // Create a new image element to preload the image
                            const preloadImage = new Image();
                            preloadImage.src = dataSrc;
                            
                            preloadImage.onload = () => {
                                image.src = dataSrc;
                                image.classList.add('loaded');
                                
                                // Hide placeholder when image is loaded
                                const placeholder = image.previousElementSibling;
                                if (placeholder && placeholder.classList.contains('image-placeholder')) {
                                    placeholder.style.display = 'none';
                                }
                            };
                            
                            // If image fails to load
                            preloadImage.onerror = () => {
                                console.error('Failed to load image: ' + dataSrc);
                                // Keep the placeholder visible in case of error
                            };
                            
                            // Stop observing the current image
                            observer.unobserve(image);
                        }
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            lazyImages.forEach(image => {
                imageObserver.observe(image);
            });
        } else {
            // Fallback for browsers without Intersection Observer
            let active = false;
            
            const lazyLoad = () => {
                if (active === false) {
                    active = true;
                    
                    setTimeout(() => {
                        lazyImages.forEach(lazyImage => {
                            if ((lazyImage.getBoundingClientRect().top <= window.innerHeight && lazyImage.getBoundingClientRect().bottom >= 0) && 
                                getComputedStyle(lazyImage).display !== "none") {
                                
                                const dataSrc = lazyImage.getAttribute('data-src');
                                
                                if (dataSrc) {
                                    lazyImage.src = dataSrc;
                                    lazyImage.classList.add('loaded');
                                    
                                    // Hide placeholder when image is loaded
                                    const placeholder = lazyImage.previousElementSibling;
                                    if (placeholder && placeholder.classList.contains('image-placeholder')) {
                                        placeholder.style.display = 'none';
                                    }
                                    
                                    lazyImages.forEach((image, index) => {
                                        if (image === lazyImage) {
                                            lazyImages.splice(index, 1);
                                        }
                                    });
                                    
                                    if (lazyImages.length === 0) {
                                        document.removeEventListener("scroll", lazyLoad);
                                        window.removeEventListener("resize", lazyLoad);
                                        window.removeEventListener("orientationchange", lazyLoad);
                                    }
                                }
                            }
                        });
                        
                        active = false;
                    }, 200);
                }
            };
            
            document.addEventListener("scroll", lazyLoad);
            window.addEventListener("resize", lazyLoad);
            window.addEventListener("orientationchange", lazyLoad);
            lazyLoad(); // Initial load
        }
    }
    
    // Initialize lazy loading
    setupLazyLoading();
    
    // Contact Form Validation with enhanced feedback
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        const formGroups = contactForm.querySelectorAll('.form-group');
        
        // Add input animation effects
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const icon = group.querySelector('i');
            
            if (input && icon) {
                // Focus effect
                input.addEventListener('focus', () => {
                    icon.style.color = 'var(--primary-color)';
                    icon.style.transform = 'scale(1.2)';
                    icon.style.transition = 'color 0.3s ease, transform 0.3s ease';
                });
                
                // Blur effect
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        icon.style.color = 'var(--text-light)';
                    }
                    icon.style.transform = 'scale(1)';
                });
                
                // Input effect
                input.addEventListener('input', () => {
                    if (input.value) {
                        icon.style.color = 'var(--primary-color)';
                    } else {
                        icon.style.color = 'var(--text-light)';
                    }
                });
            }
        });
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            let isValid = true;
            
            // Remove any existing error messages
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            
            // Validate name
            if (name === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (email === '') {
                showError('email', 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email');
                isValid = false;
            }
            
            // Validate message
            if (message === '') {
                showError('message', 'Please enter your message');
                isValid = false;
            }
            
            // If form is valid, submit it with animation
            if (isValid) {
                // Disable form
                Array.from(contactForm.elements).forEach(element => {
                    element.disabled = true;
                });
                
                // Show loading animation
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const btnText = submitBtn.textContent;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                
                // Simulate form submission (would be an actual AJAX call in production)
                setTimeout(() => {
                    contactForm.style.opacity = '0';
                    contactForm.style.transform = 'translateY(20px)';
                    contactForm.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    
                    setTimeout(() => {
                        // Here you would normally send the form data to a server
                        // For demo purposes, we'll just show a success message
                        contactForm.innerHTML = '<div class="success-message"><i class="fas fa-check-circle"></i><h3>Thank You!</h3><p>Your message has been sent successfully. We will get back to you soon!</p></div>';
                        contactForm.style.opacity = '1';
                        contactForm.style.transform = 'translateY(0)';
                    }, 500);
                }, 1500);
            }
        });
    }
    
    // Show error message for form field with shake animation
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        
        // Add shake animation
        field.style.animation = 'none';
        void field.offsetWidth; // Force reflow
        field.style.animation = 'shake 0.5s ease';
        
        // Create and append error message
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        
        field.parentNode.appendChild(errorElement);
        field.style.borderColor = '#e74c3c';
    }
    
    // Validate email format
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Add CSS for error messages, lightbox, and new animations
    const style = document.createElement('style');
    style.textContent = `
        .error-message {
            color: #e74c3c;
            font-size: 14px;
            margin-top: 5px;
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .success-message {
            text-align: center;
            padding: 30px;
            animation: fadeIn 1s ease;
        }
        
        .success-message i {
            font-size: 50px;
            color: #2ecc71;
            margin-bottom: 20px;
            animation: bounce 2s infinite 1s;
        }
        
        .success-message h3 {
            font-size: 24px;
            margin-bottom: 10px;
        }
        
        .lightbox {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        }
        
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        
        .lightbox-content img {
            max-width: 100%;
            max-height: 90vh;
            display: block;
            border: 5px solid #fff;
            box-shadow: 0 5px 30px rgba(0, 0, 0, 0.3);
        }
        
        .lightbox-close {
            position: absolute;
            top: -40px;
            right: 0;
            font-size: 30px;
            color: #fff;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        
        .lightbox-close:hover {
            transform: rotate(90deg);
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .subtitle {
            visibility: hidden;
        }
        
        header {
            transition: transform 0.3s ease, padding 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);

    // Add interactive hover effects for buttons and cards
    function addInteractiveEffects() {
        // Enhanced button hover effects
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mouseenter', (e) => {
                const x = e.clientX - btn.getBoundingClientRect().left;
                const y = e.clientY - btn.getBoundingClientRect().top;
                
                const ripple = document.createElement('span');
                ripple.className = 'btn-ripple';
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                btn.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
        
        // 3D tilt effect for cards
        const cards = document.querySelectorAll('.info-card, .gallery-item, .review-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', e => {
                const cardRect = card.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;
                
                const centerX = cardRect.width / 2;
                const centerY = cardRect.height / 2;
                
                const angleY = (x - centerX) / 20;
                const angleX = (centerY - y) / 20;
                
                card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
                card.style.transition = 'transform 0.1s ease';
                
                // Dynamic shadow based on movement
                const shadowX = (x - centerX) / 25;
                const shadowY = (y - centerY) / 25;
                card.style.boxShadow = `${shadowX}px ${shadowY}px 20px rgba(0,0,0,0.15)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
                card.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
            });
        });
        
        // Magnetic effect for important icons
        const icons = document.querySelectorAll('.feature-icon, .social-icon, .gallery-zoom');
        icons.forEach(icon => {
            const parent = icon.parentElement;
            
            parent.addEventListener('mousemove', (e) => {
                const iconRect = icon.getBoundingClientRect();
                const iconCenterX = iconRect.left + iconRect.width / 2;
                const iconCenterY = iconRect.top + iconRect.height / 2;
                
                const deltaX = e.clientX - iconCenterX;
                const deltaY = e.clientY - iconCenterY;
                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                
                // Only apply magnetic effect if cursor is close to the icon
                if (distance < 60) {
                    const moveX = deltaX * 0.4;
                    const moveY = deltaY * 0.4;
                    
                    icon.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
                    icon.style.transition = 'transform 0.2s ease';
                }
            });
            
            parent.addEventListener('mouseleave', () => {
                icon.style.transform = 'translate(0, 0) scale(1)';
                icon.style.transition = 'transform 0.5s ease';
            });
        });
        
        // Image hover zoom effect
        const contentImages = document.querySelectorAll('.about-img img, .quality-img img, .gallery-item img');
        contentImages.forEach(img => {
            img.addEventListener('mouseenter', () => {
                img.style.transform = 'scale(1.05)';
                img.style.transition = 'transform 0.4s ease';
            });
            
            img.addEventListener('mouseleave', () => {
                img.style.transform = 'scale(1)';
                img.style.transition = 'transform 0.4s ease';
            });
        });
    }
    
    // Initialize interactive effects
    addInteractiveEffects();
    
    // Add CSS for new interactive effects
    const interactiveCSS = document.createElement('style');
    interactiveCSS.textContent = `
        .btn-ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .info-card, .gallery-item, .review-card {
            will-change: transform;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .feature-icon, .social-icon, .gallery-zoom {
            will-change: transform;
            transition: transform 0.3s ease;
        }
        
        .about-img img, .quality-img img, .gallery-item img {
            will-change: transform;
            transition: transform 0.4s ease;
        }
        
        /* Custom cursor for interactive elements */
        .btn, .gallery-item, .info-card, .social-icon, .feature-icon, .gallery-zoom {
            cursor: none;
        }
        
        .custom-cursor {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: rgba(210, 180, 140, 0.3);
            border: 1px solid rgba(210, 180, 140, 0.6);
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: width 0.2s, height 0.2s, background 0.2s;
            mix-blend-mode: difference;
        }
        
        .custom-cursor.active {
            width: 40px;
            height: 40px;
            background: rgba(210, 180, 140, 0.2);
        }
    `;
    document.head.appendChild(interactiveCSS);
    
    // Custom cursor functionality
    function createCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);
        
        // Update cursor position
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // Add active class on interactive elements
        const interactiveElements = document.querySelectorAll('.btn, .gallery-item, .info-card, .social-icon, .feature-icon, .gallery-zoom');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.classList.add('active');
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.classList.remove('active');
            });
        });
        
        // Hide custom cursor when leaving the window
        document.addEventListener('mouseout', (e) => {
            if (e.relatedTarget === null) {
                cursor.style.opacity = '0';
            }
        });
        
        document.addEventListener('mouseover', () => {
            cursor.style.opacity = '1';
        });
    }
    
    // Initialize custom cursor on desktop only
    if (window.innerWidth > 768) {
        createCustomCursor();
    }

    // SEO Optimizations
    function enhanceSEO() {
        // Add meta description if missing
        if (!document.querySelector('meta[name="description"]')) {
            const metaDescription = document.createElement('meta');
            metaDescription.name = 'description';
            metaDescription.content = 'Experience the authentic taste of traditional Tanjore Degree Coffee, crafted with passion and served with pride. Visit our coffee shop in Chennai for the finest South Indian coffee.';
            document.head.appendChild(metaDescription);
        }
        
        // Add schema.org structured data for local business
        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Tanjore Degree Coffee",
            "image": "images/Org.png",
            "url": window.location.href,
            "telephone": "+91 9003106755",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "364, 37th Street TVS Avenue, Anna Nagar West Extn.",
                "addressLocality": "Chennai",
                "postalCode": "600101",
                "addressCountry": "IN"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": 13.087,
                "longitude": 80.1943
            },
            "openingHoursSpecification": [
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                    "opens": "08:00",
                    "closes": "20:00"
                },
                {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": "Sunday",
                    "opens": "09:00",
                    "closes": "18:00"
                }
            ],
            "servesCuisine": "Coffee",
            "priceRange": "₹₹",
            "menu": window.location.href + "#menu",
            "acceptsReservations": "True"
        };
        schemaScript.textContent = JSON.stringify(schemaData);
        document.head.appendChild(schemaScript);
        
        // Add canonical URL
        if (!document.querySelector('link[rel="canonical"]')) {
            const canonical = document.createElement('link');
            canonical.rel = 'canonical';
            canonical.href = window.location.href.split('?')[0].split('#')[0];
            document.head.appendChild(canonical);
        }
        
        // Add OpenGraph and Twitter Card meta tags
        const metaTags = [
            { property: "og:title", content: "Tanjore Degree Coffee - Premium Coffee Experience" },
            { property: "og:description", content: "Experience the authentic taste of traditional South Indian coffee prepared with precision and passion at Tanjore Degree Coffee." },
            { property: "og:type", content: "website" },
            { property: "og:url", content: window.location.href },
            { property: "og:image", content: new URL("images/Org.png", window.location.href).href },
            { property: "twitter:card", content: "summary_large_image" },
            { property: "twitter:title", content: "Tanjore Degree Coffee" },
            { property: "twitter:description", content: "Experience the authentic taste of traditional South Indian coffee prepared with precision and passion." },
            { property: "twitter:image", content: new URL("images/Org.png", window.location.href).href }
        ];
        
        metaTags.forEach(tag => {
            if (!document.querySelector(`meta[property="${tag.property}"]`)) {
                const meta = document.createElement('meta');
                meta.setAttribute(tag.property.includes("twitter") ? "name" : "property", tag.property);
                meta.content = tag.content;
                document.head.appendChild(meta);
            }
        });
        
        // Add image alt texts if missing
        document.querySelectorAll('img:not([alt]), img[alt=""]').forEach(img => {
            // Generate a descriptive alt text based on surrounding context
            let altText = "Tanjore Degree Coffee";
            
            // Check if image is in a section with heading
            const section = img.closest('section');
            if (section) {
                const heading = section.querySelector('h1, h2, h3');
                if (heading) {
                    altText = heading.textContent + " - Tanjore Degree Coffee";
                }
            }
            
            // Check if image has a nearby caption
            const nearbyText = img.parentElement?.textContent?.trim();
            if (nearbyText && nearbyText.length < 100) {
                altText = nearbyText;
            }
            
            img.alt = altText;
        });
        
        // Add descriptive link texts for better accessibility
        document.querySelectorAll('a').forEach(link => {
            // Check for empty or non-descriptive link text
            if (!link.textContent.trim() || link.textContent === 'Click here' || link.textContent === 'Read more') {
                // Try to find nearby context
                const section = link.closest('section');
                if (section) {
                    const heading = section.querySelector('h1, h2, h3');
                    if (heading) {
                        link.setAttribute('aria-label', `${link.textContent} - ${heading.textContent}`);
                    }
                }
            }
            
            // Add title attribute if missing
            if (!link.title && link.textContent.trim()) {
                link.title = link.textContent.trim();
            }
        });
    }
    
    // Initialize SEO enhancements
    enhanceSEO();
    
    // E-commerce functionality
    function initEcommerce() {
        // Cart state
        const cart = {
            items: [],
            total: 0
        };
        
        // DOM elements
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        const favoriteButtons = document.querySelectorAll('.product-favorite');
        const cartToggle = document.getElementById('cart-toggle');
        const cartDropdown = document.querySelector('.cart-dropdown');
        const cartItemsContainer = document.querySelector('.cart-items');
        const cartCount = document.querySelector('.cart-count');
        const totalAmount = document.querySelector('.total-amount');
        const clearCartButton = document.querySelector('.clear-cart');
        const checkoutButton = document.querySelector('.checkout-btn');
        
        // Add to cart functionality
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const product = this.getAttribute('data-product');
                const price = parseFloat(this.getAttribute('data-price'));
                const productCard = this.closest('.product-card');
                const productImg = productCard.querySelector('.product-img img').getAttribute('data-src');
                
                // Add animation effect
                const btnRect = this.getBoundingClientRect();
                const cartRect = cartToggle.getBoundingClientRect();
                
                const productClone = document.createElement('div');
                productClone.className = 'product-clone';
                productClone.style.cssText = `
                    position: fixed;
                    z-index: 1000;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    left: ${btnRect.left + btnRect.width/2 - 25}px;
                    top: ${btnRect.top + btnRect.height/2 - 25}px;
                    transition: all 0.8s cubic-bezier(0.2, 1, 0.3, 1);
                    opacity: 0.8;
                `;
                
                const cloneImg = document.createElement('img');
                cloneImg.src = productImg;
                cloneImg.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                `;
                
                productClone.appendChild(cloneImg);
                document.body.appendChild(productClone);
                
                setTimeout(() => {
                    productClone.style.transform = `translate(${cartRect.left - btnRect.left - btnRect.width/2 + cartRect.width/2}px, ${cartRect.top - btnRect.top - btnRect.height/2 + cartRect.height/2}px) scale(0.2)`;
                    productClone.style.opacity = '0';
                }, 10);
                
                setTimeout(() => {
                    document.body.removeChild(productClone);
                    cartToggle.classList.add('cart-bump');
                    setTimeout(() => cartToggle.classList.remove('cart-bump'), 300);
                    
                    // Add item to cart
                    addToCart(product, price, productImg);
                }, 800);
            });
        });
        
        // Favorite functionality
        favoriteButtons.forEach(button => {
            button.addEventListener('click', function() {
                this.classList.toggle('active');
                const isActive = this.classList.contains('active');
                
                if (isActive) {
                    // Change icon to solid heart
                    this.querySelector('i').classList.remove('far');
                    this.querySelector('i').classList.add('fas');
                    
                    // Show heart animation
                    const heart = document.createElement('div');
                    heart.className = 'heart-animation';
                    heart.innerHTML = '<i class="fas fa-heart"></i>';
                    this.appendChild(heart);
                    
                    setTimeout(() => heart.remove(), 1000);
                } else {
                    // Change icon back to outline heart
                    this.querySelector('i').classList.remove('fas');
                    this.querySelector('i').classList.add('far');
                }
            });
        });
        
        // Cart toggle functionality
        if (cartToggle && cartDropdown) {
            cartToggle.addEventListener('click', function() {
                cartDropdown.classList.toggle('active');
            });
            
            // Close cart when clicking outside
            document.addEventListener('click', function(e) {
                if (!cartDropdown.contains(e.target) && !cartToggle.contains(e.target) && cartDropdown.classList.contains('active')) {
                    cartDropdown.classList.remove('active');
                }
            });
        }
        
        // Clear cart functionality
        if (clearCartButton) {
            clearCartButton.addEventListener('click', function() {
                cart.items = [];
                cart.total = 0;
                updateCartUI();
            });
        }
        
        // Checkout functionality
        if (checkoutButton) {
            checkoutButton.addEventListener('click', function() {
                if (cart.items.length === 0) {
                    alert('Your cart is empty!');
                    return;
                }
                
                // Show checkout confirmation
                const confirmCheckout = confirm(`Proceed to checkout? Total: ₹${cart.total}`);
                
                if (confirmCheckout) {
                    // Here you would normally redirect to checkout page
                    // For demo, we'll just show a success message
                    alert('Thank you for your order! We will contact you shortly to confirm the details.');
                    cart.items = [];
                    cart.total = 0;
                    updateCartUI();
                    cartDropdown.classList.remove('active');
                }
            });
        }
        
        // Add item to cart
        function addToCart(product, price, image) {
            // Check if product already exists in cart
            const existingItem = cart.items.find(item => item.product === product);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.items.push({
                    product,
                    price,
                    image,
                    quantity: 1
                });
            }
            
            // Update cart total
            updateCartTotal();
            
            // Update UI
            updateCartUI();
        }
        
        // Remove item from cart
        function removeFromCart(index) {
            cart.items.splice(index, 1);
            updateCartTotal();
            updateCartUI();
        }
        
        // Update quantity
        function updateQuantity(index, newQuantity) {
            if (newQuantity <= 0) {
                removeFromCart(index);
                return;
            }
            
            cart.items[index].quantity = newQuantity;
            updateCartTotal();
            updateCartUI();
        }
        
        // Update cart total
        function updateCartTotal() {
            cart.total = cart.items.reduce((total, item) => {
                return total + (item.price * item.quantity);
            }, 0);
        }
        
        // Update cart UI
        function updateCartUI() {
            // Update cart count
            cartCount.textContent = cart.items.reduce((count, item) => count + item.quantity, 0);
            
            // Update cart items
            cartItemsContainer.innerHTML = '';
            
            if (cart.items.length === 0) {
                cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            } else {
                cart.items.forEach((item, index) => {
                    const cartItem = document.createElement('div');
                    cartItem.className = 'cart-item';
                    
                    cartItem.innerHTML = `
                        <div class="cart-item-img">
                            <img src="${item.image}" alt="${item.product}">
                        </div>
                        <div class="cart-item-details">
                            <div class="cart-item-name">${item.product}</div>
                            <div class="cart-item-price">₹${item.price}</div>
                        </div>
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-index="${index}">-</button>
                            <span class="item-quantity">${item.quantity}</span>
                            <button class="quantity-btn increase" data-index="${index}">+</button>
                        </div>
                        <button class="cart-item-remove" data-index="${index}">
                            <i class="fas fa-times"></i>
                        </button>
                    `;
                    
                    cartItemsContainer.appendChild(cartItem);
                });
                
                // Add event listeners for quantity buttons
                document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        updateQuantity(index, cart.items[index].quantity - 1);
                    });
                });
                
                document.querySelectorAll('.quantity-btn.increase').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        updateQuantity(index, cart.items[index].quantity + 1);
                    });
                });
                
                // Add event listeners for remove buttons
                document.querySelectorAll('.cart-item-remove').forEach(button => {
                    button.addEventListener('click', function() {
                        const index = parseInt(this.getAttribute('data-index'));
                        removeFromCart(index);
                    });
                });
            }
            
            // Update total amount
            totalAmount.textContent = `₹${cart.total.toLocaleString()}`;
        }
        
        // Initialize cart UI
        updateCartUI();
        
        // Add CSS for cart animations
        const cartStyles = document.createElement('style');
        cartStyles.textContent = `
            .product-clone {
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            }
            
            .cart-bump {
                animation: bump 0.3s ease;
            }
            
            @keyframes bump {
                0% { transform: scale(1); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
            
            .heart-animation {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: heart-float 1s ease-out forwards;
                pointer-events: none;
            }
            
            .heart-animation i {
                color: #ff5b5b;
                font-size: 20px;
            }
            
            @keyframes heart-float {
                0% { 
                    opacity: 1; 
                    transform: translate(-50%, -50%) scale(1);
                }
                100% { 
                    opacity: 0; 
                    transform: translate(-50%, -150%) scale(1.5);
                }
            }
        `;
        document.head.appendChild(cartStyles);
    }
    
    // Initialize e-commerce functionality
    initEcommerce();

    // iOS specific enhancements
    function iOSEnhancements() {
        // Detect iOS devices
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        if (isIOS) {
            // Fix for 100vh on iOS
            const appHeight = () => {
                document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
            };
            window.addEventListener('resize', appHeight);
            appHeight();
            
            // Fix for touch delay on iOS
            document.body.style.cursor = 'pointer';
            
            // Fix for scrolling issues
            document.addEventListener('touchmove', function(e) {
                const target = e.target;
                // Allow scrolling in elements that should scroll (like menus, galleries)
                const shouldScroll = 
                    target.closest('nav') || 
                    target.closest('.gallery-grid') || 
                    target.closest('.reviews-slider') ||
                    target.closest('.products-grid');
                    
                if (!shouldScroll && e.touches.length === 1) {
                    e.preventDefault();
                }
            }, { passive: false });
            
            // Fix for position:fixed elements when keyboard is open
            const inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    document.body.classList.add('keyboard-open');
                });
                input.addEventListener('blur', () => {
                    document.body.classList.remove('keyboard-open');
                });
            });
            
            // Improve touch response
            document.addEventListener('touchstart', function() {}, { passive: true });
        }
    }

    // Initialize iOS enhancements
    iOSEnhancements();

    // Immediately execute enhanced mobile compatibility fixes
    (function() {
        // Fix for iOS 100vh issue
        function setAppHeight() {
            const doc = document.documentElement;
            doc.style.setProperty('--app-height', `${window.innerHeight}px`);
        }
        
        // Run now and on resize
        setAppHeight();
        window.addEventListener('resize', setAppHeight);
        
        // Detect mobile devices
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        
        // Add classes to body for targeted styling
        if (isMobile) document.body.classList.add('is-mobile');
        if (isIOS) document.body.classList.add('is-ios');
        
        // Mobile-specific adjustments
        if (isMobile) {
            // Improve form input handling on mobile
            const inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    document.body.classList.add('keyboard-open');
                    // Scroll element into view better
                    setTimeout(() => {
                        input.scrollIntoView({behavior: 'smooth', block: 'center'});
                    }, 300);
                });
                
                input.addEventListener('blur', () => {
                    document.body.classList.remove('keyboard-open');
                });
            });
            
            // Improve touch targets
            const touchTargets = document.querySelectorAll('button, .btn, nav ul li a, .tab-btn, .gallery-zoom');
            touchTargets.forEach(target => {
                target.style.minHeight = '44px';
                target.style.minWidth = '44px';
            });
        }
        
        // iOS specific fixes
        if (isIOS) {
            // Fix for double-tap zooming issue
            document.addEventListener('touchend', function(event) {
                // Prevent zoom on double-tap for interactive elements
                if (event.target.tagName === 'A' || 
                    event.target.tagName === 'BUTTON' || 
                    event.target.classList.contains('btn')) {
                    event.preventDefault();
                }
            });
            
            // Fix for "stuck" hover states
            document.addEventListener('touchstart', function(){}, {passive: true});
        }
    })();
}); 