// Simple and reliable toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Function to set up a single toggle
    function setupToggle(triggerId, targetId) {
        const trigger = document.getElementById(triggerId);
        const target = document.getElementById(targetId);
        
        if (trigger && target) {
            trigger.style.cursor = 'pointer';
            
            // Remove any existing event listeners
            const newTrigger = trigger.cloneNode(true);
            trigger.parentNode.replaceChild(newTrigger, trigger);
            
            // Add new click handler
            newTrigger.addEventListener('click', function(e) {
                e.stopPropagation();
                if (target.style.display === 'none' || !target.style.display) {
                    target.style.display = 'block';
                } else {
                    target.style.display = 'none';
                }
            });
        }
    }

    // Set up all toggles
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

        // Set up PDF links
        document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            if (!link.hasAttribute('download')) {
                link.setAttribute('download', '');
            }
        });
    }

    // Initialize toggles
    initToggles();

    // Handle section navigation
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
});
