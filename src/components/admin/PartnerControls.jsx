"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PartnerControls({id}) {
  const [notice,setNotice]=useState("");
  const router=useRouter();
  async function submit(event) {
    event.preventDefault();
    const data=Object.fromEntries(new FormData(event.currentTarget));
    const action=event.nativeEvent.submitter?.value;
    setNotice("Saving…");
    try {
      const res=await fetch(id ? "/api/admin/enquiries/"+id+"/partner" : "/api/customer/partner",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,action})});
      if(!res.ok) throw new Error();
      setNotice(action==="invite"?"Invitation sent.":"Saved.");
      router.refresh();
    } catch {setNotice(id?"Could not complete this action. Check approval, mail configuration and project reference.":"The code is invalid or expired for this account.");}
  }
  return id ? <details><summary>Partner access and assignments</summary><form onSubmit={submit}>
    <button value="invite" disabled={notice==="Saving…"}>Email activation code</button>
    <label>Project ID <input name="project"/></label>
    <label>Brief visible to the partner <textarea name="brief" maxLength={1500}/></label>
    <button value="assign" disabled={notice==="Saving…"}>Assign project</button> <button value="remove" disabled={notice==="Saving…"}>Remove assignment</button>
    <p role="status">{notice}</p>
  </form></details> : <form onSubmit={submit}><label>Activation code <input name="token" autoComplete="off" required minLength={48} maxLength={48}/></label> <button disabled={notice==="Saving…"}>Activate partner access</button><p role="status">{notice}</p></form>;
}
