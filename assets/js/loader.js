  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('[data-loader]').forEach(function (el) {
      const loaderName = el.getAttribute('data-loader');
      const filePath = `/components/${loaderName}.html`;

      fetch(filePath)
        .then(response => {
          if (!response.ok) throw new Error(`Failed to load ${filePath}`);
          return response.text();
        })
        .then(html => {
          el.innerHTML = html;
        })
        .catch(error => {
          console.error(error);
          el.innerHTML = `<div style="color:red;">Error loading ${filePath}</div>`;
        });
    });
  });
