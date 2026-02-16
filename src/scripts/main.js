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
    });