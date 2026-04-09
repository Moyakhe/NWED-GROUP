document.addEventListener("DOMContentLoaded", function() {
    
    console.log("Page loaded successfully!");
    
    //Price Highlighter (turns gold on hover)
    var allPrices = document.querySelectorAll('.price');
    
    for (var i = 0; i < allPrices.length; i++) {
        allPrices[i].addEventListener('mouseenter', function() {
            this.style.color = '#FFD700';
            this.style.fontSize = '20px';
        });
        
        allPrices[i].addEventListener('mouseleave', function() {
            this.style.color = '';
            this.style.fontSize = '';
        });
    }
    
    // Enhanced Back to Top Button - Matching the Jump to buttons style
    var backToTop = document.createElement('button');
    backToTop.innerHTML = '↑ Top';
    backToTop.style.position = 'fixed';
    backToTop.style.bottom = '20px';
    backToTop.style.right = '20px';
    backToTop.style.background = 'transparent';
    backToTop.style.color = '#556b2f';
    backToTop.style.border = '1px solid rgba(85, 107, 47, 0.3)';
    backToTop.style.padding = '6px 14px';
    backToTop.style.borderRadius = '25px';
    backToTop.style.cursor = 'pointer';
    backToTop.style.display = 'none';
    backToTop.style.zIndex = '1000';
    backToTop.style.fontSize = '13px';
    backToTop.style.fontWeight = '500';
    backToTop.style.fontFamily = 'inherit';
    backToTop.style.transition = 'all 0.25s ease';
    backToTop.style.whiteSpace = 'nowrap';
    backToTop.style.backdropFilter = 'blur(5px)';
    
    // Hover effect matching the Jump to buttons
    backToTop.addEventListener('mouseenter', function() {
        this.style.background = '#556b2f';
        this.style.color = 'white';
        this.style.borderColor = '#556b2f';
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 2px 8px rgba(85, 107, 47, 0.3)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.background = 'transparent';
        this.style.color = '#556b2f';
        this.style.borderColor = 'rgba(85, 107, 47, 0.3)';
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
    });
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Check if we're on the main menu page
    var hasMultiplePages = document.querySelectorAll('.menu-page').length > 1;
    
    var categories = [
        { name: 'Breakfast', page: 'breakfast.html' },
        { name: 'Seafood', page: 'Seafood.html' },
        { name: 'Indian Food', page: 'Indian.html' },
        { name: 'Vegetarian', page: 'vegetarian.html' },
        { name: 'Dessert', page: 'Dessert.html' },
        { name: 'Non-Alcoholic Beverages', page: 'alcoholic.html' },
        { name: 'Alcoholic Beverages', page: 'NonAlcoholic.html' }
    ];
    
    var navDiv = document.createElement('div');
    navDiv.style.textAlign = 'center';
    navDiv.style.margin = '20px auto';
    navDiv.style.padding = '10px 20px';
    navDiv.style.background = 'rgba(85, 107, 47, 0.1)';
    navDiv.style.borderRadius = '40px';
    navDiv.style.display = 'inline-block';
    navDiv.style.width = 'auto';
    navDiv.style.maxWidth = '90%';
    navDiv.style.backdropFilter = 'blur(5px)';
    
    // Make the nav container centered and horizontal
    var wrapperDiv = document.createElement('div');
    wrapperDiv.style.textAlign = 'center';
    wrapperDiv.style.margin = '20px 0';
    wrapperDiv.style.width = '100%';
    wrapperDiv.appendChild(navDiv);
    
    // Subtle "Jump to" text
    var jumpText = document.createElement('span');
    jumpText.innerHTML = '⌕ Jump to: ';
    jumpText.style.color = '#556b2f';
    jumpText.style.fontSize = '14px';
    jumpText.style.fontWeight = '500';
    jumpText.style.letterSpacing = '0.5px';
    jumpText.style.display = 'inline-block';
    jumpText.style.marginRight = '12px';
    jumpText.style.fontFamily = 'inherit';
    navDiv.appendChild(jumpText);
    
    for (var c = 0; c < categories.length; c++) {
        var btn = document.createElement('button');
        btn.innerHTML = categories[c].name;
        
        //button style
        btn.style.background = 'transparent';
        btn.style.color = '#ffffff';
        btn.style.border = '1px solid rgba(85, 107, 47, 0.3)';
        btn.style.padding = '6px 14px';
        btn.style.margin = '3px 4px';
        btn.style.borderRadius = '25px';
        btn.style.cursor = 'pointer';
        btn.style.fontSize = '13px';
        btn.style.fontWeight = '500';
        btn.style.fontFamily = 'inherit';
        btn.style.transition = 'all 0.25s ease';
        btn.style.whiteSpace = 'nowrap';
        
        // Hover effect
        btn.addEventListener('mouseenter', function() {
            this.style.background = '#556b2f';
            this.style.color = 'white';
            this.style.borderColor = '#ffffff';
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 2px 8px rgba(85, 107, 47, 0.3)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.background = 'transparent';
            this.style.color = '#ffffff';
            this.style.borderColor = 'rgba(254, 255, 251, 0.3)';
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
        
        btn.addEventListener('click', function(pageUrl, catName) {
            return function() {
                if (hasMultiplePages) {
                    // On main menu page - scroll to section
                    var pages = document.querySelectorAll('.menu-page');
                    for (var p = 0; p < pages.length; p++) {
                        var heading = pages[p].querySelector('h1');
                        if (heading && heading.innerHTML.indexOf(catName) !== -1) {
                            pages[p].scrollIntoView({ behavior: 'smooth', block: 'start' });
                            break;
                        }
                    }
                } else {
                    // On individual page - navigate to other page
                    window.location.href = pageUrl;
                }
            };
        }(categories[c].page, categories[c].name));
        
        navDiv.appendChild(btn);
    }
    
    // Insert navigation after the main nav
    var mainNav = document.querySelector('nav');
    if (mainNav) {
        mainNav.insertAdjacentElement('afterend', wrapperDiv);
    } else {
        var firstElement = document.body.firstChild;
        document.body.insertBefore(wrapperDiv, firstElement);
    }
    
    console.log("Navigation added. Mode:", hasMultiplePages ? "Main Menu (scroll)" : "Individual Page (navigate)");
});