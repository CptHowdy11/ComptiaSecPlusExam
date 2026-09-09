import {test} from 'node:test';
import assert from 'node:assert/strict';
import {daysUntilExam,progressSummary,accuracySummary} from '../app/dashboard.js';

test('domain windows retain only the latest 20, independently and by submission date',()=>{
  const q={id:'q',type:'single',options:[{id:'yes'},{id:'no'}],correct:['yes'],objective:'1.2',required_sections:[]};
  const attempt=(submitted,ok,domain=1)=>({submitted,questions:[{...q,primary_domain:domain}],answers:{q:[ok?'yes':'no']}});
  const history=Array.from({length:25},(_,i)=>attempt(i+1,i<10));
  history.push(attempt(26,true,2));
  const result=accuracySummary(history.reverse(),[]);
  assert.equal(result.byDomain[0].total,20);
  assert.equal(result.byDomain[0].right,5);
  assert.equal(result.byDomain[0].percent,25);
  assert.equal(result.byDomain[1].total,1);
  assert.equal(result.byDomain[1].percent,100);
  assert.equal(result.overall.total,26);
});

test('calendar countdown handles exam day, elapsed date and DST boundaries',()=>{
  assert.equal(daysUntilExam(new Date(2026,8,8,23,59)),20);
  assert.equal(daysUntilExam(new Date(2026,8,28,0)),0);
  assert.equal(daysUntilExam(new Date(2026,8,28,23,59)),0);
  assert.equal(daysUntilExam(new Date(2026,8,29)),-1);
  assert.equal(daysUntilExam(new Date(2026,2,7)),205);
});
test('module progress ignores duplicates and unknown module IDs',()=>{
  assert.deepEqual(progressSummary(['a','a','old'],[{id:'a'},{id:'b'}]),{completed:1,remaining:1});
});
test('accuracy weights questions, includes retakes, excludes unfinished and handles old metadata',()=>{
  const sections=[{id:'a',title:'A'},{id:'b',title:'B'},{id:'c',title:'C'}];
  const q={id:'q',type:'single',options:[{id:'yes'},{id:'no'}],correct:['yes'],objective:'1.2',required_sections:['a','b']};
  const other={...q,id:'r',primary_domain:2,required_sections:['b']};
  const old={...q,id:'old',objective:undefined,required_sections:undefined};
  const history=[{submitted:1,questions:[q],answers:{q:['yes']}},{submitted:2,retakeOf:'first',questions:[q,other,old],answers:{q:['no'],r:['no'],old:['yes']}},{submitted:null,questions:[q],answers:{q:['yes']}}];
  const result=accuracySummary(history,sections);
  assert.equal(result.overall.percent,50);
  assert.equal(result.overall.total,4);
  assert.equal(result.byDomain[0].percent,50);
  assert.equal(result.byDomain[1].percent,0);
  assert.equal(result.bySection[0].percent,50);
  assert.equal(result.bySection[1].percent,33);
  assert.equal(result.bySection[2].percent,null);
  assert.equal(result.byDomain.at(-1).title,'Uncategorized domain');
  assert.equal(result.bySection.at(-1).right,1);
  assert.equal(accuracySummary([],sections).overall.percent,null);
});
