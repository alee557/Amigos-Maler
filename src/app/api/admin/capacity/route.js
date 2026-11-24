import { sql } from "@/lib/db";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/session";
import { validWorkDate } from "@/lib/workDates";

export async function PUT(request) {
  if (!await verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) return new Response(null,{status:401});
  const {day, availability} = await request.json().catch(()=>({}));
  if (!validWorkDate(day) || !["available","limited","unavailable"].includes(availability)) return new Response(null,{status:400});
  await sql`insert into execution_capacity(work_day,availability) values(${day}::date,${availability})
    on conflict(work_day) do update set availability=excluded.availability`;
  return Response.json({ok:true});
}
