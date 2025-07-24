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
    const nameRegex = /^[A-Za-z\s]{1,50}$/;
    return nameRegex.test(name);
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

        const submitName = document.getElementById('submitName');
        const nameInput = document.getElementById('nameInput');
        const nameError = document.getElementById('nameError');

        submitName.addEventListener('click', () => {
            const name = nameInput.value.trim();
            if (validateName(name)) {
                document.getElementById('salutation').textContent = `Hi ${name}, will you be my valentine? 💖`;
                nameModal.hide();
                nameError.style.display = 'none';
            } else {
                nameError.textContent = 'Please enter a valid name (letters and spaces only).';
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
        }, 3000);
    });
}