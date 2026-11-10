import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import {mkdirSync} from 'node:fs';
import {pathToFileURL} from 'node:url';
const require=createRequire(import.meta.url),{build}=require(createRequire(require.resolve('vite')).resolve('esbuild'));
mkdirSync('.sites-runtime/source-tests',{recursive:true});
function pdf(){const bodies=['<< /Type /Catalog /Pages 2 0 R >>','<< /Type /Pages /Kids [3 0 R 5 0 R] /Count 2 >>','<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 7 0 R >> >> /Contents 4 0 R >>',stream('Retrieval reveals gaps in an explanation.'),'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 7 0 R >> >> /Contents 6 0 R >>',stream('Feedback helps correct an explanation.'),'<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'];let out='%PDF-1.4\n',offsets=[0];for(const [i,b]of bodies.entries()){offsets.push(Buffer.byteLength(out));out+=(i+1)+' 0 obj\n'+b+'\nendobj\n'}const start=Buffer.byteLength(out);out+='xref\n0 8\n0000000000 65535 f \n'+offsets.slice(1).map(o=>String(o).padStart(10,'0')+' 00000 n \n').join('')+'trailer\n<< /Size 8 /Root 1 0 R >>\nstartxref\n'+start+'\n%%EOF';return new TextEncoder().encode(out)}
function stream(text){const body='BT /F1 14 Tf 72 720 Td ('+text+') Tj ET';return '<< /Length '+body.length+' >>\nstream\n'+body+'\nendstream'}
const bytes=pdf();globalThis.__sourceTestEnv={BUCKET:{async get(){return {async arrayBuffer(){return bytes.buffer.slice(0)}}}}};
for(const name of ['source-index','source-trust','revision'])await build({entryPoints:['lib/'+name+'.ts'],outfile:'.sites-runtime/source-tests/'+name+'.mjs',platform:'node',format:'esm',bundle:true,define:{'import.meta.env.DEV':'false'},plugins:[{name:'bindings',setup(b){b.onResolve({filter:/^cloudflare:workers$/},()=>({path:'env',namespace:'test'}));b.onLoad({filter:/.*/,namespace:'test'},()=>({contents:'export const env=globalThis.__sourceTestEnv;'}))}}]});
const load=name=>import(pathToFileURL(process.cwd()+'/.sites-runtime/source-tests/'+name+'.mjs'));
const {buildSourceIndex}=await load('source-index'),{matchEvidence}=await load('source-trust'),{nextReview}=await load('revision');
const index=await buildSourceIndex({files:[{name:'learning.pdf',type:'application/pdf',size:bytes.length,key:'test'}],text:'Spacing separates practice sessions.',level:'Beginner',language:'English',goal:'Learn'});
assert.equal(index.documents.find(d=>d.kind==='pdf').status,'indexed');assert.equal(index.documents.find(d=>d.kind==='pdf').indexedPages,2);
assert.equal(matchEvidence({file:'learning.pdf',location:'AI guessed page 99',quote:'Feedback helps correct an explanation.'},index).location,'PDF page 2');
assert.equal(matchEvidence({file:'Pasted notes',location:'unknown',quote:'SPACING separates practice sessions.'},index).status,'matched');
assert.equal(matchEvidence({file:'learning.pdf',location:'PDF page 1',quote:'Invented source sentence.'},index).status,'not_found');
assert.equal(matchEvidence({file:'missing.docx',location:'page 1',quote:'Retrieval reveals gaps'},index).status,'not_indexed');
assert.equal(matchEvidence({file:'learning.pdf',location:'page 1',quote:''},index).status,'empty');
assert.equal(nextReview(0,'Again',0).due,600000);assert.equal(nextReview(1,'Remembered',0).interval,3);assert.equal(nextReview(14,'Remembered',0).interval,30);assert.equal(nextReview(30,'Needs practice',0).interval,1);
console.log('PASS real two-page PDF extraction, corrected page locations, normalised pasted-source matching, unmatched/missing evidence and recall intervals');
