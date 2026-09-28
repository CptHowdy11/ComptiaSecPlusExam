import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {acronymCards} from '../app/acronyms.js';
import {newAcronymDeck,filterAcronyms,updateAcronymDeck,renderAcronyms} from '../app/acronym-flashcards.js';
const audit=JSON.parse(fs.readFileSync(new URL('../docs/acronym-audit.json',import.meta.url)));
test('all reviewed guide candidates are covered or explicitly excluded',()=>{
  assert.equal(acronymCards.length,audit.cardCount);
  const names=new Set(acronymCards.map(c=>c.acronym));
  assert.equal(names.size,acronymCards.length);
  for(const entry of audit.candidates){
    assert.ok(entry.card ? names.has(entry.card) : entry.excluded,entry.term);
  }
  for(const c of acronymCards){
    assert.ok(c.fullName&&c.pages.length,c.acronym);
    assert.ok(c.pages.every(p=>Number.isInteger(p)&&p>=1&&p<=405),c.acronym);
    assert.deepEqual(c.pages,[...new Set(c.pages)].sort((a,b)=>a-b));
  }
  for(const name of ['2FA','3DES','IaC','POA&M','PCI DSS','TACACS+','CySA+','MAC','TOE'])assert.ok(names.has(name),name);
});
test('front hides full name and source note; flip reveals both',()=>{
  const deck=newAcronymDeck();updateAcronymDeck(deck,'search','GPO');
  assert.equal(deck.cards.length,1);
  assert.ok(!renderAcronyms(deck).includes('Group Policy Object'));
  updateAcronymDeck(deck,'flip');
  assert.match(renderAcronyms(deck),/Group Policy Object/);
  assert.match(renderAcronyms(deck),/Page 291/);
  assert.match(renderAcronyms(deck),/Expansion reference/);
  updateAcronymDeck(deck,'flip');assert.ok(!renderAcronyms(deck).includes('Group Policy Object'));
});
test('navigation clamps boundaries and conceals the next answer',()=>{
  const deck=newAcronymDeck();updateAcronymDeck(deck,'prev');assert.equal(deck.index,0);
  updateAcronymDeck(deck,'flip');updateAcronymDeck(deck,'next');assert.equal(deck.index,1);assert.equal(deck.flipped,false);
  deck.index=deck.cards.length-1;updateAcronymDeck(deck,'next');assert.equal(deck.index,deck.cards.length-1);
});
test('search handles aliases, punctuation, empty results, and reset',()=>{
  assert.equal(filterAcronyms('  flacon ')[0].acronym,'FALCON');
  assert.equal(filterAcronyms('POA&M')[0].acronym,'POA&M');
  assert.equal(filterAcronyms('acls')[0].acronym,'ACL');
  const deck=newAcronymDeck();updateAcronymDeck(deck,'flip');
  updateAcronymDeck(deck,'search','<not-an-acronym>');
  assert.equal(deck.cards.length,0);assert.equal(deck.flipped,false);
  assert.match(renderAcronyms(deck),/No acronyms match/);
  assert.ok(!renderAcronyms(deck).includes('<not-an-acronym>'));
  updateAcronymDeck(deck,'flip');assert.equal(deck.flipped,false);
  updateAcronymDeck(deck,'next');assert.equal(deck.index,0);
  updateAcronymDeck(deck,'reset');assert.equal(deck.cards.length,acronymCards.length);assert.equal(deck.query,'');
});
test('shuffle retains every matching card and reset restores full alphabetical deck',()=>{
  const deck=newAcronymDeck();updateAcronymDeck(deck,'search','EAP');
  const expected=deck.cards.map(c=>c.acronym).sort();
  updateAcronymDeck(deck,'flip');updateAcronymDeck(deck,'shuffle');
  assert.deepEqual(deck.cards.map(c=>c.acronym).sort(),expected);assert.equal(deck.index,0);assert.equal(deck.flipped,false);
  updateAcronymDeck(deck,'reset');assert.deepEqual(deck.cards,acronymCards);
});
test('ambiguous guide meanings are retained together',()=>{
  const card=a=>acronymCards.find(c=>c.acronym===a);
  assert.match(card('MAC').fullName,/Media Access Control; Mandatory Access Control; Message Authentication Code/);
  assert.match(card('TOE').fullName,/Target of Evaluation; Time-of-Evaluation/);
  assert.match(card('CD').fullName,/Delivery; Continuous Deployment/);
});

test('every card has a concise hint without words from its expansion',()=>{
  const stop=new Set('a an and the of for to in on or as with by at from over using also called s is its i it per via'.split(' '));
  const words=s=>(s.toLowerCase().match(/[a-z]+/g)||[]).filter(w=>!stop.has(w));
  for(const c of acronymCards){
    assert.ok(typeof c.hint==='string'&&c.hint.length>20&&c.hint.length<=190,c.acronym);
    const answer=new Set(words(c.fullName));
    assert.deepEqual(words(c.hint).filter(w=>answer.has(w)),[],c.acronym+' reveals an answer word');
  }
});
test('hint can be toggled without flipping or exposing the answer',()=>{
  const deck=newAcronymDeck();updateAcronymDeck(deck,'search','GPO');
  const c=deck.cards[0];
  assert.equal(deck.hintVisible,false);assert.ok(!renderAcronyms(deck).includes(c.hint));
  updateAcronymDeck(deck,'hint');
  assert.equal(deck.flipped,false);assert.equal(deck.hintVisible,true);
  assert.match(renderAcronyms(deck),/aria-expanded="true"/);
  assert.ok(renderAcronyms(deck).includes(c.hint));
  assert.ok(!renderAcronyms(deck).includes(c.fullName));
  updateAcronymDeck(deck,'hint');assert.ok(!renderAcronyms(deck).includes(c.hint));
});
test('hint resets on navigation, shuffle, search, reset, and either flip direction',()=>{
  for(const action of ['next','prev','shuffle','search','reset','flip']){
    const deck=newAcronymDeck();updateAcronymDeck(deck,'hint');updateAcronymDeck(deck,action);
    assert.equal(deck.hintVisible,false,action);
  }
  const deck=newAcronymDeck();updateAcronymDeck(deck,'flip');updateAcronymDeck(deck,'hint');
  assert.equal(deck.hintVisible,false);assert.ok(!renderAcronyms(deck).includes('data-action="acronym-hint"'));
  updateAcronymDeck(deck,'flip');assert.equal(deck.hintVisible,false);
  updateAcronymDeck(deck,'search','nonexistent');updateAcronymDeck(deck,'hint');assert.equal(deck.hintVisible,false);
});
