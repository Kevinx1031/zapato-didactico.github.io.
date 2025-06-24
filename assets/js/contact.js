document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const loadingSpinner = document.getElementById('loading-spinner');
    const submitText = document.getElementById('submit-text');
    const successMessage = document.getElementById('form-success');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validación
        if (!validateForm()) return;

        // Mostrar spinner
        submitText.textContent = "Enviando...";
        loadingSpinner.style.display = 'block';

        // Simular envío (reemplaza con tu lógica real)
        try {
            // Ejemplo con Formspree (https://formspree.io/)
            const formData = new FormData(contactForm);
            const response = await fetch('https://formspree.io/f/your-form-id', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                showSuccess();
                contactForm.reset();
            } else {
                throw new Error('Error en el envío');
            }
        } catch (error) {
            alert("Error al enviar el mensaje. Por favor, inténtalo de nuevo.");
            console.error(error);
        } finally {
            submitText.textContent = "Enviar mensaje";
            loadingSpinner.style.display = 'none';
        }
    });

    // Validación del formulario
    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        // Validar nombre
        if (name.value.trim() === '') {
            showError('name-error', 'Por favor ingresa tu nombre');
            isValid = false;
        } else {
            hideError('name-error');
        }

        // Validar email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            showError('email-error', 'Ingresa un correo válido');
            isValid = false;
        } else {
            hideError('email-error');
        }

        // Validar mensaje
        if (message.value.trim() === '') {
            showError('message-error', 'Por favor escribe un mensaje');
            isValid = false;
        } else {
            hideError('message-error');
        }

        return isValid;
    }

    function showError(id, message) {
        const element = document.getElementById(id);
        element.textContent = message;
        element.style.display = 'block';
    }

    function hideError(id) {
        const element = document.getElementById(id);
        element.style.display = 'none';
    }

    function showSuccess() {
        successMessage.style.display = 'flex';
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
});