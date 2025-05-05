//togling the left pane section
document.addEventListener("DOMContentLoaded", function () { // Ensures the DOM is fully loaded

    //navbar toggle functionality
    document.getElementById('navbar-dropdown').addEventListener('click', function () {
        const dropdown = document.getElementById('dropdown-menu');
        if (dropdown.style.display === 'none' || dropdown.style.display === '') {
            dropdown.style.display = 'block';
        } else {
            dropdown.style.display = 'none';
        }
    });

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