import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {answered,correct,eligible,submit,newAttempt,retake,fullForm,quotas,cumulative,sectionPractice,remainingSeconds} from '../app/engine.js';
const bank=JSON.parse(readFileSync(new URL('../app/questions.json',import.meta.url)));
const sections=JSON.parse(readFileSync(new URL('../app/sections.json',import.meta.url)));
const ids=items=>items.map(q=>q.id).sort();
test('expanded questions have unique IDs and valid course citations',()=>{
assert.ok(bank.length>=686);assert.equal(new Set(ids(bank)).size,bank.length);
assert.equal(new Set(bank.map(q=>q.stem)).size,bank.length);
for(const q of bank){const s=sections.find(s=>s.id===q.required_sections[0]);assert.ok(s);assert.ok(q.source.page>=s.pdf_page_start&&q.source.page<=s.pdf_page_end);assert.ok(q.correct.every(id=>q.options.some(o=>o.id===id)));assert.equal(new Set(q.options.map(o=>o.text)).size,q.options.length);assert.ok(s.objective_ids.includes(q.objective));for(const d of q.distractor_rationales||[])assert.ok(d.page>=s.pdf_page_start&&d.page<=s.pdf_page_end);}
for(const s of sections)assert.ok(eligible(bank,[s.id]).length>=26);
});

test('each section has applied depth, explicitly mapped topics, and Fundamentals revisions',()=>{
for(const s of sections){const qs=eligible(bank,[s.id]).filter(q=>q.practice_level==='applied');assert.ok(qs.length>=6,s.id);for(const q of qs){assert.ok(q.subtopics?.length,q.id);assert.ok(q.objective_topics?.length||q.coverage_scope==='course-supplement',q.id);}}
for(const q of bank.filter(q=>q.id.startsWith('fund-'))){assert.equal(q.version,2);assert.equal(q.practice_level,'applied');}
assert.ok(bank.filter(q=>q.type==='multiple').length>=7);
});

test('section exams expand without capping a section at twenty, and capped sets represent each selection',()=>{
assert.equal(sectionPractice(bank,['content-01']).length,36);
assert.equal(sectionPractice(bank,['content-02']).length,26);
const selected=sections.map(s=>s.id),items=sectionPractice(bank,selected);
assert.equal(items.length,90);assert.equal(new Set(ids(items)).size,90);
for(const s of selected)assert.ok(items.some(q=>q.required_sections.includes(s)),s);
assert.ok(items.every(q=>q.practice_level==='applied'));
assert.deepEqual(sectionPractice(bank,[]),[]);
});

test('full forms use applied items and represent every primary objective',()=>{
const expected=[...new Set(sections.flatMap(s=>s.objective_ids))].sort();
for(const f of ['A','B','C']){const items=fullForm(bank,f);assert.ok(items.every(q=>q.practice_level==='applied'));assert.deepEqual([...new Set(items.map(q=>q.objective))].sort(),expected);}
assert.throws(()=>fullForm(bank.map(q=>({...q,practice_level:'foundation'})),'A'),/applied/);
});
test('incomplete and submitted exams cannot submit',()=>{assert.throws(()=>submit({questions:bank,answers:{}}));const a={questions:bank,answers:Object.fromEntries(bank.map(q=>[q.id,q.correct]))};const b=submit(a);assert.ok(b.submitted);assert.equal(a.submitted,undefined);assert.throws(()=>submit(b));});
test('multi-select requires exact set',()=>{const q=bank.find(q=>q.type==='multiple');assert.equal(answered(q,[q.correct[0]]),false);assert.equal(correct(q,[q.correct[0],q.correct[0]]),false);assert.equal(correct(q,[...q.correct].reverse()),true);assert.equal(correct(q,[...q.correct,'0']),false);});
test('cumulative respects studied boundaries and coverage',()=>{const studied=['content-01','content-04','content-15'],items=cumulative(bank,studied);assert.equal(items.length,40);assert.equal(new Set(ids(items)).size,40);assert.ok(items.every(q=>q.required_sections.every(id=>studied.includes(id))));const all=cumulative(bank,sections.map(s=>s.id));assert.equal(all.length,40);for(const s of sections)assert.ok(all.some(q=>q.required_sections.includes(s.id)));});
test('full forms have 90 unique items and exact domain quotas',()=>{const forms=['A','B','C'].map(f=>fullForm(bank,f));for(const form of forms){assert.equal(form.length,90);assert.equal(new Set(ids(form)).size,90);for(const [d,n] of Object.entries(quotas))assert.equal(form.filter(q=>String(q.primary_domain)===d).length,n);}assert.deepEqual(ids(forms[0]),ids(fullForm(bank,'A')));assert.notDeepEqual(ids(forms[0]),ids(forms[1]));assert.notDeepEqual(ids(forms[1]),ids(forms[2]));assert.throws(()=>fullForm(bank.filter(q=>q.primary_domain!==3),'A'));});
test('retake preserves snapshots and original, resets answers, changes orders',()=>{const a=newAttempt(fullForm(bank,'B'),'Full practice B',{form:'B',timeLimitMinutes:90});a.answers=Object.fromEntries(a.questions.map(q=>[q.id,q.correct]));a.submitted=Date.now();const before=JSON.stringify(a),b=retake(a);assert.equal(JSON.stringify(a),before);assert.notEqual(a.id,b.id);assert.deepEqual(ids(a.questions),ids(b.questions));assert.notDeepEqual(a.questions.map(q=>q.id),b.questions.map(q=>q.id));assert.deepEqual(b.answers,{});assert.equal(b.submitted,null);assert.equal(b.retakeOf,a.id);assert.equal(b.timeLimitMinutes,90);assert.equal(b.form,'B');for(const q of b.questions){const old=a.questions.find(x=>x.id===q.id);assert.equal(q.stem,old.stem);assert.equal(q.version,old.version);assert.equal(q.explanation,old.explanation);assert.deepEqual(q.source,old.source);assert.deepEqual(q.correct,old.correct);assert.notDeepEqual(q.options.map(o=>o.id),old.options.map(o=>o.id));assert.deepEqual([...q.options].sort((x,y)=>x.id.localeCompare(y.id)),[...old.options].sort((x,y)=>x.id.localeCompare(y.id)));}b.questions[0].stem='mutated';assert.equal(JSON.stringify(a),before);});
test('old v1 retake uses saved version without bank lookup',()=>{const q=structuredClone(bank[0]);q.id='retired-question';q.version=42;const a={id:'old',questions:[q],answers:{[q.id]:q.correct},submitted:123,mode:'Section practice'};assert.equal(retake(a).questions[0].version,42);assert.throws(()=>retake({...a,submitted:null}));});
test('timer includes time away and supports overtime',()=>{const a={started:1000,timeLimitMinutes:90};assert.equal(remainingSeconds(a,1000),5400);assert.equal(remainingSeconds(a,5401000),0);assert.equal(remainingSeconds(a,5402000),-1);assert.equal(remainingSeconds({}),null);});
