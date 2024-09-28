const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav a');
const header = document.querySelector('header');

// Function to update active state on scroll
const scrollActive = () => {
    const scrollDown = window.scrollY; // Current scroll position
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight; // Height of the section
        const sectionTop = current.offsetTop - 58; // Adjusted for navbar height
        const sectionId = current.getAttribute("id");
        const sectionsClass = document.querySelector(`nav a[href*="${sectionId}"]`);

        // Check if the scroll position is within the current section
        if (scrollDown >= sectionTop && scrollDown < sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link'); // Add active class
        } else {
            sectionsClass.classList.remove('active-link'); // Remove active class
        }
    });

    // Change nav color on scroll
    if (scrollDown > 50) { // Change 50 to whatever scroll threshold you want
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
};

// Scroll event listener
window.addEventListener('scroll', scrollActive);

// Add click event listeners to update active state on click
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(nav => nav.classList.remove('active-link')); // Remove active class from all links
        this.classList.add('active-link'); // Add active class to clicked link
        scrollActive(); // Call scrollActive to update active state
    });
});
