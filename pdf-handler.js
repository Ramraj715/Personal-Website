// PDF Handler for Mr. Ramraj Rajbanshi's Website
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Function to create PDF viewer modal
    function createPdfViewer() {
        if (!document.getElementById('pdfViewerModal')) {
            const modalHTML = `
            <div class="modal fade" id="pdfViewerModal" tabindex="-1" aria-labelledby="pdfViewerModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-xl modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-header bg-primary text-white">
                            <h5 class="modal-title" id="pdfViewerModalLabel">PDF Viewer</h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body p-0" style="min-height: 70vh;">
                            <iframe id="pdfFrame" style="width: 100%; height: 70vh; border: none;"></iframe>
                        </div>
                        <div class="modal-footer">
                            <a id="pdfDownloadBtn" href="#" class="btn btn-primary" download>
                                <i class="fas fa-download me-2"></i>Download PDF
                            </a>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                                <i class="fas fa-times me-2"></i>Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>`;
            document.body.insertAdjacentHTML('beforeend', modalHTML);
        }
    }

    // Initialize PDF viewer
    createPdfViewer();
    const pdfViewerModal = new bootstrap.Modal(document.getElementById('pdfViewerModal'));
    const pdfFrame = document.getElementById('pdfFrame');
    const pdfDownloadBtn = document.getElementById('pdfDownloadBtn');

    // Handle PDF link clicks
    document.addEventListener('click', function(e) {
        const pdfLink = e.target.closest('a[href$=".pdf"]');
        if (pdfLink) {
            e.preventDefault();
            const pdfUrl = pdfLink.getAttribute('href');
            const pdfTitle = pdfLink.textContent.trim() || 'Document';
            
            // Set PDF source
            pdfFrame.src = pdfUrl + '#toolbar=0&navpanes=1';
            
            // Set download link
            const fileName = pdfUrl.split('/').pop();
            pdfDownloadBtn.setAttribute('href', pdfUrl);
            pdfDownloadBtn.setAttribute('download', fileName);
            
            // Update modal title
            document.getElementById('pdfViewerModalLabel').textContent = pdfTitle;
            
            // Show modal
            pdfViewerModal.show();
        }
    });

    // Handle folder toggles
    function setupFolderToggle(triggerId, targetId) {
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

    // Set up all folder toggles
    function setupAllToggles() {
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

        // Add PDF icons to all PDF links
        document.querySelectorAll('a[href$=".pdf"]').forEach(link => {
            if (!link.querySelector('i')) {
                const icon = document.createElement('i');
                icon.className = 'fas fa-file-pdf me-2';
                link.insertBefore(icon, link.firstChild);
            }
            // Add tooltip
            link.setAttribute('data-bs-toggle', 'tooltip');
            link.setAttribute('title', 'Click to view or right-click to download');
        });
    }

    // Handle section navigation
    function setupNavigation() {
        document.querySelectorAll('a.nav-link[href^="#"], a[href^="#"].btn').forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        e.preventDefault();
                        
                        // Hide all content sections
                        document.querySelectorAll('section[id$="-note"], section[id$="-guide"], section[id$="-bank"], section[id$="-books"]')
                            .forEach(section => {
                                section.style.display = 'none';
                            });
                        
                        // Show the target section
                        targetSection.style.display = 'block';
                        
                        // Update URL
                        history.pushState(null, '', '#' + targetId);
                        
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
                                icon.className = 'fas fa-folder-open me-2';
                            }
                        }
                    }
                }
            });
        });
    }

    // Handle initial page load with hash
    function handleInitialLoad() {
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
                        icon.className = 'fas fa-folder-open me-2';
                    }
                }
                
                // Scroll to section
                setTimeout(() => {
                    window.scrollTo({
                        top: targetSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 100);
            }
        }
    }

    // Initialize everything
    setupAllToggles();
    setupNavigation();
    handleInitialLoad();

    // Update tooltips after dynamic content is added
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});
