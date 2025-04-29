console.log('contactForm.js loaded');
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded in contactForm.js');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    function showMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            setTimeout(() => {
                formMessage.className = 'form-message';
            }, 5000);
        }
    }

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            showMessage('Sending your message...', 'success');
            
            const formData = new FormData(this);
            const data = {};
            formData.forEach((value, key) => data[key] = value);
            
            fetch(this.action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showMessage('Thank you! Your message has been sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
                }
            })
            .catch(error => {
                showMessage('Sorry, there was an error sending your message. Please try again.', 'error');
                console.error('Form submission error:', error);
            });
        });
    }
});
