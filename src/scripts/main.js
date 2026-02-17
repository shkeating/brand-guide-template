 document.addEventListener("DOMContentLoaded", function() {
        const tocList = document.getElementById("toc-list");
        // Only select h2 elements that are direct children of a section to avoid the h2 in the type-preview
        const headings = document.querySelectorAll("main section > h2");
        const sections = document.querySelectorAll("main section");

        headings.forEach((heading, index) => {
            // Determine the ID to link to. Use parent section's ID if available, otherwise generate one.
            let targetId = heading.parentElement.tagName.toLowerCase() === 'section' && heading.parentElement.id 
                            ? heading.parentElement.id 
                            : heading.id;
                            
            if (!targetId) {
                targetId = 'heading-' + index;
                heading.id = targetId;
            }

            // Create list item and link
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = "#" + targetId;
            a.textContent = heading.textContent;
            
            li.appendChild(a);
            tocList.appendChild(li);
        });

        // --- Scrollspy Implementation ---
        const tocLinks = document.querySelectorAll('.toc-nav a');
        
        // Observer options: defines a detection window in the upper portion of the viewport
        const observerOptions = {
            root: null,
            rootMargin: '-10% 0px -60% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // When a section enters the detection window
                if (entry.isIntersecting) {
                    // Remove active class from all links
                    tocLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add active class to the corresponding TOC link
                    const activeLink = document.querySelector(`.toc-nav a[href="#${entry.target.id}"]`);
                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        }, observerOptions);

        // Observe all sections for scrolling
        sections.forEach(section => {
            if (section.id) {
                observer.observe(section);
            }
        });

    // --- Mobile TOC Toggle ---
    const tocToggle = document.getElementById('mobile-toc-toggle');
    const tocNav = document.querySelector('.toc-nav');

    if (tocToggle && tocNav) {
                tocToggle.addEventListener('click', () => {
            const isExpanded = tocToggle.getAttribute('aria-expanded') === 'true';
            tocToggle.setAttribute('aria-expanded', !isExpanded);
            tocNav.classList.toggle('open');
        });

        // Close menu when a link is clicked on mobile
        tocNav.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' && window.innerWidth < 1000) {
                tocNav.classList.remove('open');
                tocToggle.setAttribute('aria-expanded', 'false');
            }

        });
    }

    // --- Add Skip Back Links ---
    // Create styles for the skip link to be visually hidden until focused
    const skipLinkStyle = document.createElement('style');
    skipLinkStyle.textContent = `
        .skip-back-link {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        .skip-back-link:focus {
            position: static;
            width: auto;
            height: auto;
            clip: auto;
            white-space: normal;
            display: inline-block;
            padding: 0.5rem;
            background: #ffffff;
            color: #000000;
            border: 2px solid #000000;
            margin-top: 1rem;
            text-decoration: underline;
            z-index: 100;
        }
    `;
    document.head.appendChild(skipLinkStyle);

    sections.forEach(section => {
        const skipLink = document.createElement('a');
        skipLink.href = '#site-navigation';
        skipLink.className = 'skip-back-link';
        skipLink.textContent = 'Skip back to navigation';
        section.appendChild(skipLink);
    });

    // Accessibility: Move focus to target section when using keyboard navigation (Enter key)
    document.addEventListener('click', (event) => {
        const link = event.target.closest('a[href^="#"]');
        if (!link) return;

        // Check for keyboard activation (detail is 0)
        if (event.detail === 0) {
            const id = link.getAttribute('href').substring(1);
            const target = document.getElementById(id);

            if (target) {
                if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
                target.focus();
            }
        }
    });

    // --- Contrast Calculator Logic ---
    const contrastCalculator = document.getElementById('contrast-calculator');
    if (contrastCalculator) {
        // Define Brand Palette (Students should update this)
        // Retrieve palette from data attribute populated by brandSettings.js
        const brandPalette = JSON.parse(contrastCalculator.dataset.palette || '[]');

        function getLuminance(hex) {
            const rgb = parseInt(hex.slice(1), 16);
            const r = (rgb >> 16) & 0xff;
            const g = (rgb >>  8) & 0xff;
            const b = (rgb >>  0) & 0xff;
            
            const [lr, lg, lb] = [r, g, b].map(c => {
                c /= 255;
                return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
        }

        function getContrastRatio(hex1, hex2) {
            const lum1 = getLuminance(hex1);
            const lum2 = getLuminance(hex2);
            const brightest = Math.max(lum1, lum2);
            const darkest = Math.min(lum1, lum2);
            return (brightest + 0.05) / (darkest + 0.05);
        }

        function updateCalculator() {
            const bgSelect = document.getElementById('bg-color');
            const textSelect = document.getElementById('text-color');
            const bgHex = bgSelect.value;
            const textHex = textSelect.value;

            // Update Preview
            const preview = document.getElementById('preview-area');
            if (preview) {
                preview.style.backgroundColor = bgHex;
                preview.style.color = textHex;
            }

            // Calculate Ratio
            const ratio = getContrastRatio(bgHex, textHex);
            const ratioDisplay = document.getElementById('ratio-display');
            if (ratioDisplay) ratioDisplay.textContent = ratio.toFixed(2) + ":1";

            // Update Table
            const setStatus = (id, pass) => {
                const el = document.getElementById(id);
                if (el) {
                    el.textContent = pass ? "PASS" : "FAIL";
                    el.className = pass ? "status-pass" : "status-fail";
                }
            };

            setStatus('aa-normal', ratio >= 4.5);
            setStatus('aa-large', ratio >= 3);
            setStatus('aaa-normal', ratio >= 7);
            setStatus('aaa-large', ratio >= 4.5);
        }

        // Initialize
        const bgSelect = document.getElementById('bg-color');
        const textSelect = document.getElementById('text-color');

        if (bgSelect && textSelect) {
            brandPalette.forEach(color => {
                const option = new Option(`${color.name} (${color.hex})`, color.hex);
                bgSelect.add(option.cloneNode(true));
                textSelect.add(option);
            });

            // Set defaults (White bg, Black text)
            bgSelect.value = "#ffffff";
            textSelect.value = "#000000";

            bgSelect.addEventListener('change', updateCalculator);
            textSelect.addEventListener('change', updateCalculator);

            // Swap Colors
            const swapBtn = document.getElementById('swap-colors');
            if (swapBtn) {
                swapBtn.addEventListener('click', () => {
                    const temp = bgSelect.value;
                    bgSelect.value = textSelect.value;
                    textSelect.value = temp;
                    updateCalculator();
                });
            }

            // Initial run
            updateCalculator();
        }
    }

    // --- Theme Toggle Logic ---
    const themeToggle = document.getElementById('theme-toggle');
    
    // Function to set theme
    const setTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // Check for saved theme preference, otherwise fallback to system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        // Set initial data-theme based on system preference to ensure icons match
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        setTheme(systemTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setTheme(newTheme);
        });
    }
    });