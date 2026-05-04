document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    
    // Create Navigation Dots
    const navDotsContainer = document.createElement('div');
    navDotsContainer.className = 'nav-dots';
    
    slides.forEach((slide, index) => {
        const dot = document.createElement('div');
        dot.className = 'nav-dot';
        if (index === 0) dot.classList.add('active');
        
        dot.addEventListener('click', () => {
            slide.scrollIntoView({ behavior: 'smooth' });
        });
        
        navDotsContainer.appendChild(dot);
    });
    
    document.body.appendChild(navDotsContainer);
    
    // Intersection Observer for Animations and Nav
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };
    
    const dots = document.querySelectorAll('.nav-dot');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find slide index
                const slideIndex = Array.from(slides).indexOf(entry.target);
                
                // Update dots
                dots.forEach(dot => dot.classList.remove('active'));
                if (dots[slideIndex]) dots[slideIndex].classList.add('active');
                
                // Trigger animations
                const animatedElements = entry.target.querySelectorAll('.fade-target');
                animatedElements.forEach((el, i) => {
                    setTimeout(() => {
                        el.classList.add('fade-in-up');
                    }, i * 150);
                });
            }
        });
    }, observerOptions);
    
    slides.forEach(slide => {
        observer.observe(slide);
    });
});
