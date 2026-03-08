document.addEventListener('DOMContentLoaded', () => {
    // --------------------------------------------------------
    // 1. Floating Parallax for Clay Elements
    // --------------------------------------------------------
    const floatingElements = document.querySelectorAll('.floating-icon, .floating-avatar');
    
    document.addEventListener('mousemove', (e) => {
        // Calculate mouse position relative to center of screen
        const xAxis = (window.innerWidth / 2 - e.pageX) / 30;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 30;
        
        floatingElements.forEach((el, index) => {
            // Give each element a slightly different speed based on index
            const speed = (index + 1) * 0.4;
            el.style.transform = `translate(${xAxis * speed}px, ${yAxis * speed}px)`;
        });
    });

    // --------------------------------------------------------
    // 2. Study-Flow Timeline Scroll Progress (Synapse Firing)
    // --------------------------------------------------------
    const timelineSection = document.querySelector('.timeline-section');
    const timelineProgress = document.getElementById('timeline-progress');
    const timelineDots = document.querySelectorAll('.timeline-dot');
    
    window.addEventListener('scroll', () => {
        if (!timelineSection || !timelineProgress) return;
        
        const rect = timelineSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Calculate progress line when timeline section enters viewport
        // Top of section enters bottom of viewport
        if (rect.top <= windowHeight && rect.bottom >= 0) {
            
            // Total scrollable area for this section
            const totalScroll = rect.height;
            // Current scroll position relative to the section
            const currentScroll = windowHeight - rect.top - (windowHeight / 2); // Start filling when section is halfway up
            
            let percentage = (currentScroll / totalScroll) * 100;
            
            // Constrain between 0 and 100
            percentage = Math.max(0, Math.min(100, percentage));
            
            timelineProgress.style.height = `${percentage}%`;

            // Illuminate dots as the synapse fires past them
            timelineDots.forEach(dot => {
                const dotRect = dot.getBoundingClientRect();
                // If dot is above the bottom of the progress "head"
                if (dotRect.top < windowHeight / 2 + 50) {
                    dot.style.background = 'var(--mint)';
                    dot.style.boxShadow = '0 0 15px var(--mint)';
                    dot.style.borderColor = 'var(--mint)';
                } else {
                    dot.style.background = 'var(--bg-color)';
                    dot.style.boxShadow = 'none';
                    dot.style.borderColor = 'var(--soft-purple)';
                }
            });
        }
    });

    // Initial check for dots on load
    window.dispatchEvent(new Event('scroll'));
});
