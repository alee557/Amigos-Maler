export function connectedMask(data, width, height, x, y) {
  if (!(data instanceof Uint8ClampedArray) || data.length !== width * height * 4) throw new TypeError("Invalid image data.");
  const start = y * width + x;
  if (!Number.isInteger(x) || !Number.isInteger(y) || x < 0 || y < 0 || x >= width || y >= height) throw new RangeError("Wall point is outside the image.");
  const queue = new Int32Array(width * height);
  const visited = new Uint8Array(queue.length);
  const alpha = new Uint8ClampedArray(queue.length);
  let head = 0;
  let tail = 1;
  queue[0] = start;
  visited[start] = 1;

  function visit(index) {
    if (visited[index]) return;
    visited[index] = 1;
    const offset = index * 4;
    const difference = [0, 1, 2].reduce(
      (sum, channel) => sum + (data[offset + channel] - data[start * 4 + channel]) ** 2,
      0
    );
    if (difference < 4400) queue[tail++] = index;
  }

  while (head < tail) {
    const index = queue[head++];
    alpha[index] = 255;
    if (index % width) visit(index - 1);
    if ((index + 1) % width) visit(index + 1);
    if (index >= width) visit(index - width);
    if (index + width < queue.length) visit(index + width);
  }
  return alpha;
}

const demoWallRegions = [
  { id: "left", points: [[0, 0], [0.143, 0.082], [0.143, 0.838], [0, 0.974]] },
  { id: "centre", points: [[0.143, 0.082], [0.858, 0.082], [0.858, 0.838], [0.143, 0.838]] },
  { id: "right", points: [[0.858, 0.082], [1, 0], [1, 0.974], [0.858, 0.838]] }
];

export function demoWallRegionAt(x, y) {
  return demoWallRegions.find(({ points }) => points.reduce((inside, point, index) => {
    const previous = points[(index + points.length - 1) % points.length];
    const crosses = (point[1] > y) !== (previous[1] > y)
      && x < ((previous[0] - point[0]) * (y - point[1])) / (previous[1] - point[1]) + point[0];
    return crosses ? !inside : inside;
  }, false));
}

const ncsElementaryHues = ["Y", "R", "B", "G", "Y"];
const screenHueAnchors = [54, 0, -120, -240, -306];
const screenLightnessAnchors = [58, 52, 46, 46, 58];

export function ncsHueAt(step) {
  const index = Math.max(0, Math.min(39, Math.round(step)));
  const segment = Math.floor(index / 10);
  const amount = (index % 10) * 10;
  const progress = amount / 100;
  const hue = screenHueAnchors[segment] + (screenHueAnchors[segment + 1] - screenHueAnchors[segment]) * progress;
  const lightness = screenLightnessAnchors[segment] + (screenLightnessAnchors[segment + 1] - screenLightnessAnchors[segment]) * progress;
  const family = amount ? `${ncsElementaryHues[segment]}${amount}${ncsElementaryHues[segment + 1]}` : ncsElementaryHues[segment];
  return { notation: `NCS S 2050-${family}`, color: `hsl(${hue} 58% ${lightness}%)` };
}
