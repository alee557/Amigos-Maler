import { NextResponse } from "next/server";
import { addProjectPhoto } from "@/lib/offerCalculator/store";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif", "application/pdf"]);

function matchesFileType(type, buffer) {
  if (type === "image/jpeg") return buffer.subarray(0, 3).equals(Buffer.from("ffd8ff", "hex"));
  if (type === "image/png") return buffer.subarray(0, 8).equals(Buffer.from("89504e470d0a1a0a", "hex"));
  if (type === "image/webp") return buffer.subarray(0, 4).toString() === "RIFF" && buffer.subarray(8, 12).toString() === "WEBP";
  if (type === "application/pdf") return buffer.subarray(0, 5).toString() === "%PDF-";
  return buffer.subarray(4, 8).toString() === "ftyp" && /^(?:hei[cfmxs]|mif1|msf1)$/.test(buffer.subarray(8, 12).toString());
}

export async function POST(request) {
  if (Number(request.headers.get("content-length")) > MAX_FILE_SIZE + 1024 * 1024) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }
  const formData = await request.formData().catch(() => null);
  if (!formData) return NextResponse.json({ error: "Form data is required." }, { status: 400 });
  const sessionId = String(formData.get("sessionId") || "");
  const category = String(formData.get("category") || "Other").slice(0, 80);
  const file = formData.get("photo");

  if (!sessionId) {
    return NextResponse.json({ error: "Calculation session is required." }, { status: 400 });
  }

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Photo file is required." }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Please upload a JPG, PNG, WEBP, HEIC, HEIF or PDF file." }, { status: 400 });
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "Please keep each file under 10 MB." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  if (!matchesFileType(file.type, buffer)) {
    return NextResponse.json({ error: "The uploaded file content does not match its type." }, { status: 415 });
  }
  const dataUrl = `data:${file.type};base64,${buffer.toString("base64")}`;
  const result = await addProjectPhoto({
    sessionId,
    category,
    file: {
      name: file.name,
      type: file.type,
      size: file.size,
      dataUrl
    }
  });

  if (result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({ ok: true, photo: result.photo });
}
