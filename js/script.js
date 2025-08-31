document.addEventListener('DOMContentLoaded', function() {
    // Efeito de digitação para o título
    const title = document.querySelector('header h1');
    const originalTitle = title.textContent;
    title.textContent = '';
    
    let i = 0;
    const typingEffect = setInterval(() => {
        if (i < originalTitle.length) {
            title.textContent += originalTitle.charAt(i);
            i++;
        } else {
            clearInterval(typingEffect);
            title.classList.add('pulse');
        }
    }, 100);

    

    // Scroll suave para links de navegação
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efeito hover para containers
    document.querySelectorAll('.container').forEach(container => {
        container.addEventListener('mouseenter', () => {
            container.style.transform = 'translateX(5px)';
        });
        container.addEventListener('mouseleave', () => {
            container.style.transform = 'translateX(0)';
        });
    });

    // Formulário de newsletter
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            alert(`Obrigado por assinar nossa newsletter! Um e-mail foi enviado para ${email}`);
            this.reset();
        });
    }

    // Carregar dados dinâmicos
    setTimeout(() => {
        const features = [
            "Sistema de Combate Tático",
            "Geração Procedural de Mapas",
            "Múltiplos Modelos de Mechas",
            "Sistema de Evolução de Cartas",
            "Eventos Narrativos Ramificados"
        ];
        
        const featuresList = document.createElement('ul');
        featuresList.className = 'features-list';
        featuresList.style.margin = '2rem 0';
        featuresList.style.paddingLeft = '2rem';
        
        features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = `⚡ ${feature}`;
            li.style.marginBottom = '0.8rem';
            li.style.color = 'var(--color-highlight)';
            li.style.fontFamily = 'var(--font-main)';
            featuresList.appendChild(li);
        });
        
        const systemSection = document.querySelector('#gameplay h2');
        if (systemSection) {
            systemSection.insertAdjacentElement('afterend', featuresList);
        }
    }, 1500);
});



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