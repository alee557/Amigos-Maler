"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "./LanguageProvider";

export default function ExecutionDate({value,onChange,endDay,setEndDay}) {
  const { t }=useLanguage();
  const [days,setDays]=useState([]);
  useEffect(()=>{
    const control=new AbortController();
    fetch("/api/capacity",{signal:control.signal,cache:"no-store"}).then(r=>r.ok?r.json():[]).then(setDays).catch(()=>{});
    return ()=>control.abort();
  },[]);
  const possibleEnds=[];
  if(value) {
    let next=Date.parse(value)+86400000;
    for(const entry of days.filter(d=>d.day>value)) {
      if(Date.parse(entry.day)!==next || entry.availability==="unavailable") break;
      possibleEnds.push(entry.day); next+=86400000;
    }
  }
  return <><label><span>{t("Preferred start date")}</span>
    <select value={value} onChange={e=>onChange(e.target.value)}>
      <option value="">{t("Arrange a date with the team")}</option>
      {days.map(({day,availability})=><option key={day} value={day} disabled={availability==="unavailable"}>{day} · {{available:"🟢",limited:"🟡",unavailable:"🔴"}[availability]} {t({available:"Available",limited:"Limited",unavailable:"Unavailable"}[availability])}</option>)}
    </select>
  </label>{value && <label>{t("Preferred end date")}<select value={endDay} onChange={e=>setEndDay(e.target.value)}><option value="">{value}</option>{possibleEnds.map(day=><option key={day}>{day}</option>)}</select></label>}</>;
}
