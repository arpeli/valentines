function updateImage(src) {
    const mainImage = document.getElementById('mainImage');
    if (mainImage) {
        mainImage.src = src;
        mainImage.onerror = () => {
            console.error('Failed to load image:', src);
            mainImage.src = 'images/fallback.jpg';
        };
    }
}

function validateName(name) {
    const nameRegex = /^[A-Za-z\s'-]{1,50}$/;
    return nameRegex.test(name);
}

function showMember(name, code, punchline) {
    const modal = new bootstrap.Modal(document.createElement('div'));
    modal._element.innerHTML = `
        <div class="modal fade" tabindex="-1" aria-labelledby="memberModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content" style="background: #1a1a1a; border: 2px solid #00ff88; box-shadow: 0 0 15px #00ff88;">
                    <div class="modal-header">
                        <h5 class="modal-title" style="font-family: 'Orbitron', sans-serif; color: #ff00ff; text-shadow: 0 0 5px #ff00ff;">${name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body" style="font-family: 'VT323', monospace; color: #00ffff;">
                        <p>Student Code: ${code}</p>
                        <p>Punchline: ${punchline}</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal._element);
    modal.show();
}

function submitContact() {
    const name = document.getElementById('contactName').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const nameError = document.getElementById('contactNameError');
    const messageError = document.getElementById('contactMessageError');

    nameError.style.display = 'none';
    messageError.style.display = 'none';

    let valid = true;
    if (!validateName(name)) {
        nameError.style.display = 'block';
        valid = false;
    }
    if (!message) {
        messageError.style.display = 'block';
        valid = false;
    }
    if (valid) {
        alert('Message sent! (Note: This is a demo alert, as no backend is implemented.)');
        document.getElementById('contactName').value = '';
        document.getElementById('contactMessage').value = '';
    }
}

// Matrix rain effect
function initMatrixRain() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(0);

    function draw() {
        ctx.fillStyle = 'rgba(10, 10, 35, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff88';
        ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 50);
    window.addEventListener('resize', () => {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    });
}

if (document.getElementById('mainContent')) {
    const yesButton = document.getElementById('yes');
    const noButton = document.getElementById('no');
    if (yesButton) {
        yesButton.addEventListener('click', () => updateImage('images/happy.gif'));
    }
    if (noButton) {
        noButton.addEventListener('click', () => updateImage('images/heartbreak.gif'));
    }

    window.addEventListener('load', () => {
        const nameModal = new bootstrap.Modal(document.getElementById('nameModal'), {
            keyboard: true,
            backdrop: 'static'
        });
        nameModal.show();
        const nameInput = document.getElementById('nameInput');
        nameInput.focus();
        document.getElementById('nameModal').addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                const focusable = document.getElementById('nameModal').querySelectorAll('input, button');
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        });

        const submitName = document.getElementById('submitName');
        const nameError = document.getElementById('nameError');
        submitName.addEventListener('click', () => {
            const name = nameInput.value.trim();
            if (validateName(name)) {
                document.getElementById('salutation').textContent = `Hi ${name}, will you be my valentine? 💖`;
                nameModal.hide();
                nameError.style.display = 'none';
            } else {
                nameError.textContent = 'Please enter a valid name (letters, spaces, hyphens, or apostrophes).';
                nameError.style.display = 'block';
            }
        });

        nameInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                submitName.click();
            }
        });
    });
}

if (document.querySelector('.hacker-main')) {
    console.log('About page loaded');
    initMatrixRain();
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(el => {
        setInterval(() => {
            el.classList.toggle('glitch-active');
        }, 1500); // Faster for more dynamic effect
    });

    const memberCards = document.querySelectorAll('.member-card');
    memberCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('glitch-active');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('glitch-active');
        });
    });
}