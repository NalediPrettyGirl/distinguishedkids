document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Reveal Animation Logic
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealOnScroll.observe(el));

    // 2. Parallax Effect for Hero Overlay
    window.addEventListener('scroll', () => {
        let scrollValue = window.scrollY;
        const heroContainer = document.querySelector('.hero-container');
        if (heroContainer) {
            heroContainer.style.transform = `translateY(${scrollValue * 0.15}px)`;
            heroContainer.style.opacity = 1 - (scrollValue / 800);
        }
    });

    // 3. Navigation Transition on Scroll
    const mainNav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            mainNav.style.padding = '8px 0';
            mainNav.style.boxShadow = '0 10px 40px rgba(0,0,0,0.1)';
        } else {
            mainNav.style.padding = '15px 0';
            mainNav.style.boxShadow = 'none';
        }
    });

    // 4. Mobile Menu Logic
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-active');
        });
    }

    // 5. Activity Modal Logic
    const activities = {
        arts: {
            title: 'Arts & Crafts',
            category: 'Creative Expression',
            description: 'Our arts and crafts program is designed to unleash every child\'s inner artist. Through painting, clay modeling, and mixed media projects, we help children develop fine motor skills and creative thinking.',
            main: 'img/art/WhatsApp_Image_2026-03-02_at_15.40.25.jpeg',
            others: [
                'img/art/WhatsApp_Image_2026-03-02_at_15.40.24.jpeg',
                'img/art/WhatsApp_Image_2026-03-02_at_15.40.25.jpeg'
            ]
        },
        story: {
            title: 'Storytime',
            category: 'Language & Literacy',
            description: 'Language comes alive in our storytime sessions. We use interactive books, finger puppets, and role-play to foster a lifelong love for reading and help children build robust vocabularies.',
            main: 'img/storytime/WhatsApp_Image_2026-03-02_at_15.40.23.jpeg',
            videos: [
                '<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2Freel%2F853950549588695%2F&show_text=false&width=267&t=0" width="267" height="476" style="border:none" scrolling="no" frameborder="0" allowfullscreen="true"></iframe>',
                '<iframe src="https://www.facebook.com/plugins/video.php?height=476&href=https%3A%2F%2Fwww.facebook.com%2F100064082071576%2Fvideos%2F194927252244589%2F&show_text=false&width=261&t=0" width="261" height="476" style="border:none" scrolling="no" frameborder="0" allowfullscreen="true"></iframe>'
            ],
            others: ['img/5.jpg']
        },
        music: {
            title: 'Music & Movement',
            category: 'Physical Development',
            description: 'From Zumba for kids to rhythmic play, our music and movement program helps children develop coordination, rhythm, and gross motor skills while burning off energy in the most fun way possible.',
            main: 'img/8.jpg',
            others: [
                'img/music/WhatsApp_Image_2026-03-02_at_15.40.23__1_.jpeg',
                'img/4.jpg'
            ]
        },
        dev: {
            title: 'Developmental Activities',
            category: 'Early STEM',
            description: 'We spark curiosity through hands-on discovery. Our developmental activities include simple science experiments, building with blocks, and problem-solving puzzles that challenge young minds.',
            main: 'img/10.jpg',
            others: [
                'img/development/WhatsApp_Image_2026-03-02_at_15.40.25__1_.jpeg',
                'img/development/WhatsApp_Image_2026-03-02_at_15.40.25__2_.jpeg',
                'img/development/WhatsApp_Image_2026-03-02_at_15.40.26.jpeg'
            ]
        },
        outdoor: {
            title: 'Outdoor Play',
            category: 'Nature & Health',
            description: 'Our safe and expansive outdoor space is a classroom without walls. Children enjoy nature walks, supervised play on age-appropriate equipment, and activities that connect them with the natural world.',
            main: 'img/outdoor/WhatsApp_Image_2026-03-02_at_15.40.27.jpeg',
            others: [
                'img/outdoor/WhatsApp_Image_2026-03-02_at_15.40.24__2_.jpeg',
                'img/outdoor/WhatsApp_Image_2026-03-02_at_15.40.26__2_.jpeg'
            ]
        },
        social: {
            title: 'Social Activities',
            category: 'Life Skills',
            description: 'Building confident future leaders starts with social interaction. We guide children through collaborative play, sharing exercises, and group projects that build empathy and communication skills.',
            main: 'img/2.jpg',
            others: [
                'img/social/WhatsApp_Image_2026-03-02_at_15.40.24__1_.jpeg',
                'img/social/WhatsApp_Image_2026-03-02_at_15.40.26__1_.jpeg',
                'img/01.jpg'
            ]
        }
    };

    const modal = document.getElementById('activity-modal');
    const triggers = document.querySelectorAll('.activity-trigger');
    const closeBtn = document.querySelector('.close-modal');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const actKey = trigger.getAttribute('data-activity');
            const data = activities[actKey];
            if (!data) return;

            document.getElementById('modal-main-img').src = data.main;
            document.getElementById('modal-category').innerText = data.category;
            document.getElementById('modal-title').innerText = data.title;
            document.getElementById('modal-desc').innerText = data.description;

            const mediaGrid = document.getElementById('modal-media-grid');
            mediaGrid.innerHTML = '';
            
            // Add videos if any - horizontally scrollable container
            if (data.videos && data.videos.length > 0) {
                const videoSwipeContainer = document.createElement('div');
                videoSwipeContainer.className = 'video-swipe-container';
                data.videos.forEach(vid => {
                    const vidWrapper = document.createElement('div');
                    vidWrapper.className = 'video-wrapper';
                    vidWrapper.innerHTML = vid;
                    videoSwipeContainer.appendChild(vidWrapper);
                });
                mediaGrid.appendChild(videoSwipeContainer);

                // Add swipe hint
                const swipeHint = document.createElement('div');
                swipeHint.className = 'swipe-hint';
                swipeHint.innerHTML = '&larr; Swipe to see more videos &rarr;';
                mediaGrid.appendChild(swipeHint);
            }

            // Add other images
            if (data.others && data.others.length > 0) {
                const imgGrid = document.createElement('div');
                imgGrid.className = 'image-grid';
                data.others.forEach(src => {
                    const img = document.createElement('img');
                    img.src = src;
                    imgGrid.appendChild(img);
                });
                mediaGrid.appendChild(imgGrid);
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Stop scroll
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'initial';
    });

    // Close on outside click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'initial';
        }
    });

    // Smooth Scroll for menu links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
            if (navLinks.classList.contains('mobile-active')) {
                navLinks.classList.remove('mobile-active');
            }
        });
    });

    // 6. Reviews Carousel and Form Logic
    const revTrack = document.querySelector('.reviews-track');
    let revSlides = revTrack ? Array.from(revTrack.children) : [];
    const reviewForm = document.getElementById('review-form');

    if (revTrack && revSlides.length > 0) {
        const revNextButton = document.querySelector('.review-btn.btn-right');
        const revPrevButton = document.querySelector('.review-btn.btn-left');
        let revSlideWidth = revSlides[0].getBoundingClientRect().width;

        const setRevSlidePosition = (slide, index) => {
            slide.style.left = revSlideWidth * index + 'px';
        };
        revSlides.forEach(setRevSlidePosition);

        const moveRevSlide = (track, currentSlide, targetSlide) => {
            if (!targetSlide) return;
            track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
        };

        revPrevButton.addEventListener('click', () => {
            const currentSlide = revTrack.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling || revSlides[revSlides.length - 1];
            moveRevSlide(revTrack, currentSlide, prevSlide);
        });

        revNextButton.addEventListener('click', () => {
            const currentSlide = revTrack.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling || revSlides[0];
            moveRevSlide(revTrack, currentSlide, nextSlide);
        });

        // Recalculate on resize
        window.addEventListener('resize', () => {
            revSlideWidth = revSlides[0].getBoundingClientRect().width;
            revSlides.forEach(setRevSlidePosition);
            const current = revTrack.querySelector('.current-slide');
            if(current) revTrack.style.transform = 'translateX(-' + current.style.left + ')';
        });

        // Form Submission
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = document.getElementById('reviewer-name').value;
                const text = document.getElementById('review-text').value;

                // Create new slide
                const newSlide = document.createElement('li');
                newSlide.className = 'review-slide';
                newSlide.innerHTML = `
                    <div class="review-card">
                        <div class="stars">
                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                        </div>
                        <p>"${text}"</p>
                        <h4>- ${name}</h4>
                    </div>
                `;

                // Add to track at the beginning
                revTrack.insertBefore(newSlide, revTrack.firstChild);
                
                // Update slides array and reset positions
                revSlides = Array.from(revTrack.children);
                revSlides.forEach(setRevSlidePosition);

                // Move to the new slide (which is now at index 0)
                const currentSlide = revTrack.querySelector('.current-slide');
                moveRevSlide(revTrack, currentSlide, newSlide);

                reviewForm.reset();
            });
        }
    }
});
