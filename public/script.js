const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = Object.fromEntries(
        new FormData(form).entries()
    );

    status.textContent = 'Ihre Anfrage wird gesendet...';

    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message);
        }

        status.textContent = 'Vielen Dank! Ihre Anfrage wurde erfolgreich gesendet.';
        form.reset();

    } catch (error) {
        status.textContent = 'Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.';
        console.error(error);
    }
});