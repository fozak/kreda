(async () => {
    const links = document.querySelectorAll('a.space-link');
    const viewBox = "0 0 253 24";
    const textElement = (label) => `
      <text x="30" y="1" alignment-baseline="hanging" font-family="Inter, sans-serif"
            font-size="20" font-weight="800" fill="rgb(46, 46, 46)" letter-spacing="-0.07em">
        ${label}
      </text>`;
  
    // Make sure all <img> elements load first
    await Promise.all(
      Array.from(links).map(link => {
        const img = link.querySelector('img');
        if (!img || img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.onload = img.onerror = resolve;
        });
      })
    );
  
    for (const link of links) {
      const img = link.querySelector('img');
      const label = link.querySelector('span')?.innerText.trim();
      const name = label.toLowerCase().replace(/\s+/g, '-') + '-with-text.svg';
      const src = img?.src;
  
      try {
        const res = await fetch(src);
        const svgText = await res.text();
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
        const originalSVG = svgDoc.querySelector('svg');
  
        if (!originalSVG) {
          console.warn(`No <svg> found in ${src}`);
          continue;
        }
  
        const wrappedSVG = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none">
    ${originalSVG.innerHTML}
    ${textElement(label)}
  </svg>`.trim();
  
        const blob = new Blob([wrappedSVG], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = name;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } catch (e) {
        console.error(`Error processing ${src}:`, e);
      }
    }
  })();
  