'use strict';
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && 'IntersectionObserver' in window) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  }, { threshold: 0.05 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
}
const filters = document.querySelector('.filters');
if (filters) filters.addEventListener('click', event => {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  filters.querySelectorAll('button').forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  document.querySelectorAll('.project').forEach(project => {
    project.hidden = button.dataset.filter !== 'all' && button.dataset.filter !== project.dataset.category;
    if (!project.hidden) { count++; project.classList.add('visible'); }
  });
  document.querySelector('#filter-status').textContent = `Showing ${count} ${count === 1 ? 'project' : 'projects'}`;
});
const runButton = document.querySelector('#run-build');
if (runButton) runButton.addEventListener('click', async () => {
  runButton.disabled = true;
  runButton.textContent = 'Building…';
  const output = document.querySelector('#terminal-output');
  const progress = document.querySelector('#build-progress');
  output.replaceChildren();
  const lines = [
    '$ npm run build-something',
    '→ Starting with a useful problem…',
    '→ Adding thoughtful details…',
    '→ Connecting the moving parts…',
    '✓ Built with curiosity. Ready for what’s next.'
  ];
  for (let index = 0; index < lines.length; index++) {
    if (!reducedMotion) await new Promise(resolve => setTimeout(resolve, index ? 520 : 120));
    const line = document.createElement('p');
    line.textContent = lines[index];
    if (index === lines.length - 1) line.className = 'build-success';
    output.append(line);
    progress.style.width = `${(index + 1) / lines.length * 100}%`;
  }
  runButton.textContent = '↻ Run it again';
  runButton.disabled = false;
});
const copyButton = document.querySelector('#copy-email');
if (copyButton) copyButton.addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText('joaovitordalseno@gmail.com');
    status.textContent = 'Email copied. Say hello whenever you’re ready.';
  } catch {
    status.textContent = 'joaovitordalseno@gmail.com';
  }
});
// Small code detail: rotate the string, with motion preference respected.
const typed = document.querySelector('#typing-text');
if (typed && !reducedMotion) {
  const phrases = ["'something meaningful'", "'your next good idea'", "'a better experience'"];
  let phrase = 0;
  setInterval(() => {
    phrase = (phrase + 1) % phrases.length;
    typed.animate([{opacity:0,transform:'translateY(3px)'},{opacity:1,transform:'translateY(0)'}],{duration:450});
    typed.textContent = phrases[phrase];
  }, 4200);
}
