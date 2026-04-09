document.addEventListener("DOMContentLoaded", function() {
    
    console.log("Recipe page loaded successfully!");
    
    //PRINT BUTTONS
    const recipeTitles = document.querySelectorAll('h3');
    
    recipeTitles.forEach((title, idx) => {
        const printBtn = document.createElement('button');
        printBtn.innerHTML = '🖨️ Print Recipe';
        printBtn.className = 'print-recipe-btn';
        printBtn.style.cssText = `
            margin: 10px 0 15px 25px;
            padding: 8px 20px;
            background: #556b2f;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
            font-family: Arial, sans-serif;
            transition: all 0.2s ease;
        `;
        
        printBtn.addEventListener('mouseenter', () => {
            printBtn.style.background = '#2E8857';
        });
        printBtn.addEventListener('mouseleave', () => {
            printBtn.style.background = '#556b2f';
        });
        
        title.insertAdjacentElement('afterend', printBtn);
        
        printBtn.addEventListener('click', () => {
            let next = title.nextElementSibling;
            while (next && next.tagName !== 'H4') {
                next = next.nextElementSibling;
            }
            const ingredientsTitle = next;
            const ingredientsList = ingredientsTitle.nextElementSibling;
            const instructionsTitle = ingredientsList.nextElementSibling;
            const instructionsList = instructionsTitle.nextElementSibling;
            
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <html>
                <head><title>${title.textContent}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
                    h1 { color: #2E8857; }
                    ul, ol { margin: 15px 0; }
                    li { margin: 8px 0; }
                    @media print { button { display: none; } }
                </style>
                </head>
                <body>
                    <h1>${title.textContent}</h1>
                    ${ingredientsTitle.outerHTML}
                    ${ingredientsList.outerHTML}
                    ${instructionsTitle.outerHTML}
                    ${instructionsList.outerHTML}
                    <p style="margin-top: 40px;">From The Ballers Recipe Book</p>
                </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        });
    });
    
    //SEARCH BAR
    const searchCard = document.createElement('div');
    searchCard.className = 'search-container';
    searchCard.style.cssText = `
        margin: 20px auto;
        padding: 20px;
        background: #415132;
        border-radius: 10px;
        text-align: center;
        max-width: 600px;
        border: 1px solid #556b2f;
    `;
    
    searchCard.innerHTML = `
        <span style="font-size: 1.2rem; margin-right: 15px; color: beige;">🔍</span>
        <input type="text" id="recipeSearch" placeholder="Find by ingredient..." style="
            padding: 10px 18px;
            width: 250px;
            border: 1px solid #556b2f;
            border-radius: 5px;
            font-size: 14px;
            outline: none;
            background: #dee6de;
            color: #333;
        ">
        <button id="searchBtn" style="
            padding: 10px 22px;
            margin-left: 10px;
            background: #556b2f;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
            font-family: Arial, sans-serif;
        ">Search</button>
        <button id="clearBtn" style="
            padding: 10px 22px;
            margin-left: 8px;
            background: #8B7355;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-weight: 500;
            font-family: Arial, sans-serif;
        ">Clear</button>
        <p id="searchResultMsg" style="margin-top: 12px; font-size: 0.85rem; color: beige; font-style: italic;"></p>
    `;
    
    const nav = document.querySelector('nav');
    if (nav) {
        nav.insertAdjacentElement('afterend', searchCard);
    }
    
    const searchInput = document.getElementById('recipeSearch');
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearBtn');
    const resultMsg = document.getElementById('searchResultMsg');
    
    function highlightText(term) {
        document.querySelectorAll('mark').forEach(el => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        });
        
        const allItems = document.querySelectorAll('ul li, ol li');
        allItems.forEach(item => {
            const text = item.innerHTML;
            const regex = new RegExp(`(${term})`, 'gi');
            if (text.toLowerCase().includes(term.toLowerCase())) {
                item.innerHTML = text.replace(regex, `<mark style="background: #fdf4c2; padding: 2px 6px; border-radius: 5px; color: #5c4a1e; font-weight: bold;">$1</mark>`);
            }
        });
    }
    
    function removeHighlights() {
        const highlighted = document.querySelectorAll('mark');
        highlighted.forEach(mark => {
            const parent = mark.parentNode;
            parent.replaceChild(document.createTextNode(mark.textContent), mark);
            parent.normalize();
        });
    }
    
    function searchRecipe() {
        const term = searchInput.value.trim().toLowerCase();
        if (!term) {
            resultMsg.innerHTML = '🌸 Type an ingredient like "lemon", "garlic", or "butter"';
            return;
        }
        
        const found = [];
        document.querySelectorAll('ul').forEach(ul => {
            if (ul.closest('.dropdown')) return;
            if (ul.innerText.toLowerCase().includes(term)) {
                let title = ul.previousElementSibling;
                while (title && title.tagName !== 'H3') title = title.previousElementSibling;
                if (title) found.push(title.textContent);
            }
        });
        
        if (found.length) {
            resultMsg.innerHTML = `✨ Found "${term}" in: ${found.join(' • ')}`;
            resultMsg.style.color = '#d4e6b0';
            highlightText(term);
        } else {
            resultMsg.innerHTML = `🍽️ No recipes with "${term}". Try "lemon", "shrimp", or "garlic"!`;
            resultMsg.style.color = '#e8c9a0';
        }
    }
    
    searchBtn.addEventListener('click', searchRecipe);
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        resultMsg.innerHTML = '';
        removeHighlights();
    });
    searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') searchRecipe(); });
    
    // COOKING TIPS (Bottom-Right Popup) 
    const tips = [
        "💡 Don't overmix pancake batter — lumps mean fluffy pancakes!",
        "💡 Pat shrimp completely dry before cooking for a perfect sear.",
        "💡 Toast curry powder for 30 seconds — it unlocks deep flavor.",
        "💡 Keep cauliflower steaks 1-inch thick so they stay intact.",
        "💡 Use room temperature eggs for a taller, airier German pancake."
    ];
    
    // Function to show a toast message at bottom-right corner
    function showToast(message) {
        // Remove any existing toast first
        const existingToast = document.querySelector('.cooking-toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'cooking-toast';
        toast.innerHTML = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #2d6a4f;
            color: #dee6de;
            padding: 14px 24px;
            border-radius: 12px;
            font-size: 14px;
            font-family: Arial, sans-serif;
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: slideInFromRight 0.3s ease;
            border-left: 4px solid #FFD700;
            max-width: 300px;
        `;
        
        if (!document.querySelector('#toast-animation-style')) {
            const animationStyle = document.createElement('style');
            animationStyle.id = 'toast-animation-style';
            animationStyle.textContent = `
                @keyframes slideInFromRight {
                    from {
                        transform: translateX(100px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes fadeOut {
                    from {
                        opacity: 1;
                        transform: translateX(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateX(100px);
                        visibility: hidden;
                    }
                }
            `;
            document.head.appendChild(animationStyle);
        }
        
        document.body.appendChild(toast);
        
        // Auto-remove after 3.5 seconds with fade out
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 3500);
    }
    
    recipeTitles.forEach((title, idx) => {
        title.style.cursor = 'pointer';
        title.style.transition = 'all 0.2s';
        
        title.addEventListener('mouseenter', () => {
            title.style.color = '#d4e6b0';
            title.style.transform = 'translateX(5px)';
        });
        title.addEventListener('mouseleave', () => {
            title.style.color = '';
            title.style.transform = 'translateX(0)';
        });
        
        title.addEventListener('click', () => {
            showToast(tips[idx % tips.length]);
        });
    });
    
    // WELCOME TOAST (Bottom-Right)
    setTimeout(() => {
        const welcomeToast = document.createElement('div');
        welcomeToast.className = 'welcome-toast';
        welcomeToast.innerHTML = '🍳 Welcome! Click any recipe title for a cooking tip.';
        welcomeToast.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #2d6a4f;
            color: #dee6de;
            padding: 14px 24px;
            border-radius: 12px;
            font-size: 14px;
            font-family: Arial, sans-serif;
            box-shadow: 0 8px 20px rgba(0,0,0,0.3);
            z-index: 9999;
            animation: slideInFromRight 0.3s ease;
            border-left: 4px solid #FFD700;
        `;
        
        document.body.appendChild(welcomeToast);
        
        setTimeout(() => {
            welcomeToast.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                if (welcomeToast.parentNode) {
                    welcomeToast.remove();
                }
            }, 300);
        }, 4500);
    }, 500);
    
    console.log("Recipe page ready! Click any recipe title for cooking tips (popup appears at bottom-right)");
}); 