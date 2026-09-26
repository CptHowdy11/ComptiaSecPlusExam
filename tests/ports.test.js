import {acronymCards} from '../app/acronyms.js';
import {newAcronymDeck,updateAcronymDeck,renderAcronyms} from '../app/acronym-flashcards.js';
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {portCards,portSources,transportNames} from '../app/ports.js';
import * as engine from '../app/engine.js';
import * as dashboard from '../app/dashboard.js';
test('deck covers each port in the course table exactly once',()=>{
assert.deepEqual(portCards.map(c=>c.port),[21,22,23,25,53,69,80,88,110,119,135,137,138,139,143,161,162,389,443,445,465,514,587,636,993,995,1433,1645,1646,1812,1813,3389,6514]);
for(const c of portCards)assert.ok(c.protocol&&c.fullName&&c.purpose&&transportNames[c.transport]);
});
test('flashcards flip, navigate, shuffle, and preserve exam state',async()=>{
const root={innerHTML:'',querySelector:()=>null,querySelectorAll:()=>[]};
const ctx=vm.createContext({...engine,...dashboard,acronymCards,newAcronymDeck,updateAcronymDeck,renderAcronyms,portCards,portSources,transportNames,document:{querySelector:()=>root,body:{classList:{toggle(){}}}},window:{scrollTo(){}},setInterval(){},localStorage:{getItem(){return null;}},fetch:async url=>({ok:true,json:async()=>JSON.parse(fs.readFileSync(new URL('../app/'+url,import.meta.url),'utf8'))})});
const source=fs.readFileSync(new URL('../app/app.js',import.meta.url),'utf8').replace(/^import .*;\r?\n/gm,'');
await vm.runInContext('(async()=>{'+source+`;const before=JSON.stringify(state); view='ports';render();
if(!root.innerHTML.includes('Card 1 of 33')||root.innerHTML.includes('Controls file transfers'))throw Error('Front reveals answer');
portAction('port-flip');if(!root.innerHTML.includes('File Transfer Protocol'))throw Error('Missing answer');
portAction('port-next');if(portIndex!==1||portFlipped)throw Error('Next must hide answer');
portAction('port-prev');if(portIndex!==0)throw Error('Previous failed');
portAction('port-shuffle');if(new Set(portDeck.map(c=>c.port)).size!==33||portFlipped||portIndex!==0)throw Error('Shuffle lost cards');
state.attempt={submitted:null,currentIndex:7};const attempt=JSON.stringify(state.attempt);portAction('port-next');act('home');if(JSON.stringify(state.attempt)!==attempt||view!=='home')throw Error('Exam changed');
const saved=JSON.stringify(state);act('acronyms');if(view!=='acronyms'||!root.innerHTML.includes('acronym-search'))throw Error('Acronym route failed');acronymAction('acronym-search','GPO');act('acronym-flip');if(!root.innerHTML.includes('Group Policy Object'))throw Error('Acronym flip route failed');act('home');if(JSON.stringify(state)!==saved)throw Error('Acronyms changed progress');
})()`,ctx);
});
