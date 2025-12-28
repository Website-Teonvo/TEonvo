// Handle option button clicks
document.querySelectorAll('.opt').forEach(button => {
    button.addEventListener('click', function() {
        const inputName = this.getAttribute('data-input');
        const inputValue = this.getAttribute('data-value');
        
        // Remove active class from siblings in the same group
        const parent = this.parentElement;
        parent.querySelectorAll('.opt').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Update hidden input value
        if (inputName) {
            document.getElementById(inputName).value = inputValue;
        }
    });
});

// Handle form submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    // Check if room type is selected
    const roomType = document.getElementById('room-type').value;
    const investment = document.getElementById('investment').value;
    
    if (!roomType) {
        e.preventDefault();
        alert('Please select a room type');
        return false;
    }
    
    if (!investment) {
        e.preventDefault();
        alert('Please select an investment consideration');
        return false;
    }
    
    // Form will submit normally to Formspree
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
});

// Optional: Handle Formspree response if you want to show a custom success message
// This requires Formspree AJAX submission instead of regular form submission
/*
contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const submitBtn = contactForm.querySelector('.submit-btn');
    
    // Validate selections
    if (!document.getElementById('room-type').value) {
        alert('Please select a room type');
        return;
    }
    if (!document.getElementById('investment').value) {
        alert('Please select an investment consideration');
        return;
    }
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('https://formspree.io/f/xanrdzao', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            alert('Thank you! Your message has been sent successfully.');
            contactForm.reset();
            // Remove active classes
            document.querySelectorAll('.opt.active').forEach(btn => {
                btn.classList.remove('active');
            });
        } else {
            alert('Oops! There was a problem submitting your form. Please try again.');
        }
    } catch (error) {
        alert('Oops! There was a problem submitting your form. Please try again.');
    } finally {
        submitBtn.textContent = 'Submit';
        submitBtn.disabled = false;
    }
});
*/