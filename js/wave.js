// background.js
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('wave-background');
    const ctx = canvas.getContext('2d');
    
    // Configurações fixas das ondas
    const waveSettings = {
        lineCount: 30,
        amplitude: 10,
        frequency: 0.5,
        speed: 1,
        wavyness: 2,
        fuzz: 3,
        color: 'rgba(122, 156, 110, 0.3)'
    };
    
    let time = 0;
    let wavynessOffsets = [];
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    function updateOffsets(count) {
        wavynessOffsets = [];
        for (let i = 0; i < count; i++) {
            wavynessOffsets.push(Math.random() * 1000);
        }
    }
    
    function draw() {
        const { lineCount, amplitude, frequency, speed, wavyness, fuzz, color } = waveSettings;
        const spacing = canvas.height / (lineCount + 1);
        
        if (wavynessOffsets.length !== lineCount) {
            updateOffsets(lineCount);
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        
        for (let i = 0; i < lineCount; i++) {
            const yBase = spacing * (i + 1);
            const offset = wavynessOffsets[i];
            
            ctx.beginPath();
            for (let x = 0; x < canvas.width; x++) {
                const wave = Math.sin((x * 0.01 * frequency) + time + i * 0.2);
                const waveOffset = Math.sin((x * 0.005) + time * 1.5 + offset) * wavyness;
                const randomFuzz = (Math.random() - 0.5) * fuzz;
                
                const y = yBase + (wave + waveOffset) * amplitude + randomFuzz;
                
                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.stroke();
        }
        
        time += 0.01 * speed;
        requestAnimationFrame(draw);
    }
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    draw();
});