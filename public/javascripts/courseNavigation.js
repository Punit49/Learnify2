document.addEventListener('DOMContentLoaded', function() {
    // Course cards navigation
    const courseWrapper = document.querySelector('.course-Wrapper');
    const leftButton = document.getElementById('course-tab-left');
    const rightButton = document.getElementById('course-tab-right');
    
    // Calculate scroll distance (one card width + gap)
    const scrollDistance = 320; // 300px card width + 20px gap
    
    if (leftButton && rightButton && courseWrapper) {
        // Hide left button initially
        leftButton.style.display = 'none';
        
        // Update button visibility
        const updateButtonVisibility = () => {
            const { scrollLeft, scrollWidth, clientWidth } = courseWrapper;
            
            // Show/hide left button
            leftButton.style.display = scrollLeft > 0 ? 'flex' : 'none';
            
            // Show/hide right button
            rightButton.style.display = 
                scrollLeft + clientWidth < scrollWidth - 1 ? 'flex' : 'none';
        };
        
        // Scroll left
        leftButton.addEventListener('click', () => {
            courseWrapper.scrollBy({
                left: -scrollDistance,
                behavior: 'smooth'
            });
        });
        
        // Scroll right
        rightButton.addEventListener('click', () => {
            courseWrapper.scrollBy({
                left: scrollDistance,
                behavior: 'smooth'
            });
        });
        
        // Update button visibility on scroll
        courseWrapper.addEventListener('scroll', updateButtonVisibility);
        
        // Update button visibility on window resize
        window.addEventListener('resize', updateButtonVisibility);
        
        // Initial button visibility check
        updateButtonVisibility();
    }
    
    // Course category tabs navigation
    const coursesTab = document.querySelector('.courses-Tab');
    const catLeftButton = document.getElementById('courseCatLeft');
    const catRightButton = document.getElementById('courseCatRight');
    
    if (catLeftButton && catRightButton && coursesTab) {
        // Hide left button initially
        catLeftButton.style.display = 'none';
        
        // Update category button visibility
        const updateCatButtonVisibility = () => {
            const { scrollLeft, scrollWidth, clientWidth } = coursesTab;
            
            // Show/hide left button
            catLeftButton.style.display = scrollLeft > 0 ? 'flex' : 'none';
            
            // Show/hide right button
            catRightButton.style.display = 
                scrollLeft + clientWidth < scrollWidth - 1 ? 'flex' : 'none';
        };
        
        // Scroll category tabs left
        catLeftButton.addEventListener('click', () => {
            coursesTab.scrollBy({
                left: -200,
                behavior: 'smooth'
            });
        });
        
        // Scroll category tabs right
        catRightButton.addEventListener('click', () => {
            coursesTab.scrollBy({
                left: 200,
                behavior: 'smooth'
            });
        });
        
        // Update category button visibility on scroll
        coursesTab.addEventListener('scroll', updateCatButtonVisibility);
        
        // Update category button visibility on window resize
        window.addEventListener('resize', updateCatButtonVisibility);
        
        // Initial category button visibility check
        updateCatButtonVisibility();
    }
    
    // Course category filtering
    const categoryTags = document.querySelectorAll('.course-tag');
    const courses = document.querySelectorAll('.course');
    
    categoryTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active class from all tags
            categoryTags.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tag
            tag.classList.add('active');
            
            const category = tag.getAttribute('data-category');
            
            // Filter courses
            courses.forEach(course => {
                if (category === 'all' || course.getAttribute('data-category') === category) {
                    course.style.display = 'block';
                } else {
                    course.style.display = 'none';
                }
            });
            
            // Reset scroll position
            courseWrapper.scrollTo({
                left: 0,
                behavior: 'smooth'
            });
            
            // Update button visibility
            updateButtonVisibility();
        });
    });
}); 