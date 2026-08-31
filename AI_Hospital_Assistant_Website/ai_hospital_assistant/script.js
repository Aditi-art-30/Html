const appointments=[
 {p:"Priya Shah",d:"Dr. Anjali Mehta",t:"09:30 AM",dep:"Cardiology",s:"Confirmed"},
 {p:"Rahul Patil",d:"Dr. Rohan Deshmukh",t:"10:15 AM",dep:"General Medicine",s:"Waiting"},
 {p:"Sneha Joshi",d:"Dr. Neha Kulkarni",t:"11:00 AM",dep:"Pediatrics",s:"Confirmed"},
 {p:"Arjun More",d:"Dr. Amit Shah",t:"12:30 PM",dep:"Orthopedics",s:"Completed"},
 {p:"Meera Pawar",d:"Dr. Anjali Mehta",t:"02:00 PM",dep:"Cardiology",s:"Confirmed"},
 {p:"Vikram Jadhav",d:"Dr. Rohan Deshmukh",t:"03:30 PM",dep:"General Medicine",s:"Waiting"}];
const patients=[
 ["Priya Shah","PT-1024","Cardiology"],["Rahul Patil","PT-1188","General Medicine"],["Sneha Joshi","PT-1092","Pediatrics"],["Arjun More","PT-1007","Orthopedics"],["Meera Pawar","PT-1261","Cardiology"],["Vikram Jadhav","PT-1113","General Medicine"]];
const doctors=[
 ["Dr. Anjali Mehta","Cardiology","Available"],["Dr. Rohan Deshmukh","General Medicine","Available"],["Dr. Neha Kulkarni","Pediatrics","Available"],["Dr. Amit Shah","Orthopedics","Busy"],["Dr. Kavita Rao","Dermatology","Available"],["Dr. Sameer Joshi","Neurology","Emergency duty"]];

function row(a){return `<tr><td><b>${a.p}</b></td><td>${a.d}</td><td>${a.t}</td><td>${a.dep}</td><td><span class="status ${a.s.toLowerCase()}">${a.s}</span></td></tr>`}
function renderAppointments(list=appointments){document.getElementById("appointmentRows").innerHTML=list.slice(0,5).map(row).join("");document.getElementById("allAppointments").innerHTML=list.map(row).join("");document.getElementById("apptCount").textContent=42+Math.max(0,list.length-6)}
function renderPatients(list=patients){document.getElementById("patientGrid").innerHTML=list.map((p,i)=>`<div class="patient-card"><div class="person">${p[0].split(" ").map(x=>x[0]).join("")}</div><div><b>${p[0]}</b><small>${p[1]} · ${p[2]}</small></div></div>`).join("")}
function renderDoctors(){document.getElementById("doctorGrid").innerHTML=doctors.map(d=>`<div class="doctor-card"><div class="person">⚕</div><div><b>${d[0]}</b><small>${d[1]}</small></div><span class="online" style="${d[2]==="Busy"?"color:#df7c18":""}">${d[2]}</span></div>`).join("")}
function go(page){document.querySelectorAll(".page").forEach(x=>x.classList.remove("active-page"));document.getElementById(page).classList.add("active-page");document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.page===page));document.querySelector(".sidebar").classList.remove("open");window.scrollTo(0,0)}
document.querySelectorAll("[data-page]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.page)));
renderAppointments();renderPatients();renderDoctors();

const modal=document.getElementById("modal");const toast=document.getElementById("toast");
function showToast(t){toast.textContent=t;toast.classList.add("show");setTimeout(()=>toast.classList.remove("show"),2500)}
function openModal(){modal.classList.add("show")}
document.getElementById("newAppointment").onclick=openModal;document.getElementById("newAppointment2").onclick=openModal;document.getElementById("closeModal").onclick=()=>modal.classList.remove("show");
modal.addEventListener("click",e=>{if(e.target===modal)modal.classList.remove("show")});
document.getElementById("appointmentForm").addEventListener("submit",e=>{e.preventDefault();appointments.push({p:patientName.value,d:doctorName.value,t:new Date("1970-01-01T"+apptTime.value).toLocaleTimeString([], {hour:"2-digit",minute:"2-digit"}),dep:department.value,s:"Confirmed"});renderAppointments();modal.classList.remove("show");e.target.reset();showToast("Appointment created successfully");});

document.getElementById("apptFilter").addEventListener("input",filterAppt);document.getElementById("statusFilter").addEventListener("change",filterAppt);
function filterAppt(){const q=apptFilter.value.toLowerCase(),s=statusFilter.value;renderAppointments(appointments.filter(a=>(a.p+a.d+a.dep).toLowerCase().includes(q)&&(s==="All statuses"||a.s===s)))}
document.getElementById("patientFilter").addEventListener("input",e=>renderPatients(patients.filter(p=>p[0].toLowerCase().includes(e.target.value.toLowerCase()))));
document.getElementById("addPatient").onclick=()=>showToast("Patient registration module is ready for integration");
document.getElementById("saveSettings").onclick=()=>showToast("Settings saved");

document.getElementById("menu").onclick=()=>document.querySelector(".sidebar").classList.toggle("open");
document.querySelectorAll("[data-question]").forEach(b=>b.addEventListener("click",()=>{go("assistant");sendMessage(b.dataset.question)}));
function sendMessage(text){addMessage(text,"user");setTimeout(()=>addMessage(aiReply(text),"bot"),350)}
function addMessage(text,type){const box=document.getElementById("messages"),div=document.createElement("div");div.className="message "+type;div.textContent=text;box.appendChild(div);box.scrollTop=box.scrollHeight}
function aiReply(q){q=q.toLowerCase();if(q.includes("appointment"))return `There are ${appointments.length} sample appointments in today's schedule. The next one is ${appointments[0].p} with ${appointments[0].d} at ${appointments[0].t}.`;if(q.includes("doctor"))return "Currently, Dr. Anjali Mehta, Dr. Rohan Deshmukh, Dr. Neha Kulkarni and Dr. Kavita Rao are available. Dr. Sameer Joshi is on emergency duty.";if(q.includes("summary"))return "Today's demo summary: 42 appointments, 1,284 registered patients, 18 available doctors and 7 pending reports.";if(q.includes("register")||q.includes("patient"))return "To register a patient, open Patients → Add Patient, enter the patient's details, verify them, and save the record. This demo currently shows sample records.";if(q.includes("hello")||q.includes("hi"))return "Hello! How can I help with the hospital dashboard today?";return "I can help with appointments, doctors, patients, departments and hospital workflows. Try asking: “What appointments are coming up?”";}
document.getElementById("chatForm").addEventListener("submit",e=>{e.preventDefault();const v=document.getElementById("chatInput").value.trim();if(v){document.getElementById("chatInput").value="";sendMessage(v)}});
document.getElementById("globalSearch").addEventListener("keydown",e=>{if(e.key==="Enter"){const q=e.target.value.toLowerCase();if(appointments.some(a=>(a.p+a.d).toLowerCase().includes(q))){go("appointments");document.getElementById("apptFilter").value=q;filterAppt()}else if(patients.some(p=>p[0].toLowerCase().includes(q))){go("patients");document.getElementById("patientFilter").value=q;document.getElementById("patientFilter").dispatchEvent(new Event("input"))}else{go("assistant");sendMessage("Search for "+q)}}});
