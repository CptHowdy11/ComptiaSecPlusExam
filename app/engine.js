export function answered(q, value) { return Array.isArray(value) && value.length === (q.type === 'multiple' ? q.correct.length : 1) && new Set(value).size === value.length && value.every(id => q.options.some(o => o.id === id)); }
export function correct(q, value) { return answered(q,value) && value.every(id => q.correct.includes(id)); }
export function eligible(bank, sections) { return bank.filter(q => q.required_sections.every(id => sections.includes(id))); }
export function submit(attempt) { if(attempt.submitted) throw Error('Already submitted'); if(!attempt.questions.every(q=>answered(q,attempt.answers[q.id]))) throw Error('Answer every question before submitting.'); return {...attempt,submitted:Date.now()}; }
export function shuffle(items) { const result=[...items]; for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];} return result; }

export const quotas = {1: 11, 2: 20, 3: 16, 4: 25, 5: 18};

// A fresh order is guaranteed for lists with more than one item, even if the
// random shuffle happens to return the original order.
export function reordered(items) {
  const result = shuffle(items);
  if (result.length > 1 && result.every((item, i) => item.id === items[i].id)) {
    result.push(result.shift());
  }
  return result;
}

export function newAttempt(questions, mode, extra = {}) {
  return {
    ...extra, id: crypto.randomUUID(), mode, started: Date.now(), submitted: null,
    questions: reordered(structuredClone(questions)).map(q => ({...q, options: reordered(q.options)})),
    answers: {}, currentIndex: 0
  };
}

export function retake(original) {
  if (!original?.submitted) throw Error('Only completed exams can be retaken.');
  return newAttempt(original.questions, original.mode, {
    retakeOf: original.id, originalAttemptId: original.originalAttemptId || original.id,
    timeLimitMinutes: original.timeLimitMinutes || null,
    form: original.form || null, sectionIds: original.sectionIds || []
  });
}

// Fixed form seeds give A/B/C stable question sets for a particular bank version.
// Attempt order is shuffled separately and the entire snapshot is saved.
export function fullForm(bank, form = 'A') {
  if (!['A','B','C'].includes(form)) throw Error('Unknown exam form.');
  let seed = {A: 173, B: 827, C: 1297}[form];
  const random = () => {seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296;};
  const result = [];
  for (const [domain, count] of Object.entries(quotas)) {
    const pool = bank.filter(q => String(q.primary_domain || q.objective[0]) === domain).sort((a,b)=>a.id.localeCompare(b.id));
    if (pool.length < count) throw Error(`Domain ${domain} needs ${count} questions; only ${pool.length} available.`);
    for(let i=pool.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]];}
    result.push(...pool.slice(0,count));
  }
  if(new Set(result.map(q=>q.id)).size!==90) throw Error('Exam contains duplicate question IDs.');
  return result;
}

export function cumulative(bank, studied, limit = 40) {
  const pool = shuffle(eligible(bank, studied)), selected = [];
  // Represent each studied section when the requested size permits it.
  for(const section of studied) {
    const q = pool.find(q=>q.required_sections.includes(section)&&!selected.includes(q));
    if(q && selected.length<limit) selected.push(q);
  }
  return selected.concat(pool.filter(q=>!selected.includes(q))).slice(0,limit);
}

export function remainingSeconds(attempt, now = Date.now()) {
  if(!attempt.timeLimitMinutes) return null;
  return Math.ceil((attempt.started + attempt.timeLimitMinutes*60000 - now)/1000);
}
