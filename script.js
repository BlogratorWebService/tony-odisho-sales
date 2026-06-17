document.addEventListener('DOMContentLoaded', () => {

    // --- Mobile Navigation Toggle ---
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('#nav-menu a');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Toggle hamburger icon animation
            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // --- Interactive Commission Calculator ---
    const salesSlider = document.getElementById('sales-slider');
    const salesDisplay = document.getElementById('sales-value-display');
    const rateResult = document.getElementById('rate-result');
    const monthlyResult = document.getElementById('monthly-result');
    const annualResult = document.getElementById('annual-result');
    const tierRows = document.querySelectorAll('.tier-row');

    function updateCalculator() {
        if (!salesSlider) return;

        const salesVolume = parseInt(salesSlider.value);
        let commissionRate = 0.25;

        // Determine rate based on volume tiers
        if (salesVolume <= 4000) {
            commissionRate = 0.25;
            highlightTier(0);
        } else if (salesVolume <= 8000) {
            commissionRate = 0.30;
            highlightTier(1);
        } else {
            commissionRate = 0.35;
            highlightTier(2);
        }

        // Calculate commissions
        const monthlyEarnings = salesVolume * commissionRate;
        const annualEarnings = monthlyEarnings * 12;

        // Display updates
        salesDisplay.textContent = `$${salesVolume.toLocaleString()}`;
        rateResult.textContent = `${commissionRate * 100}%`;
        monthlyResult.textContent = `$${monthlyEarnings.toLocaleString()}`;
        annualResult.textContent = `$${annualEarnings.toLocaleString()}`;
    }

    function highlightTier(index) {
        tierRows.forEach((row, idx) => {
            if (idx === index) {
                row.classList.add('active-tier');
            } else {
                row.classList.remove('active-tier');
            }
        });
    }

    if (salesSlider) {
        salesSlider.addEventListener('input', updateCalculator);
        // Initialize on page load
        updateCalculator();
    }

    // --- Form Submission Simulation ---
    const applyForm = document.getElementById('application-form');
    const successMsg = document.getElementById('form-success-msg');

    if (applyForm && successMsg) {
        applyForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Simulate sending data asynchronously
            const submitButton = applyForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.innerHTML = 'Submitting... <i class="fa-solid fa-spinner fa-spin"></i>';

            setTimeout(() => {
                // Fade out the form
                applyForm.style.transition = 'opacity 0.3s ease';
                applyForm.style.opacity = '0';
                
                setTimeout(() => {
                    applyForm.style.display = 'none';
                    successMsg.style.display = 'block';
                    successMsg.style.opacity = '0';
                    successMsg.style.transition = 'opacity 0.5s ease';
                    
                    // Trigger reflow to apply animation
                    successMsg.offsetHeight;
                    successMsg.style.opacity = '1';
                }, 300);

            }, 1500); // 1.5s simulated loading
        });
    }
});