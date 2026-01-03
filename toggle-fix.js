document.addEventListener('DOMContentLoaded', function() {
    // Initialize all toggles
    function initToggles() {
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

        // Hide all content divs initially
        document.querySelectorAll('[id$="-content"]').forEach(content => {
            content.style.display = 'none';
        });

        // Handle PDF links
        setupPdfLinks();
    }

    // Set up individual folder toggle
    function setupFolderToggle(triggerId, targetId) {
        const trigger = document.getElementById(triggerId);
        const target = document.getElementById(targetId);
        
        if (!trigger || !target) return;
        
        // Make sure the trigger is clickable
        trigger.style.cursor = 'pointer';
        
        // Add click handler
        trigger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleFolder(trigger, target);
        });
    }

    // Toggle folder visibility
    function toggleFolder(trigger, target) {
        const isHidden = target.style.display === 'none' || target.offsetParent === null;
        target.style.display = isHidden ? 'block' : 'none';
        
        // Update folder icon if it exists
        const icon = trigger.querySelector('i');
        if (icon) {
            if (isHidden) {
                icon.className = 'fas fa-folder-open';
            } else {
                icon.className = 'fas fa-folder';
            }
        }
    }

    // Set up PDF links to open in new tab
    function setupPdfLinks() {
        document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    }

    // Handle section navigation
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
                        
                        // Auto-expand the main folder if it exists
                        const mainFolder = targetSection.querySelector('[id$="-main-folder"]');
                        const subfolders = targetSection.querySelector('[id$="-subfolders"]');
                        if (mainFolder && subfolders) {
                            subfolders.style.display = 'block';
                            const icon = mainFolder.querySelector('i');
                            if (icon) {
                                icon.className = 'fas fa-folder-open';
                            }
                        }
                    }
                }
            });
        });
    }

    // Initialize everything
    initToggles();
    setupNavigation();

    // Handle initial page load with hash
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            // Show the target section
            targetSection.style.display = 'block';
            
            // Auto-expand the main folder if it exists
            const mainFolder = targetSection.querySelector('[id$="-main-folder"]');
            const subfolders = targetSection.querySelector('[id$="-subfolders"]');
            if (mainFolder && subfolders) {
                subfolders.style.display = 'block';
                const icon = mainFolder.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-folder-open';
                }
            }
        }
    }
});
