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
    });