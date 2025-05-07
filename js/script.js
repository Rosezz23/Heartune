// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple testimonial slider
    const testimonials = document.querySelectorAll('.testimonial');
    let currentTestimonial = 0;

    // Hide all testimonials except the first one
    for (let i = 1; i < testimonials.length; i++) {
        testimonials[i].style.display = 'none';
    }

    // Function to show next testimonial
    function showNextTestimonial() {
        testimonials[currentTestimonial].style.display = 'none';
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].style.display = 'block';
    }

    // Automatically rotate testimonials every 5 seconds
    if (testimonials.length > 1) {
        setInterval(showNextTestimonial, 5000);
    }

    // Add active class to current menu item
    const currentLocation = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        
        // Check if the current page matches the link href
        if (currentLocation.endsWith(linkPath)) {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
            link.classList.add('active');
        }
    });

    // Audio player enhancements for song pages
    const audioPlayer = document.querySelector('.audio-player');
    if (audioPlayer) {
        const audio = audioPlayer.querySelector('audio');
        const playBtn = audioPlayer.querySelector('.play-btn');
        const progressBar = audioPlayer.querySelector('.progress');
        const currentTime = audioPlayer.querySelector('.current-time');
        const duration = audioPlayer.querySelector('.duration');

        // Play/pause functionality
        if (playBtn && audio) {
            playBtn.addEventListener('click', function() {
                if (audio.paused) {
                    audio.play();
                    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                } else {
                    audio.pause();
                    playBtn.innerHTML = '<i class="fas fa-play"></i>';
                }
            });
        }

        // Update progress bar
        if (audio && progressBar) {
            audio.addEventListener('timeupdate', function() {
                const percent = (audio.currentTime / audio.duration) * 100;
                progressBar.style.width = percent + '%';
                
                // Update time displays
                if (currentTime) {
                    currentTime.textContent = formatTime(audio.currentTime);
                }
            });
        }

        // Set duration when metadata is loaded
        if (audio && duration) {
            audio.addEventListener('loadedmetadata', function() {
                duration.textContent = formatTime(audio.duration);
            });
        }

        // Format time in MM:SS
        function formatTime(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = Math.floor(seconds % 60);
            return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
        }
    }
});
