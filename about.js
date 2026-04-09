document.addEventListener('DOMContentLoaded', function() {

    // Find all paragraphs inside the main content div
    const mainDiv = document.querySelector('center > div');
    if (mainDiv) {
        // Get all paragraphs inside the main div
        const allDivParagraphs = mainDiv.querySelectorAll('p');
        for (let i = 0; i < allDivParagraphs.length; i++) {
            allDivParagraphs[i].style.color = 'black';
            allDivParagraphs[i].style.fontSize = '16px';
        }
        
        
        const divHeadings = mainDiv.querySelectorAll('h2');
        for (let i = 0; i < divHeadings.length; i++) {
            divHeadings[i].style.color = 'black';
        }
    }
    
    const mainTitle = document.querySelector('center > h1');
    if (mainTitle) {
        mainTitle.style.color = 'black';
    }
    
    const disclaimer = document.querySelector('small');
    if (disclaimer) {
        disclaimer.style.color = 'black';
    }
    
    const footer = document.querySelector('footer p');
    if (footer) {
        footer.style.color = 'black';
    }

    // Finds the "Our Chefs" heading
    const headings = document.querySelectorAll('h2');
    let chefsHeading = null;
    
    for (let i = 0; i < headings.length; i++) {
        if (headings[i].innerText === 'Our Chefs') {
            chefsHeading = headings[i];
            break;
        }
    }
    
    if (chefsHeading !== null) {
        // Creates a button
        const factButton = document.createElement('button');
        factButton.innerHTML = 'Click for Chef Facts!';
        factButton.style.display = 'block';
        factButton.style.margin = '20px auto';
        factButton.style.padding = '12px 25px';
        factButton.style.backgroundColor = '#556b2f';
        factButton.style.color = 'white';
        factButton.style.fontSize = '18px';
        factButton.style.fontWeight = 'bold';
        factButton.style.border = 'none';
        factButton.style.borderRadius = '8px';
        factButton.style.cursor = 'pointer';
        
        // Creates a box to show the fact
        const factBox = document.createElement('div');
        factBox.style.marginTop = '15px';
        factBox.style.padding = '15px';
        factBox.style.backgroundColor = '#f5f0e0';
        factBox.style.color = '#333';
        factBox.style.fontSize = '16px';
        factBox.style.fontWeight = 'bold';
        factBox.style.borderLeft = '5px solid #556b2f';
        factBox.style.borderRadius = '5px';
        factBox.style.display = 'none';
        
        // Lists of fun facts
        const facts = [
            "🍝 Chef Gladys trained in France!",
            "👨‍🍳 Chef Alonso can cook for 200 people!",
            "🌿 Chef Thabang grows his own herbs!",
            "⭐ Our restaurant has 5 locations worldwide!",
            "🍕 The founder started cooking at age 19!"
        ];
        
        // Shows random fact when button is clicked
        factButton.addEventListener('click', function() {
            const randomIndex = Math.floor(Math.random() * facts.length);
            factBox.innerHTML = facts[randomIndex];
            factBox.style.display = 'block';
        });
        
        // Adds button and fact box to the page
        chefsHeading.insertAdjacentElement('afterend', factButton);
        factButton.insertAdjacentElement('afterend', factBox);
    }
    
    // Makes location paragraphs clickable
    const allParagraphs = document.querySelectorAll('p');
    
    for (let i = 0; i < allParagraphs.length; i++) {
        const paragraph = allParagraphs[i];
        const text = paragraph.innerText;
        
    
        if (text.includes(',') && (text.includes('Italy') || text.includes('USA') || 
            text.includes('France') || text.includes('Germany') || text.includes('Africa'))) {
            
            // Style to make it look clickable
            paragraph.style.cursor = 'pointer';
            paragraph.style.display = 'inline-block';
            paragraph.style.margin = '5px';
            paragraph.style.padding = '8px 15px';
            paragraph.style.backgroundColor = '#e8e0cc';
            paragraph.style.borderRadius = '25px';
            paragraph.style.fontWeight = 'bold';
            paragraph.style.color = 'black'; 
            
            // When clicked, show a message box below it
            paragraph.addEventListener('click', function() {
                // Remove any existing message box
                const oldBox = this.parentElement.querySelector('.location-message');
                if (oldBox) oldBox.remove();
                
                // Create new message box
                const messageBox = document.createElement('div');
                messageBox.className = 'location-message';
                messageBox.style.marginTop = '10px';
                messageBox.style.padding = '10px';
                messageBox.style.backgroundColor = '#556b2f';
                messageBox.style.color = 'white';
                messageBox.style.borderRadius = '8px';
                messageBox.style.fontSize = '14px';
                messageBox.innerHTML = '📍 Welcome to ' + this.innerText + '!';
                
                // Add message after the clicked location
                this.insertAdjacentElement('afterend', messageBox);
                
                // Make message disappear after 3 seconds
                setTimeout(function() {
                    messageBox.style.opacity = '0';
                    messageBox.style.transition = 'opacity 0.5s';
                    setTimeout(function() {
                        if (messageBox) messageBox.remove();
                    }, 500);
                }, 3000);
            });
        }
    }
    
    
    //BACK TO TOP BUTTON
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
    
    console.log('JavaScript loaded! 3 features added. Text color set to black for main content.');
});