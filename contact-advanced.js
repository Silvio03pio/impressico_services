// Advanced Contact Form Handling
document.addEventListener('DOMContentLoaded', function() {
    const advancedContactForm = document.getElementById('advanced-contact-form');
    
    if (advancedContactForm) {
        advancedContactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            if (validateAdvancedForm()) {
                // Show loading state
                const submitButton = advancedContactForm.querySelector('.submit-form-button');
                const originalText = submitButton.querySelector('.button-text').textContent;
                submitButton.querySelector('.button-text').textContent = 'Invio in corso...';
                submitButton.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // Here you would typically send the form data to your server
                    showSuccessMessage();
                    advancedContactForm.reset();
                    
                    // Reset button
                    submitButton.querySelector('.button-text').textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }
        });
        
        // Add real-time validation
        const requiredFields = advancedContactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(this);
            });
        });
    }
    
    function validateAdvancedForm() {
        let isValid = true;
        const requiredFields = advancedContactForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldGroup = field.closest('.form-field-group');
        
        // Remove existing error states
        fieldGroup.classList.remove('field-error');
        const existingError = fieldGroup.querySelector('.field-error-message');
        if (existingError) {
            existingError.remove();
        }
        
        if (field.hasAttribute('required') && !value) {
            showFieldError(fieldGroup, 'Questo campo è obbligatorio');
            return false;
        }
        
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(fieldGroup, 'Inserisci un indirizzo email valido');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(fieldGroup, message) {
        fieldGroup.classList.add('field-error');
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#e10600';
        errorElement.style.fontSize = '0.85rem';
        errorElement.style.marginTop = '5px';
        fieldGroup.appendChild(errorElement);
    }
    
    function showSuccessMessage() {
        // Create success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success-message';
        successMessage.innerHTML = `
            <div style="
                background: #d4edda;
                color: #155724;
                padding: 20px;
                border-radius: 10px;
                border: 1px solid #c3e6cb;
                text-align: center;
                margin-bottom: 20px;
            ">
                <h4 style="margin: 0 0 10px 0; color: #155724;">✓ Messaggio Inviato con Successo!</h4>
                <p style="margin: 0; opacity: 0.8;">Ti ricontatteremo entro 24 ore lavorative. Grazie per averci contattato!</p>
            </div>
        `;
        
        advancedContactForm.insertBefore(successMessage, advancedContactForm.firstChild);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
});