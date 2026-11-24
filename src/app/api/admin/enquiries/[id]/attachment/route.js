import { sql } from "@/lib/db";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/session";

export async function GET(request, { params }) {
  const session = await verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
  if (!session) return new Response(null, { status: 401 });
  const { id } = await params;
  const [file] = await sql`select media_type, content from property_listing_attachments where consultation_id = ${id}`;
  if (!file) return new Response(null, { status: 404 });
  const extensions = { "image/jpeg": "jpg", "image/png": "png", "application/pdf": "pdf" };
  return new Response(file.content, { headers: {
    "Content-Type": "application/octet-stream",
    "Content-Disposition": `attachment; filename="property.${extensions[file.media_type]}"`,
    "X-Content-Type-Options": "nosniff",
    "Cache-Control": "private, no-store"
  } });
}
