"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { connectedMask, demoWallRegionAt, ncsHueAt } from "@/lib/propertyVisualizer";
import styles from "./PropertyVisualizer.module.css";

const sample = "/assets/home/visualizer-demo-room-v2.png";
const textures = [
  ["Mineral Plaster", "/wall-textures/texture-1.webp"],
  ["Architectural Panels", "/wall-textures/texture-2.webp"],
  ["Sage Combed", "/wall-textures/texture-3.webp"],
  ["Classic Damask", "/wall-textures/texture-4.webp"],
  ["Terracotta Geo", "/wall-textures/texture-5.webp"],
  ["Soft Botanical", "/wall-textures/texture-6.webp"],
  ["Textured Linen", "/assets/wallpapers/wallpaper-1.webp"],
  ["Botanical Leaf", "/assets/wallpapers/wallpaper-2.webp"]
];

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = src;
  });
}

// Select the connected surface closest in colour to the point the visitor chose.
function wallMask(context, x, y) {
  const { width, height } = context.canvas;
  const { data } = context.getImageData(0, 0, width, height);
  const mask = document.createElement("canvas");
  mask.width = width;
  mask.height = height;
  const maskContext = mask.getContext("2d");
  const pixels = maskContext.createImageData(width, height);
  connectedMask(data, width, height, x, y).forEach((alpha, index) => { pixels.data[index * 4 + 3] = alpha; });
  maskContext.putImageData(pixels, 0, 0);
  return mask;
}

function demoWallMask(width, height, region) {
  const mask = document.createElement("canvas");
  mask.width = width;
  mask.height = height;
  const context = mask.getContext("2d");
  context.beginPath();
  region.points.forEach(([x, y], index) => context[index ? "lineTo" : "moveTo"](x * width, y * height));
  context.closePath();
  context.fillStyle = "white";
  context.fill();
  if (region.id === "centre") {
    context.globalCompositeOperation = "destination-out";
    [
      [[0.413, 0.765], [0.584, 0.765], [0.59, 0.787], [0.409, 0.787]],
      [[0.425, 0.783], [0.441, 0.783], [0.437, 0.884], [0.419, 0.884]],
      [[0.566, 0.783], [0.579, 0.783], [0.589, 0.884], [0.572, 0.884]]
    ].forEach(points => {
      context.beginPath();
      points.forEach(([x, y], index) => context[index ? "lineTo" : "moveTo"](x * width, y * height));
      context.closePath();
      context.fill();
    });
  }
  return mask;
}

export default function PropertyVisualizer() {
  const { t } = useLanguage();
  const canvas = useRef(null);
  const [source, setSource] = useState(sample);
  const [started, setStarted] = useState(false);
  const [base, setBase] = useState(null);
  const [mask, setMask] = useState(null);
  const [hue, setHue] = useState(3);
  const [mode, setMode] = useState("paint");
  const [texture, setTexture] = useState(textures[0]);
  const [before, setBefore] = useState(false);
  const [result, setResult] = useState(null);
  const [notice, setNotice] = useState("");
  const [cursor, setCursor] = useState([0.5, 0.5]);
  const ncsColor = ncsHueAt(hue);
  const color = ncsColor.color;

  useEffect(() => {
    let active = true;
    loadImage(source).then(image => {
      if (!active) return;
      const buffer = document.createElement("canvas");
      const scale = Math.min(1, 1200 / Math.max(image.width, image.height));
      buffer.width = Math.max(1, Math.round(image.width * scale));
      buffer.height = Math.max(1, Math.round(image.height * scale));
      buffer.getContext("2d").drawImage(image, 0, 0, buffer.width, buffer.height);
      setBase(buffer);
    }).catch(() => {
      if (active) setNotice("This photo could not be opened.");
    });
    return () => {
      active = false;
      if (source.startsWith("blob:")) URL.revokeObjectURL(source);
    };
  }, [source]);

  useEffect(() => {
    let active = true;
    async function render() {
      if (!started || !base) return;
      const output = document.createElement("canvas");
      output.width = base.width;
      output.height = base.height;
      const context = output.getContext("2d");
      context.drawImage(base, 0, 0);

      if (mask) {
        const layer = document.createElement("canvas");
        layer.width = base.width;
        layer.height = base.height;
        const brush = layer.getContext("2d");
        if (mode === "wallpaper") {
          const tile = await loadImage(texture[1]);
          brush.fillStyle = brush.createPattern(tile, "repeat");
        } else {
          brush.fillStyle = color;
        }
        brush.fillRect(0, 0, layer.width, layer.height);
        brush.globalCompositeOperation = "destination-in";
        brush.drawImage(mask, 0, 0);
        context.globalCompositeOperation = "multiply";
        context.globalAlpha = 0.78;
        context.drawImage(layer, 0, 0);
      }

      if (!active || !canvas.current) return;
      canvas.current.width = base.width;
      canvas.current.height = base.height;
      canvas.current.getContext("2d").drawImage(before ? base : output, 0, 0);
      if (mask) setResult(output);
    }
    render().catch(() => {
      if (active) setNotice("This finish could not be loaded.");
    });
    return () => { active = false; };
  }, [started, base, mask, mode, texture, color, before]);

  function selectWall(x, y) {
    if (!base) return;
    const pixelX = Math.min(base.width - 1, Math.max(0, Math.floor(x * base.width)));
    const pixelY = Math.min(base.height - 1, Math.max(0, Math.floor(y * base.height)));
    const demoRegion = source === sample && demoWallRegionAt(x, y);
    if (source === sample && !demoRegion) {
      setNotice("Select one of the three walls.");
      return;
    }
    setBefore(false);
    setMask(demoRegion ? demoWallMask(base.width, base.height, demoRegion) : wallMask(base.getContext("2d"), pixelX, pixelY));
    setNotice("");
  }

  function changeSource(nextSource) {
    setBefore(false);
    if (nextSource === source) {
      setMask(null);
      setResult(null);
      return;
    }
    setBase(null);
    setMask(null);
    setResult(null);
    setSource(nextSource);
  }

  function downloadPreview() {
    if (!result) return;
    result.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "amigos-property-preview.jpg";
      link.click();
      URL.revokeObjectURL(url);
    }, "image/jpeg", 0.9);
  }

  function uploadFile(file) {
    if (!file) return;
    if (file.size > 12 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setNotice("Choose a JPEG, PNG or WebP up to 12 MB.");
      return;
    }
    setNotice("");
    setStarted(true);
    changeSource(URL.createObjectURL(file));
  }

  function uploadPhoto(event) {
    uploadFile(event.target.files[0]);
  }

  if (!started) return <section className={styles.section} data-i18n-skip aria-label={t("Property visualizer")}>
    <div className={styles.uploadStage} onDragOver={event => event.preventDefault()} onDrop={event => {
      event.preventDefault();
      uploadFile(event.dataTransfer.files[0]);
    }}>
      <i className={`${styles.frameCorner} ${styles.topLeft}`} aria-hidden="true" />
      <i className={`${styles.frameCorner} ${styles.topRight}`} aria-hidden="true" />
      <i className={`${styles.frameCorner} ${styles.bottomLeft}`} aria-hidden="true" />
      <i className={`${styles.frameCorner} ${styles.bottomRight}`} aria-hidden="true" />
      <div className={styles.uploadContent}>
        <div>
          <h3>{t("Upload Your Photo")}</h3>
          <p>{t("Drag & drop an image here, or click to choose one")}</p>
          <span className={styles.detectionBadge}>{t("AI wall detection runs automatically")}</span>
        </div>
        <div className={styles.uploadActions}>
          <label className={styles.chooseImage}><span aria-hidden="true">→</span>{t("Choose Image")}
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadPhoto} />
          </label>
          <button type="button" className={styles.tryDemo} onClick={() => {
            setStarted(true);
            setNotice("");
            changeSource(sample);
          }}>{t("Try a demo")}</button>
        </div>
      </div>
    </div>
    {notice && <p className={styles.notice} role="alert">{t(notice)}</p>}
  </section>;

  return <section className={styles.section} data-i18n-skip aria-label={t("Property visualizer")}>
    <p className={styles.instruction}>{t("Tap the wall to select a connected area of similar colour.")} {t("Use the controls below to preview a finish.")}</p>
    <div className={styles.stage}>
      <canvas ref={canvas} tabIndex={0} aria-label={t("Select a wall")}
        onClick={event => {
          const bounds = event.currentTarget.getBoundingClientRect();
          selectWall((event.clientX - bounds.left) / bounds.width, (event.clientY - bounds.top) / bounds.height);
        }}
        onKeyDown={event => {
          const delta = { ArrowLeft: [-0.02, 0], ArrowRight: [0.02, 0], ArrowUp: [0, -0.02], ArrowDown: [0, 0.02] }[event.key];
          if (delta) {
            event.preventDefault();
            setCursor(cursor.map((value, index) => Math.max(0, Math.min(1, value + delta[index]))));
          }
          if (event.key === "Enter") {
            event.preventDefault();
            selectWall(...cursor);
          }
        }} />
      <div className={styles.stageControls}>
        <button type="button" disabled={!result} aria-pressed={before} onClick={() => setBefore(true)}><span aria-hidden="true">→</span>{t("Before")}</button>
        <button type="button" disabled={!result} aria-pressed={result && !before} onClick={() => setBefore(false)}><span aria-hidden="true">→</span>{t("After")}</button>
      </div>
      <span className={styles.cursor} aria-hidden="true" style={{ left: `${cursor[0] * 100}%`, top: `${cursor[1] * 100}%` }}>＋</span>
      <span className={`${styles.status} ${mask ? styles.ready : ""}`}>{mask ? t("Finish ready") : t("Select a wall")}</span>
    </div>

    <div className={styles.finishPanel}>
      <div className={styles.finishPicker}>
        <div className={styles.modeTabs} role="group" aria-label={t("Choose a finish")}>
          <button type="button" className={mode === "paint" ? styles.active : ""} aria-pressed={mode === "paint"} onClick={() => { setMode("paint"); setBefore(false); }}>{t("Paint Color")}</button>
          <button type="button" className={mode === "wallpaper" ? styles.active : ""} aria-pressed={mode === "wallpaper"} onClick={() => { setMode("wallpaper"); setBefore(false); }}>{t("Wallpaper")}</button>
        </div>
        {mode === "paint" ? <>
          <label className={styles.hueLabel}>
            <span className="sr-only">{t("Paint Color")}</span>
            <input className={styles.hue} style={{ "--ncs-color": color }} type="range" min="0" max="39" step="1" value={hue} onChange={event => { setHue(Number(event.target.value)); setBefore(false); }} aria-label="NCS hue" />
          </label>
          <div className={styles.ncsScale} aria-hidden="true"><span>Y</span><span>R</span><span>B</span><span>G</span><span>Y</span></div>
          <div className={styles.selected}><span style={{ background: color }} />{t("Your selected color")} <strong>{ncsColor.notation}</strong></div>
        </> : <div className={styles.textureGrid}>
          {textures.map(item => <button type="button" key={item[0]} className={texture[0] === item[0] ? styles.selectedTexture : ""} onClick={() => { setTexture(item); setBefore(false); }} aria-pressed={texture[0] === item[0]}>
            <img src={item[1]} alt="" loading="lazy" /><span>{t(item[0])}</span>
          </button>)}
        </div>}
      </div>
      <div className={styles.finishAction}>
        <p>{t("Colours on screen may differ from the finished surface.")}</p>
        <label className={styles.uploadLink}>{t("Use another photo")}
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadPhoto} />
        </label>
      </div>
    </div>

    {notice && <p className={styles.notice} role="alert">{t(notice)}</p>}
    <div className={styles.utilityActions}>
      <button type="button" disabled={!result} onClick={downloadPreview}>{t("Download preview")}</button>
      {source !== sample && <button type="button" onClick={() => { changeSource(sample); setNotice(""); }}>{t("Sample room")}</button>}
    </div>
  </section>;
}
