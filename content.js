// Content-specific JavaScript for Grade-XI and Grade-XII sections
document.addEventListener('DOMContentLoaded', function() {
    // Function to handle folder toggles
    function setupFolderToggle(triggerId, targetId) {
        const trigger = document.getElementById(triggerId);
        const target = document.getElementById(targetId);
        
        if (trigger && target) {
            trigger.addEventListener('click', function(e) {
                e.stopPropagation();
                target.style.display = target.style.display === 'none' || !target.style.display ? 'block' : 'none';
            });
        }
    }

    // Grade-XI English Note functionality
    setupFolderToggle('grade11-main-folder', 'grade11-subfolders');
    setupFolderToggle('grade11-poem-folder', 'grade11-poem-content');
    setupFolderToggle('grade11-short-stories-folder', 'grade11-short-stories-content');
    setupFolderToggle('grade11-essay-folder', 'grade11-essay-content');
    setupFolderToggle('grade11-one-act-play-folder', 'grade11-one-act-play-content');

    // Grade-XII English Note functionality
    setupFolderToggle('grade12-main-folder', 'grade12-subfolders');
    setupFolderToggle('grade12-poem-folder', 'grade12-poem-content');
    setupFolderToggle('grade12-short-stories-folder', 'grade12-short-stories-content');
    setupFolderToggle('grade12-essay-folder', 'grade12-essay-content');
    setupFolderToggle('grade12-one-act-play-folder', 'grade12-one-act-play-content');

    // Fix PDF links to open in new tab
    document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });

    // Navigation functionality for content sections
    const contentNavLinks = document.querySelectorAll('a[href^="#grade"], a[href^="#cdc"], a[href^="#see"], a[href^="#xii"], a[href^="#curriculum"], a[href^="#text-books"]');
    contentNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle content section links
            if (href.startsWith('#grade') || href === '#cdc-teachers-guide' || 
                href === '#see-question-bank' || href === '#xii-question-bank' ||
                href === '#curriculum' || href === '#text-books') {
                e.preventDefault();
                
                // Hide all content sections first
                document.querySelectorAll('section[id^="grade"], section[id^="cdc"], section[id^="see"], section[id^="xii"], section[id^="curriculum"], section[id^="text-books"]').forEach(section => {
                    section.style.display = 'none';
                });
                
                // Show the selected section
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.style.display = 'block';
                    
                    // Scroll to the section
                    const offsetTop = targetSection.offsetTop - 120; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Show the first section by default if on a content section page
    const currentHash = window.location.hash;
    if (currentHash) {
        const targetSection = document.querySelector(currentHash);
        if (targetSection) {
            // Hide all content sections first
            document.querySelectorAll('section[id^="grade"], section[id^="cdc"], section[id^="see"], section[id^="xii"], section[id^="curriculum"], section[id^="text-books"]').forEach(section => {
                section.style.display = 'none';
            });
            
            // Show the target section
            targetSection.style.display = 'block';
            
            // Expand the main folder
            const mainFolder = targetSection.querySelector('[id$="-main-folder"]');
            if (mainFolder) {
                mainFolder.click();
            }
        }
    }
});
