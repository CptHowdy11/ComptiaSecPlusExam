import {acronymCards} from './acronyms.js';
import {shuffle} from './engine.js';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export function newAcronymDeck(){return {cards:[...acronymCards],index:0,flipped:false,hintVisible:false,query:''};}
export function filterAcronyms(query){
  const term=query.trim().toLowerCase();
  return acronymCards.filter(c=>[c.acronym,...c.aliases].some(a=>a.toLowerCase().includes(term)));
}
export function updateAcronymDeck(deck,action,value=''){
  if(action==='hint'&&deck.cards.length&&!deck.flipped)deck.hintVisible=!deck.hintVisible;
  if(action==='flip'&&deck.cards.length){deck.flipped=!deck.flipped;deck.hintVisible=false;}
  if(action==='prev'||action==='next'){
    deck.index=Math.max(0,Math.min(deck.cards.length-1,deck.index+(action==='next'?1:-1)));
    deck.flipped=false;deck.hintVisible=false;
  }
  if(action==='search'||action==='reset'){
    deck.query=action==='reset'?'':value.trim();deck.cards=filterAcronyms(deck.query);deck.index=0;deck.flipped=false;deck.hintVisible=false;
  }
  if(action==='shuffle'){deck.cards=shuffle(deck.cards);deck.index=0;deck.flipped=false;deck.hintVisible=false;}
  return deck;
}
export function renderAcronyms(deck){
  const c=deck.cards[deck.index];
  return `<button data-action="home">← Back to practice</button><section class="port-study" aria-labelledby="acronym-title"><p class="eyebrow">DION TRAINING · ACRONYMS</p><h1 id="acronym-title" tabindex="-1">Acronym flashcards</h1><p class="subtle">${acronymCards.length} cards from the 405-page guide. Click a card, or focus it and press Enter / Space, to reveal its full name. Need a clue? Choose Show hint.</p><form id="acronym-search" class="acronym-search"><label for="acronym-query">Find an acronym</label><div><input id="acronym-query" name="query" type="search" maxlength="80" value="${esc(deck.query)}" placeholder="Try IAM, EAP, or 3DES" autocomplete="off"><button type="submit">Search</button><button type="button" data-action="acronym-reset">All cards · A–Z</button></div></form>${c?`<p role="status">Card ${deck.index+1} of ${deck.cards.length}${deck.query?' matching your search':''} · ${deck.flipped?'Answer':'Acronym'}</p><button class="port-card acronym-card" data-action="acronym-flip">${deck.flipped?`<span class="eyebrow">${esc(c.acronym)} · ANSWER</span><strong class="acronym-answer">${esc(c.fullName)}</strong>${c.note?`<span class="acronym-note">${esc(c.note)}</span>`:''}${c.aliases.length?`<small>Also appears as: ${c.aliases.map(esc).join(', ')}</small>`:''}<small>Click to show acronym</small>`:`<span class="eyebrow">WHAT DOES THIS STAND FOR?</span><strong class="acronym-term">${esc(c.acronym)}</strong><span>Click to reveal full name</span>`}</button>${!deck.flipped?`<div class="acronym-hint"><button data-action="acronym-hint" aria-expanded="${deck.hintVisible}" aria-controls="acronym-hint-text">${deck.hintVisible?'Hide hint':'Show hint'}</button><p id="acronym-hint-text" class="hint-text" role="status" ${deck.hintVisible?'':'hidden'}>${deck.hintVisible?esc(c.hint):''}</p></div>`:''}${deck.flipped?`<p class="citation">Dion Training study guide · PDF page${c.pages.length===1?'':'s'} ${c.pages.slice(0,8).join(', ')}${c.pages.length>8?` and ${c.pages.length-8} more`:''}${c.sourceUrl?` · <a href="${esc(c.sourceUrl)}" target="_blank" rel="noopener noreferrer">Expansion reference</a>`:''}</p>`:''}<nav class="port-controls" aria-label="Acronym flashcard navigation"><button data-action="acronym-prev" ${deck.index===0?'disabled':''}>← Previous</button><button class="primary" data-action="acronym-flip">${deck.flipped?'Show acronym':'Reveal answer'}</button><button data-action="acronym-next" ${deck.index===deck.cards.length-1?'disabled':''}>Next →</button><button data-action="acronym-shuffle">Shuffle deck</button></nav>`:`<p class="notice" role="status">No acronyms match “${esc(deck.query)}”. Try a shorter acronym or choose All cards.</p>`}<details class="port-sources"><summary>About this deck</summary><p>Covers acronyms and abbreviations found throughout the guide, including its examples. Repeated and plural forms share a card. Different meanings used in the guide appear together on the answer. Search checks acronyms and their printed variants without revealing answers.</p><p>Page references point to your local Dion Training guide. Notes identify corrections to shortened or inconsistent expansions. A few abbreviated product names are included and identified as names rather than given invented expansions.</p></details></section>`;
}
