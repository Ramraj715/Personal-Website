document.addEventListener('DOMContentLoaded', function() {
    // Create PDF viewer modal
    const modalHTML = `
    <div id="pdfModal" class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">PDF Viewer</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <iframe id="pdfViewer" style="width: 100%; height: 70vh; border: none;"></iframe>
                </div>
                <div class="modal-footer">
                    <a id="downloadPdf" href="#" class="btn btn-primary" download>
                        <i class="fas fa-download me-2"></i>Download
                    </a>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>`;

    // Add modal to body if not exists
    if (!document.getElementById('pdfModal')) {
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    // Initialize Bootstrap modal
    const pdfModal = new bootstrap.Modal(document.getElementById('pdfModal'));
    const pdfViewer = document.getElementById('pdfViewer');
    const downloadPdf = document.getElementById('downloadPdf');

    // Handle PDF link clicks
    document.addEventListener('click', function(e) {
        // Check if clicked element is a PDF link
        let pdfLink = e.target.closest('a[href$=".pdf"]');
        
        if (pdfLink) {
            e.preventDefault();
            const pdfUrl = pdfLink.getAttribute('href');
            
            // Set PDF source
            pdfViewer.src = pdfUrl + '#toolbar=0&navpanes=0&scrollbar=0';
            
            // Set download link
            downloadPdf.href = pdfUrl;
            const fileName = pdfUrl.split('/').pop();
            downloadPdf.setAttribute('download', fileName);
            
            // Show modal
            pdfModal.show();
        }
    });

    // Close modal when clicking outside content
    document.getElementById('pdfModal').addEventListener('click', function(e) {
        if (e.target === this) {
            pdfModal.hide();
        }
    });
});
