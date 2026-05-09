import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const PAGE_WIDTH = 794;
const PAGE_HEIGHT = 1123;

function getExportTarget(): HTMLElement | null {
  const exportRoot = document.querySelector<HTMLElement>("[data-export-root]");
  if (exportRoot) {
    const exportTarget = exportRoot.querySelector<HTMLElement>("#cv-preview-content");
    if (exportTarget) return exportTarget;
  }

  const targets = Array.from(document.querySelectorAll<HTMLElement>("#cv-preview-content"));
  if (targets.length === 0) return null;

  const visibleTarget = targets.find((target) => {
    const rect = target.getBoundingClientRect();
    const style = window.getComputedStyle(target);
    return rect.width > 0 && rect.height > 0 && style.display !== "none" && style.visibility !== "hidden";
  });

  return visibleTarget ?? targets[0] ?? null;
}

export async function exportCVToPDF(fullName?: string): Promise<void> {
  const target = getExportTarget();
  if (!target) {
    throw new Error("Preview content not found.");
  }

  const canvas = await html2canvas(target, {
    scale: 2,
    useCORS: true,
    backgroundColor: "#ffffff",
  });

  const imgWidth = PAGE_WIDTH;
  const imgHeight = (canvas.height * PAGE_WIDTH) / canvas.width;
  const pageCount = Math.ceil(imgHeight / PAGE_HEIGHT);

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "px",
    format: [PAGE_WIDTH, PAGE_HEIGHT],
  });

  for (let page = 0; page < pageCount; page++) {
    if (page > 0) pdf.addPage();

    const srcY = page * PAGE_HEIGHT * (canvas.width / PAGE_WIDTH);
    const srcHeight = Math.min(
      PAGE_HEIGHT * (canvas.width / PAGE_WIDTH),
      canvas.height - srcY,
    );
    const destHeight = srcHeight * (PAGE_WIDTH / canvas.width);

    // Create a canvas slice for this page
    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = canvas.width;
    pageCanvas.height = srcHeight;
    const ctx = pageCanvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context.");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
    ctx.drawImage(
      canvas,
      0,
      srcY,
      canvas.width,
      srcHeight,
      0,
      0,
      canvas.width,
      srcHeight,
    );

    const pageImgData = pageCanvas.toDataURL("image/png");
    pdf.addImage(pageImgData, "PNG", 0, 0, imgWidth, destHeight);
  }

  const fileName = fullName?.trim() ? `${fullName.trim()}-CV.pdf` : "cv.pdf";
  pdf.save(fileName);
}
