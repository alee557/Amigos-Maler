import { sql } from "@/lib/db";
import { swissToday } from "@/lib/workDates";

export async function GET() {
  try {
    const rows = await sql`select to_char(work_day,'YYYY-MM-DD') as day, availability from execution_capacity
      where work_day >= ${swissToday()}::date order by work_day limit 366`;
    return Response.json(rows, {headers:{"Cache-Control":"no-store"}});
  } catch {
    return Response.json({ error: "Calendar unavailable." }, {status:503});
  }
}
