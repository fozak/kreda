//togling the left pane section
document.addEventListener("DOMContentLoaded", function () { // Ensures the DOM is fully loaded

    //navbar toggle functionality
    // Get the dropdown trigger element
    // Debugging - confirm elements exist
  const navbarDropdown = document.getElementById('navbar-dropdown');
  const dropdownContent = document.getElementById('navbar-dropdown-content');
  
  console.log("Navbar dropdown element:", navbarDropdown);
  console.log("Dropdown content element:", dropdownContent);
  
  if (!navbarDropdown || !dropdownContent) {
    console.error("One or both dropdown elements not found!");
    return;
  }
  
  // First, let's check the initial state
  const initialDisplay = window.getComputedStyle(dropdownContent).display;
  console.log("Initial dropdown display value:", initialDisplay);
  
  // Force the initial state to be hidden to ensure consistency
  if (initialDisplay !== 'none') {
    dropdownContent.style.display = 'none';
  }
  
  // Add a visible click indicator
  navbarDropdown.style.cursor = 'pointer';
  
  // Toggle functionality with logging
  navbarDropdown.addEventListener('click', function(event) {
    event.stopPropagation(); // Prevent the document click handler from firing
    console.log("Dropdown clicked");
    
    const currentDisplay = window.getComputedStyle(dropdownContent).display;
    console.log("Current display before toggle:", currentDisplay);
    
    // Toggle display with more explicit approach
    if (currentDisplay === 'none') {
      console.log("Setting to block");
      dropdownContent.style.display = 'block';
    } else {
      console.log("Setting to none");
      dropdownContent.style.display = 'none';
    }
    
    // Verify the change
    console.log("Display after toggle:", window.getComputedStyle(dropdownContent).display);
  });
  
  // Document click handler to close dropdown
  document.addEventListener('click', function(event) {
    if (dropdownContent.style.display !== 'none' && 
        !navbarDropdown.contains(event.target) && 
        !dropdownContent.contains(event.target)) {
      console.log("Clicked outside, hiding dropdown");
      dropdownContent.style.display = 'none';
    }
  });
  
  console.log("Dropdown toggle script initialized");

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