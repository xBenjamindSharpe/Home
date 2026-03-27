document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('bg-video');

    // 1. MOBILE AUTOPLAY FIX
    // Forces video to play on first user interaction to bypass browser restrictions
    const forcePlay = () => {
        if (video) {
            video.play().catch(error => console.log("Video play failed:", error));
            document.removeEventListener('touchstart', forcePlay);
        }
    };
    document.addEventListener('touchstart', forcePlay);

    // 2. TEXT SCRAMBLE EFFECT
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
            
            if(iteration >= originalText.length) {
                clearInterval(interval);
            }
            iteration += 1 / 3;
        }, 30); // Parenthesis fixed here
    };

    const header = document.querySelector('.glitch');
    if (header) scrambleText(header);

    // 3. GYRO-PARALLAX
    window.addEventListener('deviceorientation', (event) => {
        const x = event.beta; 
        const y = event.gamma; 

        const moveX = y / 2; 
        const moveY = (x - 45) / 2; 

        const grid = document.querySelector('.link-grid');
        if (grid) {
            grid.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    });
});
