// Hiệu ứng gõ chữ tên
const text = "Đảk Đảk Bủn Bủn Lmao Lmao";
let index = 0;
function type() {
  if (index < text.length) {
    document.getElementById("typing").innerHTML += text.charAt(index);
    index++;
    setTimeout(type, 100);
  }
}
type();

// --- Popup Controller Functions (for Share Popup) ---
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.style.display = 'flex'; // Ensure it's visible for animation
        setTimeout(() => { // Small delay to allow display change to register before adding active class
            popup.classList.add('active');
        }, 10);
    }
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.remove('active');
        // Wait for the transition to finish before hiding with display: none
        popup.addEventListener('transitionend', function handler() {
            popup.style.display = 'none';
            popup.removeEventListener('transitionend', handler);
        }, { once: true }); // Use { once: true } to ensure listener is removed after first execution
    }
}

// --- Event Listeners for Share Popup ---
const shareButton = document.getElementById('card-share-button');
const sharePopup = document.getElementById('sharePopup');
const closeSharePopupBtn = document.getElementById('close-share-popup');
const bioLinkUrlInput = document.getElementById('bio-link-url');
const copyBioLinkBtn = document.getElementById('copy-bio-link');
const downloadQrOverlay = document.getElementById('download-qr-overlay');
const bioLinkQrImage = document.getElementById('bio-link-qr-image');

if (shareButton) {
    shareButton.addEventListener('click', function (e) {
        e.preventDefault();
        openPopup('sharePopup');
    });
}

if (closeSharePopupBtn) {
    closeSharePopupBtn.addEventListener('click', function () {
        closePopup('sharePopup');
    });
}

// Close share popup if clicking outside content
if (sharePopup) {
    sharePopup.addEventListener('click', function (e) {
        if (e.target === sharePopup) {
            closePopup('sharePopup');
        }
    });
}

// Copy Bio Link
if (copyBioLinkBtn) {
    copyBioLinkBtn.addEventListener('click', function () {
        if (bioLinkUrlInput) {
            bioLinkUrlInput.select();
            bioLinkUrlInput.setSelectionRange(0, 99999); /* For mobile devices */
            navigator.clipboard.writeText(bioLinkUrlInput.value)
                .then(() => {
                    const originalText = copyBioLinkBtn.textContent;
                    copyBioLinkBtn.textContent = 'Đã sao chép!';
                    copyBioLinkBtn.style.backgroundColor = '#28a745';
                    setTimeout(() => {
                        copyBioLinkBtn.textContent = originalText;
                        copyBioLinkBtn.style.backgroundColor = '#9966cc'; // Changed to original button color
                    }, 1500);
                })
                .catch(err => {
                    console.error('Failed to copy text: ', err);
                    alert('Không thể sao chép link. Vui lòng sao chép thủ công.');
                });
        }
    });
}

// Tải xuống QR Code khi click vào lớp phủ "Tải xuống"
if (downloadQrOverlay && bioLinkQrImage) {
    downloadQrOverlay.addEventListener('click', function() {
        const qrImageUrl = bioLinkQrImage.src;

        const link = document.createElement('a');
        link.href = qrImageUrl;
        link.download = 'QR_BaoBunLmaoLmao_sabyn.png';

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

// --- Music Playback ---
const bgMusic = document.getElementById('bg-music');

document.addEventListener('DOMContentLoaded', () => {
    if (bgMusic) {
        bgMusic.volume = 0.5; // Điều chỉnh âm lượng (0.0 đến 1.0)
        bgMusic.play().catch(error => {
            console.warn("Autoplay was prevented:", error);
            // Có thể hiển thị một thông báo cho người dùng nếu nhạc không tự động phát
        });
    }
});