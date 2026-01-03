// Enhanced toggle functionality with PDF support
document.addEventListener('DOMContentLoaded', function() {
    // Function to set up a single toggle
    function setupToggle(triggerId, targetId) {
        const trigger = document.getElementById(triggerId);
        const target = document.getElementById(targetId);
        
        if (trigger && target) {
            // Add folder icon if not exists
            if (!trigger.querySelector('i')) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-folder me-2';
                trigger.insertBefore(icon, trigger.firstChild);
            }
            
            trigger.style.cursor = 'pointer';
            
            // Add click handler
            trigger.addEventListener('click', function(e) {
                e.stopPropagation();
                const isHidden = target.style.display === 'none' || !target.style.display;
                target.style.display = isHidden ? 'block' : 'none';
                
                // Update folder icon
                const icon = this.querySelector('i');
                if (icon) {
                    icon.className = isHidden ? 'fas fa-folder-open me-2' : 'fas fa-folder me-2';
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
    }

    // Initialize toggles
    initToggles();

    // Handle PDF links
    document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
        // Add PDF icon
        if (!link.querySelector('i')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-file-pdf me-2';
            link.insertBefore(icon, link.firstChild);
        }
        
        // Set up click handler for PDFs
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pdfUrl = this.getAttribute('href');
            
            // Create or update the PDF viewer modal
            let modal = document.getElementById('pdfModal');
            if (!modal) {
                modal = document.createElement('div');
                modal.id = 'pdfModal';
                modal.className = 'modal fade';
                modal.tabIndex = '-1';
                modal.innerHTML = `
                    <div class="modal-dialog modal-xl modal-dialog-centered">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">${this.textContent.trim()}</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body p-0">
                                <iframe src="${pdfUrl}" style="width: 100%; height: 80vh; border: none;"></iframe>
                            </div>
                            <div class="modal-footer">
                                <a href="${pdfUrl}" class="btn btn-primary" download>
                                    <i class="fas fa-download me-2"></i>Download
                                </a>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                    <i class="fas fa-times me-2"></i>Close
                                </button>
                            </div>
                        </div>
                    </div>`;
                document.body.appendChild(modal);
            }
            
            // Initialize and show the modal
            const bsModal = new bootstrap.Modal(modal);
            bsModal.show();
            
            // Clean up modal when closed
            modal.addEventListener('hidden.bs.modal', function () {
                modal.remove();
            }, { once: true });
        });
    });

    // Handle section navigation
    document.querySelectorAll('a[href^="#"].nav-link').forEach(link => {
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
                    
                    // Auto-expand the main folder
                    const mainFolder = targetSection.querySelector('[id$="-main-folder"]');
                    const subfolders = targetSection.querySelector('[id$="-subfolders"]');
                    if (mainFolder && subfolders) {
                        subfolders.style.display = 'block';
                        const icon = mainFolder.querySelector('i');
                        if (icon) {
                            icon.className = 'fas fa-folder-open me-2';
                        }
                    }
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
            
            // Auto-expand the main folder
            const mainFolder = targetSection.querySelector('[id$="-main-folder"]');
            const subfolders = targetSection.querySelector('[id$="-subfolders"]');
            if (mainFolder && subfolders) {
                subfolders.style.display = 'block';
                const icon = mainFolder.querySelector('i');
                if (icon) {
                    icon.className = 'fas fa-folder-open me-2';
                }
            }
        }
    }
});
