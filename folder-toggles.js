document.addEventListener('DOMContentLoaded', function() {
    // Function to set up folder toggles
    function setupFolderToggles() {
        // Grade-XI Toggles
        setupFolderToggle('grade11-main-folder', 'grade11-subfolders');
        setupFolderToggle('grade11-poem-folder', 'grade11-poem-content');
        setupFolderToggle('grade11-short-stories-folder', 'grade11-short-stories-content');
        setupFolderToggle('grade11-essay-folder', 'grade11-essay-content');
        setupFolderToggle('grade11-one-act-play-folder', 'grade11-one-act-play-content');

        // Grade-XII Toggles
        setupFolderToggle('grade12-main-folder', 'grade12-subfolders');
        setupFolderToggle('grade12-poem-folder', 'grade12-poem-content');
        setupFolderToggle('grade12-short-stories-folder', 'grade12-short-stories-content');
        setupFolderToggle('grade12-essay-folder', 'grade12-essay-content');
        setupFolderToggle('grade12-one-act-play-folder', 'grade12-one-act-play-content');
    }

    // Helper function to set up individual folder toggles
    function setupFolderToggle(triggerId, targetId) {
        const trigger = document.getElementById(triggerId);
        const target = document.getElementById(targetId);
        
        if (trigger && target) {
            trigger.style.cursor = 'pointer';
            
            trigger.addEventListener('click', function(e) {
                e.stopPropagation();
                const isHidden = target.style.display === 'none' || !target.style.display;
                target.style.display = isHidden ? 'block' : 'none';
                
                // Toggle folder icon
                const icon = trigger.querySelector('i');
                if (icon) {
                    if (isHidden) {
                        icon.classList.remove('fa-folder');
                        icon.classList.add('fa-folder-open');
                    } else {
                        icon.classList.remove('fa-folder-open');
                        icon.classList.add('fa-folder');
                    }
                }
            });
            
            // Initialize state (closed)
            target.style.display = 'none';
            const icon = trigger.querySelector('i');
            if (icon) {
                icon.classList.add('fa-folder');
            }
        }
    }

    // Set up PDF links to open in new tab
    function setupPdfLinks() {
        document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            
            // Add download attribute if not present
            if (!link.hasAttribute('download')) {
                const fileName = link.getAttribute('href').split('/').pop();
                link.setAttribute('download', fileName);
            }
        });
    }

    // Navigation handling
    function setupNavigation() {
        document.querySelectorAll('a.nav-link').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        // Hide all sections
                        document.querySelectorAll('section').forEach(section => {
                            section.style.display = 'none';
                        });
                        
                        // Show target section
                        targetSection.style.display = 'block';
                        
                        // Scroll to section
                        window.scrollTo({
                            top: targetSection.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // If it's a content section, expand the main folder
                        if (targetId.includes('grade')) {
                            const mainFolder = targetSection.querySelector('[id$="-main-folder"]');
                            if (mainFolder) {
                                mainFolder.click();
                            }
                        }
                    }
                }
            });
        });
    }

    // Initialize everything
    setupFolderToggles();
    setupPdfLinks();
    setupNavigation();
});
