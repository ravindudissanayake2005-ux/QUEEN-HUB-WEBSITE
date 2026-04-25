document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    // Lightbox / Modal for Masonry Images
    const modalOverlay = document.getElementById('modal-overlay');
    const modalImg = document.getElementById('modal-img');
    const modalClose = document.getElementById('modal-close');
    const galleryImages = document.querySelectorAll('.gallery-image');

    if (modalOverlay && modalImg && modalClose) {
        galleryImages.forEach(img => {
            img.addEventListener('click', (e) => {
                e.preventDefault();
                const src = img.getAttribute('src');
                modalImg.setAttribute('src', src);
                modalOverlay.classList.add('active');
            });
        });

        modalClose.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
            }
        });
    }

    // Mock Upload Functionality
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-upload');
    const uploadBtn = document.getElementById('upload-btn');

    if (uploadArea && fileInput && uploadBtn) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.add('dragover');
            }, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadArea.addEventListener(eventName, () => {
                uploadArea.classList.remove('dragover');
            }, false);
        });

        uploadArea.addEventListener('drop', (e) => {
            let dt = e.dataTransfer;
            let files = dt.files;
            handleFiles(files);
        });

        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });

        function handleFiles(files) {
            if(files.length > 0) {
                const fileName = files[0].name;
                const uploadText = document.getElementById('upload-text');
                if(uploadText) {
                    uploadText.innerHTML = `<span class="text-green-400 font-semibold">Selected:</span> ${fileName}`;
                }
            }
        }

        uploadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (fileInput.files.length > 0 || document.querySelector('.dragover')) {
                // Mock success
                const uploadText = document.getElementById('upload-text');
                const originalText = uploadText.innerHTML;
                
                uploadBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Uploading...';
                uploadBtn.disabled = true;

                setTimeout(() => {
                    uploadBtn.innerHTML = '<i class="fas fa-check mr-2"></i> Upload Successful';
                    uploadBtn.classList.remove('bg-gradient-to-r', 'from-purple-600', 'to-pink-600');
                    uploadBtn.classList.add('bg-green-600');
                    
                    setTimeout(() => {
                        uploadBtn.innerHTML = 'Upload Image';
                        uploadBtn.classList.add('bg-gradient-to-r', 'from-purple-600', 'to-pink-600');
                        uploadBtn.classList.remove('bg-green-600');
                        uploadBtn.disabled = false;
                        uploadText.innerHTML = `<span class="font-semibold text-purple-400">Click to upload</span> or drag and drop`;
                        fileInput.value = '';
                        
                        // Show a mock alert
                        alert('Your image has been uploaded successfully to Queen Hub!');
                    }, 3000);
                }, 1500);
            } else {
                alert('Please select an image first!');
            }
        });
    }
});
