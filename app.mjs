export const groups = [
 ['Kontakt',[
 ['name','Dein Vor- und Nachname','text','Lea Beispiel'],['className','Klasse (optional)','text','F3a'],['salutation','Anrede','select',''],['teacher','Nachname der Lehrperson','text','Muster'],['email','E-Mail der Lehrperson (optional)','email','name@schule.ch']]],
 ['Thema und Motivation',[
 ['topic','Mein Thema','textarea','dem Einfluss sozialer Medien auf das politische Interesse von Jugendlichen','Ergänzt: «… möchte ich mich mit … beschäftigen.»'],['motivation','Warum interessiert mich das?','textarea','ich wissen möchte, wie Jugendliche zu politischen Informationen kommen','Ergänzt: «Ich interessiere mich dafür, weil …»'],['connection','Warum diese Lehrperson?','textarea','das Fach Geschichte unterrichten und wir bereits über politische Kommunikation gesprochen haben','Ergänzt: «Da Sie …»']]],
 ['Fokus und Fragestellung',[
 ['aspect','Was interessiert mich besonders?','textarea','die Rolle der Algorithmen bei der Auswahl politischer Inhalte','Ergänzt: «Besonders interessiert mich …»'],['scope','Wie grenze ich das Thema ein?','textarea','Jugendliche zwischen 16 und 20 Jahren in der Schweiz','Ergänzt: «Ich möchte mich dabei auf … konzentrieren.»'],['question','Meine vorläufige Fragestellung','textarea','Wie beeinflussen TikTok und Instagram das politische Interesse von Jugendlichen?','Formuliere eine konkrete, untersuchbare Frage.']]],
 ['Vorgehen und offene Fragen',[
 ['method','Methode und Arbeitsschritte','textarea','zunächst Fachliteratur auszuwerten und anschliessend eine Umfrage unter Schülerinnen und Schülern durchzuführen','Ergänzt: «… plane ich, …»'],['goal','Was möchte ich herausfinden?','textarea','wie Jugendliche politische Inhalte wahrnehmen und beurteilen','Ergänzt: «Dadurch möchte ich herausfinden, …»'],['challenge','Was ist noch offen?','textarea','ich die genaue Fragestellung und die Methode noch weiter präzisieren muss','Ergänzt: «Mir ist bewusst, dass …»']]]
];
export const example = {name:'Lea Beispiel',className:'F3a',salutation:'Frau',teacher:'Muster',email:'',...Object.fromEntries(groups.slice(1).flatMap(g=>g[1].map(f=>[f[0],f[3]])))};
const clean = s => String(s ?? '').trim();
const fragment = s => clean(s).replace(/[.!?]+$/u,'');
export const workTypes = {sa:{label:'Selbständige Arbeit',genitive:'Selbständigen Arbeit',short:'SA',file:'Selbstaendige_Arbeit'},ma:{label:'Maturarbeit',genitive:'Maturarbeit',short:'MA',file:'Maturarbeit'}};
export function changeWorkType(text,type){
 const target=workTypes[type]||workTypes.sa;
 return text.replace(/Selbständigen Arbeit|Selbständige Arbeit|Maturarbeit/g,match=>match==='Selbständige Arbeit'?target.label:target.genitive);
}
export function generate(d){
 const work=workTypes[d.workType]||workTypes.sa;
 const v=(key,label)=>fragment(d[key])||`[${label}]`;
 const greeting = d.salutation==='neutral' ? `Guten Tag ${clean(d.teacher)||'[Name der Lehrperson]'}` : `Guten Tag ${d.salutation||'Frau'} ${clean(d.teacher)||'[Nachname]'}`;
 return {subject:`Anfrage zur Betreuung meiner ${work.genitive}`,body:`${greeting}\n\nIm Rahmen meiner ${work.genitive} möchte ich mich mit ${v('topic','Thema')} beschäftigen. Ich interessiere mich dafür, weil ${v('motivation','persönliche Motivation')}. Da Sie ${v('connection','Bezug zum Fach oder zur Lehrperson')}, könnte ich mir gut vorstellen, meine Arbeit unter Ihrer Betreuung zu verfassen.\n\nBesonders interessiert mich ${v('aspect','konkreter Aspekt')}. Ich möchte mich dabei auf ${v('scope','Eingrenzung')} konzentrieren. Meine vorläufige Fragestellung lautet: ${clean(d.question)||'[Fragestellung]'}\n\nUm diese Frage zu untersuchen, plane ich, ${v('method','Methode und Arbeitsschritte')}. Dadurch möchte ich herausfinden, ${v('goal','Erkenntnisziel')}. Mir ist bewusst, dass ${v('challenge','offene Fragen oder Herausforderungen')}.\n\nDeshalb möchte ich Sie fragen, ob Sie grundsätzlich bereit wären, die Betreuung meiner ${work.genitive} zu übernehmen. Gerne würde ich Ihnen meine bisherigen Überlegungen in einem kurzen Gespräch vorstellen und mit Ihnen besprechen, ob das Vorhaben in dieser Form sinnvoll und realisierbar ist.\n\nIch würde mich sehr über eine Rückmeldung freuen.\n\nFreundliche Grüsse\n${clean(d.name)||'[Vorname Nachname]'}${clean(d.className)?'\n'+clean(d.className):''}`};
}
const xml=s=>s.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g,'').replace(/[<>&"']/g,c=>({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;',"'":'&apos;'}[c]));
// Dependency-free ZIP writer (stored entries, UTF-8) for standard Office Open XML.
export function zip(files){
 const encoder=new TextEncoder(),parts=[],central=[];let offset=0;
 const block=(size)=>{const a=new Uint8Array(size);return [a,new DataView(a.buffer)]};
 for(const [name,value] of Object.entries(files)){
  const n=encoder.encode(name),data=encoder.encode(value);let crc=0xffffffff;
  for(const b of data){crc^=b;for(let k=0;k<8;k++)crc=(crc>>>1)^((crc&1)?0xedb88320:0)}crc=(crc^0xffffffff)>>>0;
  const [h,v]=block(30);v.setUint32(0,0x04034b50,true);v.setUint16(4,20,true);v.setUint16(6,0x800,true);v.setUint16(12,33,true);v.setUint32(14,crc,true);v.setUint32(18,data.length,true);v.setUint32(22,data.length,true);v.setUint16(26,n.length,true);
  parts.push(h,n,data);
  const [c,w]=block(46);w.setUint32(0,0x02014b50,true);w.setUint16(4,20,true);w.setUint16(6,20,true);w.setUint16(8,0x800,true);w.setUint16(14,33,true);w.setUint32(16,crc,true);w.setUint32(20,data.length,true);w.setUint32(24,data.length,true);w.setUint16(28,n.length,true);w.setUint32(42,offset,true);central.push(c,n);offset+=h.length+n.length+data.length;
 }
 const size=central.reduce((a,b)=>a+b.length,0),[end,e]=block(22);e.setUint32(0,0x06054b50,true);e.setUint16(8,Object.keys(files).length,true);e.setUint16(10,Object.keys(files).length,true);e.setUint32(12,size,true);e.setUint32(16,offset,true);
 const all=[...parts,...central,end],out=new Uint8Array(offset+size+22);let pos=0;for(const a of all){out.set(a,pos);pos+=a.length}return out;
}
export function docx(subject,body){
 const p=(text,bold=false)=>`<w:p><w:pPr><w:spacing w:after="100"/></w:pPr><w:r><w:rPr><w:rFonts w:ascii="Calibri" w:hAnsi="Calibri"/><w:sz w:val="22"/>${bold?'<w:b/>':''}</w:rPr><w:t xml:space="preserve">${xml(text)}</w:t></w:r></w:p>`;
 return zip({'[Content_Types].xml':'<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>',
 '_rels/.rels':'<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>',
 'word/document.xml':`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>${p(subject,true)}${p('')}${body.split('\n').map(t=>p(t)).join('')}<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr></w:body></w:document>`});
}
if(typeof document!=='undefined'){
 const $=id=>document.getElementById(id),form=$('form');let edited=false,workType='sa';
 for(const [i,[title,fields]] of groups.entries()){
  const fs=document.createElement('fieldset'),legend=document.createElement('legend');legend.innerHTML=`<span class="number">0${i+1}</span>${title}`;fs.append(legend);const grid=document.createElement('div');grid.className='fields';
  for(const [id,label,type,placeholder,help] of fields){const wrap=document.createElement('div');wrap.className='field'+(type==='textarea'||id==='email'?' wide':'');const l=document.createElement('label');l.htmlFor=id;l.textContent=label;let input=document.createElement(type==='textarea'?'textarea':type==='select'?'select':'input');input.id=id;input.name=id;
   if(type==='select'){for(const [val,text] of [['Frau','Frau'],['Herr','Herr'],['neutral','Neutral (ganzer Name)']]){const o=document.createElement('option');o.value=val;o.textContent=text;input.append(o)}}else{if(type!=='textarea')input.type=type;input.placeholder=placeholder}wrap.append(l,input);if(help){const h=document.createElement('p');h.id=id+'-help';h.className='help';h.textContent=help;input.setAttribute('aria-describedby',h.id);wrap.append(h)}grid.append(wrap)}fs.append(grid);form.append(fs);
 }
 const checks=['Ich habe erklärt, weshalb mich das Thema interessiert.','Ich habe begründet, weshalb ich diese Lehrperson anfrage.','Mein Thema ist eingegrenzt und meine Fragestellung erkennbar.','Ich habe beschrieben, wie ich vorgehen möchte.','Ich habe eine konkrete Anfrage formuliert.','Mein E-Mail ist sprachlich korrekt, höflich und vollständig.'];
 for(const text of checks){const l=document.createElement('label'),c=document.createElement('input');c.type='checkbox';l.append(c,document.createTextNode(text));$('checklist').append(l)}
 const data=()=>({...Object.fromEntries(new FormData(form)),workType});
 function updateWorkUI(){const work=workTypes[workType];$('work-short').textContent=work.short;$('work-heading').textContent=work.label.toLocaleUpperCase('de-CH');document.title=`Betreuungsanfrage ${work.label} · Schreibwerkstatt`;document.querySelectorAll('[data-work-type]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.workType===workType)))}
 document.querySelectorAll('[data-work-type]').forEach(button=>button.addEventListener('click',()=>{if(button.dataset.workType===workType)return;workType=button.dataset.workType;for(const id of ['subject','body'])$(id).value=changeWorkType($(id).value,workType);updateWorkUI();notify(`Auf ${workTypes[workType].label} umgestellt. Eingaben und eigene Textänderungen bleiben erhalten.`)}));
 updateWorkUI();
 const notify=text=>$('status').textContent=text;
 function update(){const d=data(),r=generate(d);$('subject').value=r.subject;$('body').value=r.body;edited=false;const required=groups.flatMap(g=>g[1]).filter(f=>!['email','className','salutation'].includes(f[0]));const missing=required.filter(f=>!clean(d[f[0]]));$('progress').textContent=`${required.length-missing.length} / ${required.length} ausgefüllt`;$('missing').textContent=missing.length?'Noch offen: '+missing.map(f=>f[1]).join(' · '):'Alle Angaben sind ausgefüllt. Lies deinen Entwurf nochmals durch.';notify('')}
 form.addEventListener('input',update);for(const id of ['body','subject'])$(id).addEventListener('input',()=>{edited=true;notify('Vorschau angepasst. Kopieren und Export verwenden diesen Text.')});
 function canExport(){if(/\[[^\]\n]+\]/.test($('body').value)){notify('Bitte ersetze zuerst die Platzhalter in der Vorschau oder ergänze die fehlenden Angaben.');return false}if(!$('subject').value.trim()||!$('body').value.trim()){notify('Bitte ergänze Betreff und Mailtext.');return false}return true}
 const full=()=>`Betreff: ${$('subject').value}\n\n${$('body').value}`;
 function download(bytes,type,name){const url=URL.createObjectURL(new Blob([bytes],{type})),a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),10000);notify('Datei wurde zum Herunterladen bereitgestellt.')}
 $('copy').onclick=async()=>{if(!canExport())return;try{await navigator.clipboard.writeText(full());notify('Betreff und Mailtext wurden kopiert.')}catch{notify('Kopieren ist hier nicht verfügbar. Markiere und kopiere den Text in der Vorschau.')}};
 $('txt').onclick=()=>{if(canExport())download('\uFEFF'+full(),'text/plain;charset=utf-8',`Betreuungsanfrage_${workTypes[workType].file}.txt`)};
 $('docx').onclick=()=>{if(canExport())download(docx($('subject').value,$('body').value),'application/vnd.openxmlformats-officedocument.wordprocessingml.document',`Betreuungsanfrage_${workTypes[workType].file}.docx`)};
 $('mail').onclick=()=>{if(!canExport())return;const email=$('email');if(!email.checkValidity()){email.reportValidity();return}const url=`mailto:${encodeURIComponent(email.value.trim())}?subject=${encodeURIComponent($('subject').value)}&body=${encodeURIComponent($('body').value)}`;location.href=url;notify('Mailprogramm angefragt. Falls der Text dort gekürzt wird, nutze «Mailtext kopieren».')};
 $('print').onclick=()=>{if(!canExport())return;const article=document.createElement('div');article.id='print-content';article.style.cssText='white-space:pre-wrap;font:11pt/1.5 Arial;color:black';article.textContent=full();document.body.append(article);const style=document.createElement('style');style.textContent='@media print{body>header,body>main,body>footer{display:none!important}#print-content{display:block!important}}@media screen{#print-content{display:none}}';document.head.append(style);window.print();article.remove();style.remove()};
 function replaceAllowed(){return (!edited&&!Object.entries(data()).some(([k,v])=>!['salutation','workType'].includes(k)&&clean(v)))||confirm('Aktuelle Eingaben und Änderungen in der Vorschau ersetzen?')}
 $('example').onclick=()=>{if(!replaceAllowed())return;for(const [k,v]of Object.entries(example))$(k).value=v;document.querySelectorAll('#checklist input').forEach(c=>c.checked=false);update()};
 $('reset').onclick=()=>{if(!replaceAllowed())return;form.reset();document.querySelectorAll('#checklist input').forEach(c=>c.checked=false);update();$('name').focus()};update();
}
