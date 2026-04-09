document.addEventListener('DOMContentLoaded', function() {
    // This function shows a beautiful popup message on the page (not an alert)
    function showElegantMessage(message, icon) {
    
        const existingPopup = document.querySelector('.elegant-popup');
        if (existingPopup) {
            existingPopup.remove();
        }
        
        // Creates the popup element
        const popup = document.createElement('div');
        popup.className = 'elegant-popup';
        popup.style.position = 'fixed';
        popup.style.top = '50%';
        popup.style.left = '50%';
        popup.style.transform = 'translate(-50%, -50%)';
        popup.style.backgroundColor = '#415132';  
        popup.style.color = '#f5f0e0';  
        popup.style.padding = '25px 35px';
        popup.style.borderRadius = '12px';
        popup.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        popup.style.zIndex = '2000';
        popup.style.textAlign = 'center';
        popup.style.fontFamily = "'Times New Roman', serif";
        popup.style.minWidth = '280px';
        popup.style.maxWidth = '400px';
        popup.style.border = '1px solid #556b2f';
        popup.style.animation = 'fadeInPopup 0.3s ease';
        
        // Adds icon
        const iconSpan = document.createElement('div');
        iconSpan.style.fontSize = '40px';
        iconSpan.style.marginBottom = '15px';
        iconSpan.innerHTML = icon;
        
        // Adds message
        const messageSpan = document.createElement('div');
        messageSpan.style.fontSize = '16px';
        messageSpan.style.lineHeight = '1.5';
        messageSpan.innerHTML = message;
        
        // Adds close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.style.position = 'absolute';
        closeBtn.style.top = '10px';
        closeBtn.style.right = '15px';
        closeBtn.style.backgroundColor = 'transparent';
        closeBtn.style.border = 'none';
        closeBtn.style.color = '#f5f0e0';
        closeBtn.style.fontSize = '18px';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.fontWeight = 'bold';
        
        closeBtn.addEventListener('mouseenter', function() {
            this.style.color = '#d4e6c3';
        });
        closeBtn.addEventListener('mouseleave', function() {
            this.style.color = '#f5f0e0';
        });
        
        // Adds overlay background
        const overlay = document.createElement('div');
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
        overlay.style.zIndex = '1999';
        overlay.id = 'popup-overlay';
        
        // Closes popup function
        function closePopup() {
            popup.style.animation = 'fadeOutPopup 0.3s ease';
            setTimeout(function() {
                if (popup) popup.remove();
                if (overlay) overlay.remove();
            }, 300);
        }
        
        // Adds close button functionality
        closeBtn.addEventListener('click', closePopup);
        overlay.addEventListener('click', closePopup);
        
        // Auto close after 5 seconds
        setTimeout(closePopup, 5000);
        
        // Add everything to the page
        popup.appendChild(closeBtn);
        popup.appendChild(iconSpan);
        popup.appendChild(messageSpan);
        document.body.appendChild(overlay);
        document.body.appendChild(popup);
        
        // Adds CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInPopup {
                from {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
            }
            @keyframes fadeOutPopup {
                from {
                    opacity: 1;
                    transform: translate(-50%, -50%) scale(1);
                }
                to {
                    opacity: 0;
                    transform: translate(-50%, -50%) scale(0.9);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Finds the name input field
    const nameInput = document.querySelector('input[placeholder="Name"]');
    
    if (nameInput !== null) {
        // Show popups only once when user clicks on the name field
        let popupShown = false;
        
        nameInput.addEventListener('focus', function() {
            if (!popupShown) {
                showElegantMessage("Hi there! 👋\n\nPlease fill in your details and we'll get back to you as soon as possible!", "🍝");
                popupShown = true;
            }
        });
    }
    
    // Finds the form on the page
    const form = document.querySelector('form');
    
    if (form !== null) {
        // When the form is submitted
        form.addEventListener('submit', function(event) {
            // Stop the form from actually sending (since no backend yet)
            event.preventDefault();
            
            // Get the values the user typed
            const nameField = document.querySelector('input[placeholder="Name"]');
            const emailField = document.querySelector('input[placeholder="Email"]');
            const messageField = document.querySelector('textarea[placeholder="Message"]');
            
            const name = nameField.value;
            const email = emailField.value;
            const message = messageField.value;
            
            // Check if all fields are filled
            if (name === "" || email === "" || message === "") {
                showElegantMessage("⚠️ Please fill in all fields before sending!", "📝");
            } else {
                // Show success message
                showElegantMessage("✅ Thank you " + name + "!\n\nYour message has been sent. We'll get back to you soon!", "🍷");
                
                // Clear the form
                nameField.value = "";
                emailField.value = "";
                messageField.value = "";
            }
        });
    }
    
    // Create a button that takes you back to the top of the page
    const topButton = document.createElement('button');
    topButton.innerHTML = '↑ Top';
    topButton.style.position = 'fixed';
    topButton.style.bottom = '20px';
    topButton.style.right = '20px';
    topButton.style.padding = '12px 18px';
    topButton.style.backgroundColor = '#556b2f';
    topButton.style.color = 'white';
    topButton.style.fontSize = '16px';
    topButton.style.fontWeight = 'bold';
    topButton.style.border = 'none';
    topButton.style.borderRadius = '50px';
    topButton.style.cursor = 'pointer';
    topButton.style.opacity = '0';
    topButton.style.transition = 'opacity 0.3s';
    topButton.style.zIndex = '1000';
    topButton.style.fontFamily = "'Times New Roman', serif";
    
    document.body.appendChild(topButton);
    
    // Show button when scrolling down
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            topButton.style.opacity = '1';
        } else {
            topButton.style.opacity = '0';
        }
    });
    
    // Scroll to top when clicked
    topButton.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Make the contact info cards interactive when clicked 
    
    // Find all cards
    const cards = document.querySelectorAll('.card');
    
    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        
        // Add a subtle hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.transition = 'transform 0.3s';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        // Make cards clickable based on their content
        const cardText = card.innerText;
        
        if (cardText.includes('Address:')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                showElegantMessage("📍 123 Long Street, Cape Town\n\nCome visit us at our beautiful location!", "🏛️");
            });
        }
        
        if (cardText.includes('Phone:')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                showElegantMessage("📞 +27 21 123 4567\n\nCall us for reservations or any inquiries!", "📞");
            });
        }
        
        if (cardText.includes('Email:')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                showElegantMessage("📧 info@4theballers.co.za\n\nSend us an email and we'll respond within 24 hours!", "✉️");
            });
        }
        
        if (cardText.includes('Hours:')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                showElegantMessage("🕒 Opening Hours:\n\nMonday - Thursday: 08:00am - 10:30pm\nFriday - Sunday: 08:00am - 12:00am\nHolidays: 08:00am - 05:00pm", "⏰");
            });
        }
        
        if (cardText.includes('Stay Connected') || cardText.includes('Instagram') || cardText.includes('X')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                showElegantMessage("📱 Follow us on Social Media!\n\nInstagram: @4theballers\nX (Twitter): @4theballers\n\nStay updated with our latest news and special offers!", "📱");
            });
        }
        
        if (cardText.includes('Get In Touch')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                showElegantMessage("We'd love to hear from you! Fill out the form or contact us directly.", "💬");
            });
        }
        
        if (cardText.includes('Send Us a Message')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                showElegantMessage("Fill out the form with your name, email, and message. We'll respond quickly!", "📝");
            });
        }
        
        if (cardText.includes('Find Us')) {
            card.style.cursor = 'pointer';
            card.addEventListener('click', function() {
                showElegantMessage("📍 We're at 123 Long Street, Cape Town. Use the map above for directions!", "🗺️");
            });
        }
    }
    
    
    // UPDATE YEAR IN FOOTER 
    const footer = document.querySelector('footer');
    if (footer) {
        const currentYear = new Date().getFullYear();
        const footerText = footer.querySelector('p');
        if (footerText) {
            footerText.innerHTML = 'Copyright For The Ballers. ' + currentYear;
        }
    }
    
    console.log('Contact page JavaScript loaded! Popup appears when clicking Name field.');
});