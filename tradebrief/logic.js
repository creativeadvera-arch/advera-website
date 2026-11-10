(function(root){
 "use strict";
 const DAY=86400000;
 function validTime(value){const time=Date.parse(value);return Number.isFinite(time)?time:null;}
 function freshness(record,now,freshHours){const checked=validTime(record.checkedAt);return checked===null||now-checked>freshHours*3600000||checked>now+300000?"recheck":"checked";}
 function filter(records,options,now){return records.filter(function(r){
  const close=validTime(r.closesAt);if(close===null||close<=now||r.status!=="listed")return false;
  if(options.trade&&r.trade!==options.trade)return false;
  if(options.region&&r.region!==options.region)return false;
  if((close-now)/DAY<Number(options.runway||0))return false;
  const query=(options.search||"").trim().toLowerCase();
  return !query||[r.reference,r.title,r.issuer,r.trade,r.location,r.summary].join(" ").toLowerCase().includes(query);
 }).sort(function(a,b){return validTime(a.closesAt)-validTime(b.closesAt);});}
 function cell(value){let s=String(value==null?"":value);if(/^\s*[=+\-@\t\r]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
 function toCSV(records,now,freshHours){const rows=[["Reference","Opportunity","Issuer","Trade","Location","Closes (AWST offset)","Source checked (UTC)","Freshness","Document review","Official source"]];
 records.forEach(function(r){rows.push([r.reference,r.title,r.issuer,r.trade,r.location,r.closesAt,r.checkedAt,freshness(r,now,freshHours),r.documentReview,r.sourceUrl]);});
 return "\ufeff"+rows.map(function(row){return row.map(cell).join(",");}).join("\r\n")+"\r\n";}
 function icsEscape(s){return String(s).replace(/\\/g,"\\\\").replace(/\r?\n/g,"\\n").replace(/,/g,"\\,").replace(/;/g,"\\;");}
 function toICS(record,now){const start=validTime(record.closesAt);if(start===null)throw new Error("Missing closing date");
 const stamp=function(t){return new Date(t).toISOString().replace(/[-:]/g,"").replace(/\.\d{3}/,"");};
 return ["BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//TradeBrief WA//Opportunity deadline//EN","CALSCALE:GREGORIAN","BEGIN:VEVENT","UID:"+record.id+"@tradebrief.advera","DTSTAMP:"+stamp(now),"DTSTART:"+stamp(start),"DTEND:"+stamp(start+900000),"SUMMARY:"+icsEscape("Closing: "+record.title),"DESCRIPTION:"+icsEscape("Verify the closing time and all requirements on the official portal. "+record.reference+" | "+record.sourceUrl),"URL:"+record.sourceUrl,"END:VEVENT","END:VCALENDAR",""].join("\r\n");}
 function enquiry(fields){return "TradeBrief WA — paid research brief enquiry\n\nTrade / service: "+fields.trade.trim()+"\nService area: "+fields.area.trim()+"\nMinimum preparation time: "+fields.runway+"\nScope notes: "+(fields.notes.trim()||"Not supplied")+"\n\nI'm interested in the indicative A$99 brief for up to three relevant public notices. Please confirm feasibility, scope, final price, timing and payment arrangements before any work begins. This is an enquiry, not an order.";}
 const api={filter:filter,freshness:freshness,toCSV:toCSV,toICS:toICS,enquiry:enquiry};
 root.TradeBrief=api;if(typeof module!=="undefined"&&module.exports)module.exports=api;
})(typeof globalThis!=="undefined"?globalThis:this);
