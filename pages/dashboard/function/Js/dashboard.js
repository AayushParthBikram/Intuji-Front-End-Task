class FinancialDashboard {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.animateProgressBars();
        this.setupResponsive();
        this.animateCards();
        this.drawChart(); // Draw chart initially
    }

    // Navigation functionality
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();

                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));

                // Add active class to clicked link
                link.classList.add('active');

                // Handle section switching
                const section = link.dataset.section;
                this.handleSectionChange(section);
            });
        });
    }

    handleSectionChange(section) {
        console.log(`Navigating to: ${section}`);
        switch (section) {
            case 'dashboard':
                document.title = 'Financial Dashboard';
                break;
            case 'analytics':
                document.title = 'Analytics - Financial Dashboard';
                break;
            default:
                document.title = 'Financial Dashboard';
        }
    }

    // Animate progress bars
    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-bar-custom');

        setTimeout(() => {
            progressBars.forEach((bar, index) => {
                const width = bar.dataset.width;
                setTimeout(() => {
                    bar.style.width = `${width}%`;
                }, index * 200);
            });
        }, 500);
    }

    // Animate cards on load
    animateCards() {
        const cards = document.querySelectorAll('.card');

        cards.forEach((card, index) => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    // Responsive behaviors (if needed)
    setupResponsive() {
        window.addEventListener('resize', () => {
            this.drawChart(); // Redraw chart on resize
        });
    }

    // Chart drawing using Canvas API
    drawChart() {
        const canvas = document.getElementById('analyticsChart');
        if (!canvas) return;

        // Set canvas size visually
        canvas.style.width = '631.72px';   // Visual width from Figma
        canvas.style.height = '270px';     // Visual height from Figma
        canvas.style.opacity = '0.8';      // 80% opacity as per design

        // No border per your request
        canvas.style.border = 'none';

        // Set the actual pixel resolution for crisp drawing
        const dpr = window.devicePixelRatio || 1;
        const width = 631.72 * dpr;
        const height = 270 * dpr;
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr); // Scale context for high DPI screens

        // Clear previous drawing
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const padding = 50;
        const chartWidth = 631.72 - padding * 2;
        const chartHeight = 270 - padding * 2;

        // Sample data
        const data1 = [40, 65, 45, 80, 60, 95, 75, 100, 70, 85, 90, 75];
        const data2 = [20, 35, 25, 45, 35, 55, 45, 65, 40, 50, 55, 45];
        const maxY = 100;

        // Remove all axis labels and grid lines drawing here since HTML handles it

        // Function to draw smooth curve using Bezier curves on canvas
        const drawSmoothCurve = (data, strokeStyle, fillStyle) => {
            const points = data.map((value, i) => {
                return {
                    x: padding + (i / (data.length - 1)) * chartWidth,
                    y: padding + (1 - value / maxY) * chartHeight,
                };
            });

            // Draw filled area
            ctx.beginPath();
            ctx.moveTo(points[0].x, 270 - padding);
            ctx.lineTo(points[0].x, points[0].y);

            for (let i = 1; i < points.length; i++) {
                const cpX = (points[i - 1].x + points[i].x) / 2;
                ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, cpX, (points[i - 1].y + points[i].y) / 2);
                ctx.quadraticCurveTo(cpX, (points[i - 1].y + points[i].y) / 2, points[i].x, points[i].y);
            }

            ctx.lineTo(points[points.length - 1].x, 270 - padding);
            ctx.closePath();

            // Create gradient fill
            const gradient = ctx.createLinearGradient(0, padding, 0, 270 - padding);
            gradient.addColorStop(0, fillStyle);
            gradient.addColorStop(1, 'rgba(255,255,255,0.05)');
            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw stroke line
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            for (let i = 1; i < points.length; i++) {
                const cpX = (points[i - 1].x + points[i].x) / 2;
                ctx.quadraticCurveTo(points[i - 1].x, points[i - 1].y, cpX, (points[i - 1].y + points[i].y) / 2);
                ctx.quadraticCurveTo(cpX, (points[i - 1].y + points[i].y) / 2, points[i].x, points[i].y);
            }

            ctx.strokeStyle = strokeStyle;
            ctx.lineWidth = 2;
            ctx.stroke();
        };

        // Draw both data curves
        drawSmoothCurve(data1, '#6c5ce7', 'rgba(108, 92, 231, 0.4)');
        drawSmoothCurve(data2, '#fdcb6e', 'rgba(253, 203, 110, 0.4)');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new FinancialDashboard();
});
