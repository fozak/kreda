//togling the left pane section
document.addEventListener("DOMContentLoaded", function() { // Ensures the DOM is fully loaded

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