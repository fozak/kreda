//togling the left pane section
document.addEventListener("DOMContentLoaded", function () { // Ensures the DOM is fully loaded

    //navbar toggle functionality
    // Get the dropdown trigger element
    const navbarDropdown = document.getElementById('navbar-dropdown');
    const dropdownContent = document.getElementById('navbar-dropdown-content');

    // Since we can't change CSS, we'll directly manipulate the style property
    // Toggle display property when clicking on the dropdown
    navbarDropdown.addEventListener('click', function () {
        // Check the current display state
        const currentDisplay = window.getComputedStyle(dropdownContent).display;

        // Toggle the display property
        if (currentDisplay === 'none') {
            dropdownContent.style.display = 'block';
        } else {
            dropdownContent.style.display = 'none';
        }
    });

    // Optional: Close the dropdown when clicking outside of it
    document.addEventListener('click', function (event) {
        if (!navbarDropdown.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }
    });

    //end of navbar toggle functionality

    // Get all the collapsible headers (the clickable containers)
    const headers = document.querySelectorAll('.sidebar-group-container.collapsible');

    // Loop through each header and attach the click event listener
    headers.forEach(header => {
        header.addEventListener('click', () => {
            // Find the associated ul (the content to toggle)
            const content = header.nextElementSibling; // Get the next sibling (the UL)

            if (content) { // Check if the content element exists
                // Toggle Visibility
                if (content.classList.contains('hidden')) {
                    content.classList.remove('hidden'); // Show the content (remove the 'hidden' class)
                } else {
                    content.classList.add('hidden');   // Hide the content (add the 'hidden' class)
                }

                // Optional: Toggle 'active' class on the header for visual feedback
                header.classList.toggle('active'); // Add/remove the 'active' class
            }
        });
    });
});

//adding dark mode toggle functionality
const isUserPreferenceDarkMode = localStorage.getItem("darkMode");
const isSystemPreferenceDarkMode = window.matchMedia?.(
    "(prefers-color-scheme: dark)"
)?.matches;
const darkModeState = isUserPreferenceDarkMode
    ? isUserPreferenceDarkMode == "true"
    : isSystemPreferenceDarkMode;
if (darkModeState) {
    document.body.classList.add("dark");
}