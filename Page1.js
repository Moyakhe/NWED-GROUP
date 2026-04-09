document.addEventListener("DOMContentLoaded", function() {
   
    // Makes all anchor links scroll smoothly instead of jumping
    const allLinks = document.querySelectorAll('a[href^="#"]');
    
    allLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
    
            if (targetId !== "#" && targetId !== "#/") {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    e.preventDefault(); // Stop default jump behavior
                    
                    targetElement.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });
    
    // For touch devices - makes dropdown work on click
    const navItem = document.querySelector('nav ul li');
    
    if (navItem) {
        navItem.addEventListener("click", function(e) {
            const dropdown = this.querySelector('.dropdown');
            if (dropdown && window.innerWidth <= 768) {
                e.stopPropagation();
                // Close any open dropdowns first
                const allDropdowns = document.querySelectorAll('.dropdown');
                allDropdowns.forEach(d => {
                    if (d !== dropdown && d.style.display === "block") {
                        d.style.display = "none";
                    }
                });
                // Toggle current dropdown
                if (dropdown.style.display === "block") {
                    dropdown.style.display = "none";
                } else {
                    dropdown.style.display = "block";
                }
            }
        });
    }
    
    // Close dropdown when clicking elsewhere (for mobile)
    document.addEventListener("click", function() {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            if (window.innerWidth <= 768) {
                dropdown.style.display = "none";
            }
        });
    });
    
    // Highlights the current section in the navigation as you scroll
    const sections = document.querySelectorAll('.section');
    const menuItems = document.querySelectorAll('nav a');
    
    window.addEventListener("scroll", function() {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });
        
        menuItems.forEach(link => {
            link.style.background = "";
            link.style.color = "";
            
            const href = link.getAttribute("href");
            if (href && href.includes(current)) {
                link.style.background = "#556b2f";
                link.style.borderRadius = "5px";
            }
        });
    })

    // Shows a friendly message when buttons are clicked
    const allButtons = document.querySelectorAll('.btn');
    
    allButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            const buttonText = this.innerText;
            
            if (buttonText === "View Menu") {
                console.log("Menu button clicked - navigating to menu page");
                // You can add custom behavior here if needed
            } else if (buttonText === "Learn More") {
                console.log("About button clicked");
            } else if (buttonText === "Get in Touch") {
                console.log("Contact button clicked");
            }
        });
    });
    console.log("Welcome to FOR THE BALLERS website!");
});

// Adds a fade-in effect when elements come into view
function checkVisibility() {
    const elements = document.querySelectorAll('.section, .btn');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
}

// Add fade-in styles dynamically
const style = document.createElement('style');
style.textContent = `
    .section, .btn {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
`;
document.head.appendChild(style);

// Check visibility on scroll and load
window.addEventListener("scroll", checkVisibility);
window.addEventListener("load", checkVisibility);