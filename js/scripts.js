console.log('scripts.js loaded');
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded in scripts.js');
    // Navigation
    const navButtons = document.querySelectorAll('.nav-btn');
    const sections = document.querySelectorAll('.section-content');
    const calculatorCard = document.querySelector('.calculator-card');
    const wakeUpSection = document.getElementById('wake-up-section');
    const bedtimeSection = document.getElementById('bedtime-section');
    const resultsSection = document.getElementById('results');

    function showSection(sectionId) {
        // Hide all sections first
        sections.forEach(section => {
            section.style.display = 'none';
        });

        // Remove active class from all buttons
        navButtons.forEach(btn => {
            btn.classList.remove('active');
        });

        // Show selected section
        const selectedSection = document.getElementById(sectionId);
        if (selectedSection) {
            selectedSection.style.display = 'block';
        }

        // Add active class to clicked button
        const activeButton = document.querySelector(`[data-section="${sectionId}"]`);
        if (activeButton) {
            activeButton.classList.add('active');
        }

        // Handle calculator sections visibility
        if (sectionId === 'home') {
            if (wakeUpSection) wakeUpSection.style.display = 'block';
            if (bedtimeSection) bedtimeSection.style.display = 'block';
            if (resultsSection) resultsSection.classList.add('hidden');
        }

        // Show/hide calculator card based on section
        if (calculatorCard) {
            calculatorCard.style.display = sectionId === 'home' ? 'block' : 'none';
        }
    }

    // Add click handlers to navigation buttons
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.dataset.section;
            showSection(sectionId);
        });
    });

    // Show home section by default
    showSection('home');

    // Input validation
    document.getElementById('hours')?.addEventListener('input', function() {
        let value = parseInt(this.value);
        if (value < 1) this.value = 1;
        if (value > 12) this.value = 12;
    });

    document.getElementById('minutes')?.addEventListener('input', function() {
        let value = parseInt(this.value);
        if (value < 0) this.value = 0;
        if (value > 59) this.value = 59;
    });

    const hamburger = document.querySelector('.hamburger-menu');
    const navButtonsContainer = document.querySelector('.nav-buttons');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navButtonsContainer.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navButtonsContainer.contains(e.target)) {
            hamburger.classList.remove('active');
            navButtonsContainer.classList.remove('active');
        }
    });

    // Close menu when clicking a nav button
    navButtonsContainer.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navButtonsContainer.classList.remove('active');
        });
    });
});
