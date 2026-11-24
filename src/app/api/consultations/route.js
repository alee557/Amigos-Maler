import { NextResponse } from "next/server";
import { createConsultationRequest } from "@/lib/customerStore";
import { notifyRequest } from "@/lib/requestNotifications";
import { SESSION_COOKIE, verifyCustomerSession } from "@/lib/session";
import { cleanText, validateConsultationInput } from "@/lib/validation";

import { validWorkDate, validConsultationPreference } from "@/lib/workDates";
import { requestDetails } from "@/lib/requestFields";

export const runtime = "nodejs";

export async function POST(request) {
  if (Number(request.headers.get("content-length")) > 4 * 1024 * 1024) {
    return NextResponse.json({ error: "Request too large." }, { status: 413 });
  }
  const formData = await request.formData().catch(() => null);
  if (!formData) return NextResponse.json({ error: "Form data is required." }, { status: 400 });
  const validation = validateConsultationInput({
    name: formData.get("name") || formData.get("Name"),
    email: formData.get("email") || formData.get("Email"),
    projectType: formData.get("projectType") || formData.get("Project type"),
    message: formData.get("message") || formData.get("Message")
  });

  if (!validation.valid) {
    return NextResponse.json({ error: "Please fix the highlighted fields.", errors: validation.errors }, { status: 400 });
  }

  const execution = formData.get("requestPurpose") === "Execution";
  const consultationDay = formData.get("consultationDay") || "";
  const consultationTime = formData.get("consultationTime") || "";
  if (!validConsultationPreference(consultationDay, consultationTime)) return NextResponse.json({error:"Invalid consultation date or time."}, {status:400});
  if (!execution && consultationDay) validation.values.message += `\nConsultation preference (Europe/Zurich): ${consultationDay} ${consultationTime}. Pending team confirmation.`;
  const workDay = execution ? formData.get("workDay") : "";
  if (execution && !["Property Preservation","Painting","Plastering","Renovation","Other"].includes(validation.values.projectType)) return new Response(null,{status:400});
  const workEnd = execution ? formData.get("workEnd") || workDay : "";
  if (workEnd && (!workDay || !validWorkDate(workEnd) || workEnd < workDay || (Date.parse(workEnd)-Date.parse(workDay))/86400000 > 365)) return new Response(null,{status:400});
  if (workDay && !validWorkDate(workDay)) return new Response(null,{status:400});
  if (execution) validation.values.message += "\nExecution start preference: " + (workDay || "Arrange with team") + (workEnd && workEnd !== workDay ? " – " + workEnd : "");
  let attachment;
  if (validation.values.projectType === "Property listing") {
    const type = formData.get("propertyType");
    const purpose = formData.get("purpose");
    const region = cleanText(formData.get("region"));
    if (!["House", "Apartment", "Commercial property"].includes(type) || !["Sell", "Rent"].includes(purpose) || !region || region.length > 120) {
      return NextResponse.json({ error: "Invalid listing details." }, { status: 400 });
    }
    const details = [type, purpose, region, validation.values.message];
    if (formData.get("updates")) details.push("Requested project updates.");
    if (formData.get("longTerm")) details.push("Interested in a long-term partnership.");
    validation.values.message = details.join("\n");
  }
  const details = requestDetails(validation.values.projectType, formData);
  if (!details) return NextResponse.json({ error: "Invalid request details." }, { status: 400 });
  if (details.length) validation.values.message = [...details, validation.values.message].join("\n");
  if (["Property listing", "Damage report", "Partner application", "Visualizer enquiry"].includes(validation.values.projectType)) {
    const file = formData.get("upload");
    if (file?.size) {
      if (file.size > 3 * 1024 * 1024) return NextResponse.json({ error: "File too large." }, { status: 413 });
      const bytes = Buffer.from(await file.arrayBuffer());
      const signatures = { "image/jpeg": "ffd8ff", "image/png": "89504e470d0a1a0a", "application/pdf": "255044462d" };
      const signature = Object.hasOwn(signatures, file.type) && signatures[file.type];
      if (!signature || !bytes.subarray(0, signature.length / 2).equals(Buffer.from(signature, "hex"))) {
        return NextResponse.json({ error: "Unsupported attachment." }, { status: 415 });
      }
      attachment = { type: file.type, bytes };
    }
  }
  const session = await verifyCustomerSession(request.cookies.get(SESSION_COOKIE)?.value);
  const phone = cleanText(formData.get("phone") || formData.get("Phone"));
  let result;

  try {
    result = await createConsultationRequest({
      customerEmail: session?.email,
      ...validation.values,
      attachment,
      workDay,
      execution,
      workEnd,
      metadata: { publicRequest: true, locale: ["de","en","es"].includes(formData.get("locale")) ? formData.get("locale") : "de",
        source: typeof formData.get("source") === "string" ? formData.get("source").slice(0,150) : null },
      phone
    });

    try {
      await notifyRequest(result.consultation.id);
    } catch (emailError) {
      console.error("Consultation notification e-mail failed:", emailError);
    }
  } catch (error) {
    if (error.code === "WORK_DAY_UNAVAILABLE") return NextResponse.json({error:"This date is no longer available."},{status:409});
    console.error("Consultation request failed:", error);
    return NextResponse.json({ error: "Unable to save your enquiry right now." }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    message: "Your enquiry has been saved.",
    ...result
  });
}
