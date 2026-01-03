// Simple and reliable toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all toggles
    function initToggles() {
        // Grade-XI Toggles
        setupToggle('grade11-main-folder', 'grade11-subfolders');
        setupToggle('grade11-poem-folder', 'grade11-poem-content');
        setupToggle('grade11-short-stories-folder', 'grade11-short-stories-content');
        setupToggle('grade11-essay-folder', 'grade11-essay-content');
        setupToggle('grade11-one-act-play-folder', 'grade11-one-act-play-content');

        // Grade-XII Toggles
        setupToggle('grade12-main-folder', 'grade12-subfolders');
        setupToggle('grade12-poem-folder', 'grade12-poem-content');
        setupToggle('grade12-short-stories-folder', 'grade12-short-stories-content');
        setupToggle('grade12-essay-folder', 'grade12-essay-content');
        setupToggle('grade12-one-act-play-folder', 'grade12-one-act-play-content');

        // Hide all content divs initially
        document.querySelectorAll('[id$="-content"]').forEach(content => {
            content.style.display = 'none';
        });
    }

    // Setup individual toggle
    function setupToggle(triggerId, targetId) {
        const trigger = document.getElementById(triggerId);
        const target = document.getElementById(targetId);
        
        if (!trigger || !target) return;
        
        // Make sure the trigger is clickable
        trigger.style.cursor = 'pointer';
        
        // Remove any existing event listeners
        const newTrigger = trigger.cloneNode(true);
        trigger.parentNode.replaceChild(newTrigger, trigger);
        
        // Add new click handler
        newTrigger.addEventListener('click', function(e) {
            e.stopPropagation();
            const isHidden = target.style.display === 'none' || !target.style.display;
            target.style.display = isHidden ? 'block' : 'none';
        });
    }

    // Setup PDF links
    function setupPdfLinks() {
        document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
            // Make sure links open in new tab
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Force download attribute
            if (!link.hasAttribute('download')) {
                const fileName = link.getAttribute('href').split('/').pop();
                link.setAttribute('download', fileName);
            }
        });
    }

    // Handle section switching
    function setupNavigation() {
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        e.preventDefault();
                        
                        // Hide all note sections
                        document.querySelectorAll('section[id$="-note"]').forEach(section => {
                            section.style.display = 'none';
                        });
                        
                        // Show the target section
                        targetSection.style.display = 'block';
                        
                        // Scroll to section
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        });
    }

    // Initialize everything
    initToggles();
    setupPdfLinks();
    setupNavigation();

    // Handle initial page load with hash
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            // Show the target section
            targetSection.style.display = 'block';
        }
    }
});
