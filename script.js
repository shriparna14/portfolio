// Initialize application logic explicitly bypassing ES module handlers


// Initialize application logic directly since type="module" automatically defers execution

    const toggleBtn = document.getElementById('theme-toggle');
    const icon = document.getElementById('theme-icon');
    const htmlEl = document.documentElement;

    const currentTheme = localStorage.getItem('theme') || 'light';
    htmlEl.setAttribute('data-theme', currentTheme);
    // tailwind handles 'dark' class
    if (currentTheme === 'dark') htmlEl.classList.add('dark');
    updateIcon(currentTheme);

    toggleBtn.addEventListener('click', () => {
        const isDark = htmlEl.classList.contains('dark');
        const newTheme = isDark ? 'light' : 'dark';
        
        if (newTheme === 'dark') {
            htmlEl.classList.add('dark');
        } else {
            htmlEl.classList.remove('dark');
        }
        
        htmlEl.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateIcon(newTheme);
    });

    function updateIcon(theme) {
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }

    // 2. Typing Animation (Loop with Erase Effect)
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        const phrases = [
            "Full-Stack Developer | Problem Solver",
            "Aspiring Software Engineer",
            "Backend Enthusiast",
            "System Builder",
            "Tech Explorer"
        ];
        let pIdx = 0; let cIdx = 0; let isDeleting = false;
        
        function type() {
            const current = phrases[pIdx];
            if (isDeleting) {
                typewriterElement.textContent = current.substring(0, cIdx - 1);
                cIdx--;
            } else {
                typewriterElement.textContent = current.substring(0, cIdx + 1);
                cIdx++;
            }
            
            let speed = isDeleting ? 30 : 60; 
            if (!isDeleting && cIdx === current.length) { 
                speed = 2000; // Pause at end of word
                isDeleting = true; 
            } 
            else if (isDeleting && cIdx === 0) { 
                isDeleting = false; 
                pIdx = (pIdx + 1) % phrases.length; // Next phrase
                speed = 500; 
            }
            setTimeout(type, speed);
        }
        setTimeout(type, 1000);
    }



    // 4. Custom IntersectionObserver for Reveals (Replacement for ES Module Motion)
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll(".motion-reveal").forEach((el) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        
        // Add staggered delays based on classes if any exist
        if(el.classList.contains('delay-100')) el.style.transitionDelay = '100ms';
        if(el.classList.contains('delay-200')) el.style.transitionDelay = '200ms';
        if(el.classList.contains('delay-300')) el.style.transitionDelay = '300ms';
        
        revealObserver.observe(el);
    });

    // 5. Active Navbar Link highlighting
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });

    // 6. Contact Form EmailJS Integration
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');
    const formMessage = document.getElementById('form-message');

    if (contactForm && submitBtn && typeof emailjs !== 'undefined') {
        // Initialize EmailJS with Public Key (User ID)
        emailjs.init("xw5HrS017MdUZY71b"); 
        
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); // Prevent standard page refresh
            
            // UI Loading State Configuration
            const originalText = btnText.innerText;
            const originalIconClass = btnIcon.className;
            
            btnText.innerText = 'Sending...';
            btnIcon.className = 'fas fa-circle-notch fa-spin';
            submitBtn.disabled = true;
            
            // Clean previous messages
            formMessage.classList.add('hidden');
            formMessage.classList.remove('text-green-600', 'bg-green-50', 'dark:bg-green-900/20', 'text-red-600', 'bg-red-50', 'dark:bg-red-900/20', 'block');

            try {
                // Execute EmailJS send operation
                await emailjs.send('service_tvh07x8', 'template_qulas7b', {
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                    subject: document.getElementById('subject').value,
                    message: document.getElementById('message').value
                });
                
                // Show Success Feedback
                formMessage.innerHTML = '<i class="fas fa-check-circle mr-1"></i> Message sent successfully!';
                formMessage.classList.add('text-green-600', 'bg-green-50', 'dark:bg-green-900/20', 'block');
                formMessage.classList.remove('hidden');
                
                // Reset fields
                contactForm.reset();
            } catch (error) {
                console.error('EmailJS Execution Error:', error);
                
                // Show Error Feedback with inner error details
                const errorMessage = error.text || error.message || 'Check your credentials or EmailJS dashboard settings.';
                formMessage.innerHTML = `<i class="fas fa-exclamation-triangle mr-1"></i> Failed: ${errorMessage}`;
                formMessage.classList.add('text-red-600', 'bg-red-50', 'dark:bg-red-900/20', 'block');
                formMessage.classList.remove('hidden');
            } finally {
                // Reset Button Defaults
                btnText.innerText = originalText;
                btnIcon.className = originalIconClass;
                submitBtn.disabled = false;
                
                // Auto-cleanup success state
                if (formMessage.classList.contains('text-green-600')) {
                    setTimeout(() => {
                        formMessage.classList.add('hidden');
                    }, 5000);
                }
            }
        });
    }
