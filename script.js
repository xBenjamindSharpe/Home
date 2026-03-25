document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bg-video');
    const cards = document.querySelectorAll('.glass-card');

    // 1. MOBILE AUTOPLAY FIX
    // Sometimes mobile browsers pause video if "Low Power Mode" is on.
    // This force-starts it the moment the user touches the screen.
    const forcePlay = () => {
        video.play();
        document.removeEventListener('touchstart', forcePlay);
    };
    document.addEventListener('touchstart', forcePlay);


    // 2. TEXT SCRAMBLE EFFECT
    // Makes your "SYSTEM_ONLINE" header look like it's decrypting.
    const scrambleText = (element) => {
        const originalText = element.innerText;
        const chars = "ABCDEF0123456789<>/-_";
        let iteration = 0;
        
        const interval = setInterval(() => {
            element.innerText = originalText
                .split("")
                .map((letter, index) => {
                    if(index < iteration) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");
            
            if(iteration >= originalText.length) clearInterval(interval);
            iteration += 1 / 3;
        }, 30;
    };

    const header = document.querySelector('.glitch');
    scrambleText(header);


    // 3. GYRO-PARALLAX (Optional - Tilt Effect)
    // If you're on a phone, tilting the phone moves the cards slightly.
    window.addEventListener('deviceorientation', (event) => {
        const x = event.beta;  // Forward/Back tilt
        const y = event.gamma; // Left/Right tilt

        // Gently shift the link container based on tilt
        const moveX = y / 2; 
        const moveY = (x - 45) / 2; // Adjusting for natural holding angle

        document.querySelector('.link-grid').style.transform = 
            `translate(${moveX}px, ${moveY}px)`;
    });
});
