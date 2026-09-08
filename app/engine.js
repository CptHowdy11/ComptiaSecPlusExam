export function answered(q, value) { return Array.isArray(value) && value.length === (q.type === 'multiple' ? q.correct.length : 1) && new Set(value).size === value.length && value.every(id => q.options.some(o => o.id === id)); }
export function correct(q, value) { return answered(q,value) && value.every(id => q.correct.includes(id)); }
export function eligible(bank, sections) { return bank.filter(q => q.required_sections.every(id => sections.includes(id))); }
export function submit(attempt) { if(attempt.submitted) throw Error('Already submitted'); if(!attempt.questions.every(q=>answered(q,attempt.answers[q.id]))) throw Error('Answer every question before submitting.'); return {...attempt,submitted:Date.now()}; }
export function shuffle(items) { const result=[...items]; for(let i=result.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[result[i],result[j]]=[result[j],result[i]];} return result; }
