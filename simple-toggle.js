document.addEventListener('DOMContentLoaded', function() {
    // Function to handle folder toggles
    function setupFolderToggle(triggerId, targetId) {
        const trigger = document.getElementById(triggerId);
        const target = document.getElementById(targetId);
        
        if (trigger && target) {
            // Make sure the trigger is clickable
            trigger.style.cursor = 'pointer';
            
            // Add click event
            trigger.addEventListener('click', function(e) {
                e.stopPropagation();
                // Toggle display
                if (target.style.display === 'none' || !target.style.display) {
                    target.style.display = 'block';
                } else {
                    target.style.display = 'none';
                }
            });
        }
    }

    // Set up all toggles for Grade-XI
    setupFolderToggle('grade11-main-folder', 'grade11-subfolders');
    setupFolderToggle('grade11-poem-folder', 'grade11-poem-content');
    setupFolderToggle('grade11-short-stories-folder', 'grade11-short-stories-content');
    setupFolderToggle('grade11-essay-folder', 'grade11-essay-content');
    setupFolderToggle('grade11-one-act-play-folder', 'grade11-one-act-play-content');

    // Set up all toggles for Grade-XII
    setupFolderToggle('grade12-main-folder', 'grade12-subfolders');
    setupFolderToggle('grade12-poem-folder', 'grade12-poem-content');
    setupFolderToggle('grade12-short-stories-folder', 'grade12-short-stories-content');
    setupFolderToggle('grade12-essay-folder', 'grade12-essay-content');
    setupFolderToggle('grade12-one-act-play-folder', 'grade12-one-act-play-content');

    // Set up PDF links
    document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Handle navigation between sections
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

    // Handle initial page load with hash
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            // Show the target section
            targetSection.style.display = 'block';
        }
    }
});
