import { ADMIN_SESSION_COOKIE,verifyAdminSession } from "@/lib/session";
import { notifyRequest } from "@/lib/requestNotifications";
export async function POST(request,{params}) {
  if(!await verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) return new Response(null,{status:401});
  const {id}=await params;
  return new Response(null,{status:await notifyRequest(id)?204:503});
}
