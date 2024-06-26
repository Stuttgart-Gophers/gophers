document.addEventListener('DOMContentLoaded', () => {
    const leftPupil = document.querySelector('.left-eye .pupil');
    const rightPupil = document.querySelector('.right-eye .pupil');
    const centerGopher = document.querySelector('.center-gopher');
    const gophers = document.querySelector('.animation-container');

    const gopherImages = [
        'static/img/small-gopher-1.png',
        'static/img/small-gopher-2.png',
        'static/img/small-gopher-3.png',
        'static/img/small-gopher-4.png',
    ];

    // Create gopher elements once and store them in an array
    const gopherElements = gopherImages.map((gopher, index) => {
        const gopherElement = document.createElement('div');
        gopherElement.className = 'gopher small-gopher hidden';
        gopherElement.id = gopher.slice(0, -4);
        gopherElement.style.backgroundImage = `url(${gopher})`;
        gophers.appendChild(gopherElement);
        return gopherElement;
    });

    function animateGophers() {
        let gopherCount = 0;
        gopherElements.forEach((gopher, index) => {
            const delay = index * 4000; // 4 seconds gap between each gopher appearance

            const animateGopher = () => {
                let randomEdge = Math.floor(Math.random() * 4);
                let startX, startY;
                let slideInAnimation, slideOutAnimation, flippedImage;

                const cornerThreshold = 100; // Pixels from the corner to avoid

                if (randomEdge === 0) { // Top
                    startX = Math.random() * (window.innerWidth - 2 * cornerThreshold) + cornerThreshold;
                    startY = -10; // Slightly above the viewport
                    flippedImage = 'rotate(180deg)';
                    slideInAnimation = 'slide-in-top 2s forwards';
                    slideOutAnimation = 'slide-out-top 2s 2s forwards';
                } else if (randomEdge === 1) { // Bottom
                    startX = Math.random() * (window.innerWidth - 2 * cornerThreshold) + cornerThreshold;
                    startY = window.innerHeight - 80; // Slightly below the viewport
                    slideInAnimation = 'slide-in-bottom 2s forwards';
                    slideOutAnimation = 'slide-out-bottom 2s 2s forwards';
                } else if (randomEdge === 2) { // Left
                    startX = -10; // Slightly left of the viewport
                    startY = Math.random() * (window.innerHeight - 2 * cornerThreshold) + cornerThreshold;
                    flippedImage = 'rotate(90deg)';
                    slideInAnimation = 'slide-in-left 2s forwards';
                    slideOutAnimation = 'slide-out-left 2s 2s forwards';
                } else { // Right
                    startX = window.innerWidth - 80; // Slightly right of the viewport
                    startY = Math.random() * (window.innerHeight - 2 * cornerThreshold) + cornerThreshold;
                    flippedImage = 'rotate(270deg)';
                    slideInAnimation = 'slide-in-right 2s forwards';
                    slideOutAnimation = 'slide-out-right 2s 2s forwards';
                }

                gopher.style.left = `${startX}px`;
                gopher.style.top = `${startY}px`;
                gopher.style.display = 'block';
                gopher.style.transform = flippedImage;
                gopher.style.animation = slideInAnimation;

                
                // Hide the gopher after the slide out animation
                setTimeout(() => {
                    // Move the pupils to look at the gopher
                    movePupils(gopher);
                    gopher.style.animation = slideOutAnimation;
                    setTimeout(() => {
                        gopher.style.transform = 'rotate(0)';
                        gopher.style.display = 'none';
                        gopherCount++;
                        if (gopherCount === gopherElements.length) {
                            resetPupils();
                            // All gophers have finished their animations
                            setTimeout(() => {
                                gopherCount = 0;
                                animateGophers(); // Restart the animation after 5 seconds
                            }, 5000); // 5 seconds pause before restarting the animations
                        }
                        // Reset pupils to center
                    }, 4000); // 2s for slide-out + 2s delay
                }, 2000); // 2s for slide-in
            };

            setTimeout(animateGopher, delay);
        });
    }

    function movePupils(target) {
        const targetRect = target.getBoundingClientRect();
        const centerRect = centerGopher.getBoundingClientRect();

        const targetX = targetRect.left + targetRect.width / 2;
        const targetY = targetRect.top + targetRect.height / 2;

        const centerX = centerRect.left + centerRect.width / 2;
        const centerY = centerRect.top + centerRect.height / 2;

        const angle = Math.atan2(targetY - centerY, targetX - centerX);
        const pupilDistance = 15; // Adjust this value for appropriate pupil movement

        const pupilX = pupilDistance * Math.cos(angle);
        const pupilY = pupilDistance * Math.sin(angle);

        leftPupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
        rightPupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
    }

    function resetPupils() {
        leftPupil.style.transform = `translate(0px, 0px)`;
        rightPupil.style.transform = `translate(0px, 0px)`;
    }

    animateGophers();
    
    document.addEventListener('scroll', () => {
        const container = document.querySelector('.center-gopher');
        const triggerPoint = window.innerHeight / 2; // Adjust trigger point as needed
    console.log('mda')
        if (window.scrollY > triggerPoint) {
            container.classList.add('top-left');
            container.classList.remove('center');
        } else {
            container.classList.add('center');
            container.classList.remove('top-left');
        }
    });
});

