// Select the container
const container = document.querySelector('.grid-cols-1');

// Change to grid layout - much simpler than flex for equal columns
container.style.display = 'grid';
container.style.gridTemplateColumns = 'repeat(3, 1fr)'; // 3 equal columns
container.style.gap = '10px'; // 10px gap between all grid items

// Get all items
const items = container.children;

// Update each item's style
for (const item of items) {
  // Remove any existing margins or padding that might cause extra space
  item.style.margin = '0';
  
  // Keep the scale but fix the height to prevent vertical overflow
  item.style.transform = 'scale(0.5)'; // Less aggressive scaling
  item.style.transformOrigin = 'center center'; // Scale from center
  item.style.height = 'auto'; // Let content determine height
  item.style.overflow = 'visible';
  item.style.textAlign = 'center';
}
