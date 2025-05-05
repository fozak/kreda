//togling the left pane section
document.addEventListener("DOMContentLoaded", function () { // Ensures the DOM is fully loaded

    document.addEventListener("DOMContentLoaded", function() {
        const navbarDropdown = document.getElementById('navbar-dropdown');
        const dropdownContent = document.getElementById('navbar-dropdown-content');
        
        console.log("Navbar dropdown element:", navbarDropdown);
        console.log("Dropdown content element:", dropdownContent);
        
        if (!navbarDropdown || !dropdownContent) {
          console.error("One or both dropdown elements not found!");
          return;
        }
        
        // Since we can't change CSS and there's a "hide" class that might be controlling visibility,
        // we'll toggle this class instead of using inline styles
        navbarDropdown.addEventListener('click', function(event) {
          event.stopPropagation();
          console.log("Dropdown clicked");
          
          // Toggle the hide class
          dropdownContent.classList.toggle('hide');
          
          // Since the element already has style="display: block;" but might be hidden by the hide class,
          // we'll ensure the inline style is set correctly
          if (dropdownContent.classList.contains('hide')) {
            console.log("Adding hide class");
          } else {
            console.log("Removing hide class");
          }
        });
        
        // Document click handler to close dropdown
        document.addEventListener('click', function(event) {
          if (!dropdownContent.classList.contains('hide') && 
              !navbarDropdown.contains(event.target) && 
              !dropdownContent.contains(event.target)) {
            console.log("Clicked outside, adding hide class");
            dropdownContent.classList.add('hide');
          }
        });
        
        console.log("Dropdown toggle script initialized");
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