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
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="memberModalLabel">${name}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
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
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(el => {
        setInterval(() => {
            el.classList.toggle('glitch-active');
        }, 2000); // Reduced to 2s for smoother effect
    });
}