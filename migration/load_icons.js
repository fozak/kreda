const innerScale = 0.05; // ← Adjust this between 0.1 and 1 to control inner icon size

document.querySelectorAll(".icon-visual").forEach((container, index) => {
  const square = container.querySelector(".icon-square");
  const innerSVG = container.querySelector(".icon-inner svg");

  if (!square || !innerSVG) return;

  const bg = getComputedStyle(square).backgroundImage;
  const match = bg.match(/rgb\\([^)]+\\)/);
  const fillColor = match ? match[0] : "#ccc";

  const icon = innerSVG.cloneNode(true);
  const viewBox = icon.getAttribute("viewBox") || "0 0 24 24";
  const [minX, minY, vbW, vbH] = viewBox.split(" ").map(Number);

  icon.removeAttribute("width");
  icon.removeAttribute("height");

  const boxSize = 118;
  const scale = (boxSize * innerScale) / Math.max(vbW, vbH);
  const offsetX = (boxSize - vbW * scale) / 2 - minX * scale;
  const offsetY = (boxSize - vbH * scale) / 2 - minY * scale;

  const serializer = new XMLSerializer();
  const iconMarkup = serializer.serializeToString(icon);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${boxSize}" height="${boxSize}" viewBox="0 0 ${boxSize} ${boxSize}">
      <rect width="${boxSize}" height="${boxSize}" rx="20" fill="${fillColor}" />
      <g transform="translate(${offsetX}, ${offsetY}) scale(${scale})">
        ${iconMarkup}
      </g>
    </svg>
  `.trim();

  const blob = new Blob([svg], { type: "image/svg+xml" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `icon-${index + 1}.svg`;
  a.click();
  URL.revokeObjectURL(url);
});
