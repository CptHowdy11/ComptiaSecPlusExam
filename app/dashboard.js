import {correct} from './engine.js';

export const examDate = '2026-09-28';
export const domains = ['General Security Concepts', 'Threats, Vulnerabilities, and Mitigations', 'Security Architecture', 'Security Operations', 'Security Program Management and Oversight'];

// Calendar days in the browser's timezone; UTC arithmetic avoids DST drift.
export function daysUntilExam(now = new Date()) {
  return Math.round((Date.UTC(2026,8,28) - Date.UTC(now.getFullYear(),now.getMonth(),now.getDate())) / 86400000);
}

export function progressSummary(studied, sections) {
  const completed = sections.filter(s => studied.includes(s.id)).length;
  return {completed, remaining: sections.length - completed};
}

// Weight by answered questions, not by exam percentages. Each submitted retake
// is another observation. Domain scores use the latest 20 observations.
// Within a submitted exam, saved question order breaks ties (answer times are not
// stored). Use saved snapshots so bank edits cannot alter scores.
export function accuracySummary(history, sections) {
  const row = (id,title) => ({id,title,right:0,total:0});
  const overall = row('all','Overall accuracy');
  const byDomain = domains.map((title,i) => row(String(i+1),title));
  const bySection = sections.map(s => row(s.id,s.title));
  const unknownDomain = row('unknown','Uncategorized domain');
  const recent = new Map([...byDomain,unknownDomain].map(r=>[r.id,[]]));
  const unknownSection = row('unknown','Uncategorized module');
  const add = (r,ok) => {r.total++; r.right += Number(ok);};
  for (const a of [...history].sort((a,b)=>(a.submitted||0)-(b.submitted||0))) {
    if (!a.submitted) continue;
    for (const q of a.questions) {
      const ok = correct(q,a.answers[q.id]);
      add(overall,ok);
      const domain = byDomain.find(r=>r.id===String(q.primary_domain || q.objective?.[0])) || unknownDomain;
      const window = recent.get(domain.id);
      window.push(ok);
      if (window.length > 20) window.shift();
      const matching = bySection.filter(r=>q.required_sections?.includes(r.id));
      for (const r of matching.length ? matching : [unknownSection]) add(r,ok);
    }
  }
  for (const r of [...byDomain,unknownDomain]) {
    const window = recent.get(r.id);
    r.total = window.length;
    r.right = window.filter(Boolean).length;
  }
  if (unknownDomain.total) byDomain.push(unknownDomain);
  if (unknownSection.total) bySection.push(unknownSection);
  for (const r of [overall,...byDomain,...bySection]) r.percent = r.total ? Math.round(r.right/r.total*100) : null;
  return {overall,byDomain,bySection};
}
