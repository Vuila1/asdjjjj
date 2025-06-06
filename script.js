document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.getElementById('typing');
    const text = "Đảk Đảk Bủn Bủn Lmao Lmao";
    let i = 0;
    let isDeleting = false;
    let charIndex = 0;
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const delayBetweenWords = 1000;

    function typeWriter() {
        const currentText = text.substring(0, charIndex);
        typingElement.textContent = currentText;

        if (!isDeleting && charIndex < text.length) {
            charIndex++;
            setTimeout(typeWriter, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeWriter, deletingSpeed);
        } else if (!isDeleting && charIndex === text.length) {
            // No deleting needed for a single line of text
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // No next word, just stay
        }
    }

    typeWriter();

    // Share button functionality
    const cardShareButton = document.getElementById('card-share-button');
    const sharePopup = document.getElementById('sharePopup');
    const closeSharePopup = document.getElementById('close-share-popup');
    const bioLinkUrl = document.getElementById('bio-link-url');
    const copyBioLinkButton = document.getElementById('copy-bio-link');
    const downloadQrOverlay = document.getElementById('download-qr-overlay'); // Nút download QR share
    const bioLinkQrImage = document.getElementById('bio-link-qr-image');

    cardShareButton.addEventListener('click', function() {
        sharePopup.classList.add('active');
        // You might want to generate QR code dynamically here or ensure it's loaded
    });

    closeSharePopup.addEventListener('click', function() {
        sharePopup.classList.remove('active');
    });

    sharePopup.addEventListener('click', function(event) {
        if (event.target === sharePopup) {
            sharePopup.classList.remove('active');
        }
    });

    copyBioLinkButton.addEventListener('click', function() {
        bioLinkUrl.select();
        bioLinkUrl.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand('copy');
        alert('Đã sao chép link!'); // Optional: provide feedback
    });

    downloadQrOverlay.addEventListener('click', function() {
        const qrCodeSrc = bioLinkQrImage.src;
        if (qrCodeSrc) {
            const a = document.createElement('a');
            a.href = qrCodeSrc;
            a.download = 'BioLink_QR_Code.png'; // Suggested filename
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert('Không tìm thấy mã QR để tải xuống.');
        }
    });

    // Donate QR Download Functionality
    const downloadDonateQrButton = document.getElementById('download-donate-qr'); // Nút download QR donate
    const donateQrImage = document.querySelector('.support-qr-code'); // Hình ảnh QR donate

    downloadDonateQrButton.addEventListener('click', function() {
        const qrCodeSrc = donateQrImage.src;
        if (qrCodeSrc) {
            const a = document.createElement('a');
            a.href = qrCodeSrc;
            a.download = 'Donate_QR_Code.png'; // Tên file tải xuống cho QR donate
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        } else {
            alert('Không tìm thấy mã QR donate để tải xuống.');
        }
    });


    // Music Control Functionality
    const bgMusic = document.getElementById('bg-music');
    const toggleMusicButton = document.getElementById('toggle-music-button');
    let isMusicPlaying = false; // Theo dõi trạng thái nhạc

    // Kiểm tra nếu trình duyệt cho phép tự động phát nhạc
    bgMusic.play().then(() => {
        isMusicPlaying = true;
        toggleMusicButton.querySelector('i').classList.remove('fa-volume-mute');
        toggleMusicButton.querySelector('i').classList.add('fa-volume-up');
        toggleMusicButton.classList.add('playing');
    }).catch(error => {
        isMusicPlaying = false;
        toggleMusicButton.querySelector('i').classList.remove('fa-volume-up');
        toggleMusicButton.querySelector('i').classList.add('fa-volume-mute');
        toggleMusicButton.classList.remove('playing');
        console.log('Autoplay bị chặn, người dùng cần click để bật nhạc:', error);
    });

    toggleMusicButton.addEventListener('click', function() {
        if (isMusicPlaying) {
            bgMusic.pause();
            toggleMusicButton.querySelector('i').classList.remove('fa-volume-up');
            toggleMusicButton.querySelector('i').classList.add('fa-volume-mute');
            toggleMusicButton.classList.remove('playing');
        } else {
            bgMusic.play();
            toggleMusicButton.querySelector('i').classList.remove('fa-volume-mute');
            toggleMusicButton.querySelector('i').classList.add('fa-volume-up');
            toggleMusicButton.classList.add('playing');
        }
        isMusicPlaying = !isMusicPlaying; // Đảo ngược trạng thái
    });

});