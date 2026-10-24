import {test} from 'node:test';
import assert from 'node:assert/strict';
import {generate,example,docx} from './app.mjs';
test('vollständiges Beispiel folgt dem Gerüst und enthält keine Platzhalter',()=>{const r=generate(example);assert.ok(!/\[/.test(r.body));assert.ok(r.body.startsWith('Guten Tag Frau Muster\n\n'));assert.ok(r.body.endsWith('Lea Beispiel\nF3a'));assert.match(r.body,/grundsätzlich bereit/);assert.match(r.body,/Wie beeinflussen TikTok/)});
test('leere Angaben bleiben als erkennbare Platzhalter erhalten',()=>assert.match(generate({}).body,/\[Thema\]/));
test('neutrale Anrede, optionale Klasse und Satzschluss',()=>{const r=generate({...example,salutation:'neutral',teacher:'Alex Muster',className:'',topic:'einem Thema.'});assert.ok(r.body.startsWith('Guten Tag Alex Muster'));assert.ok(r.body.endsWith('Lea Beispiel'));assert.ok(!r.body.includes('Thema. beschäftigen'))});
test('DOCX ist ein ZIP-Paket und maskiert Sonderzeichen',()=>{const bytes=docx('Test & Prüfung','<Text>\nGrüsse');assert.equal(new DataView(bytes.buffer).getUint32(0,true),0x04034b50);const decoded=new TextDecoder().decode(bytes);assert.ok(decoded.includes('Test &amp; Prüfung'));assert.ok(decoded.includes('&lt;Text&gt;'));assert.ok(decoded.includes('word/document.xml'))});
