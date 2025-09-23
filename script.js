// Simple slider with auto-play + manual controls
document.addEventListener('DOMContentLoaded', function(){
  const slides = document.querySelectorAll('.slide');
  const prev = document.getElementById('prevBtn');
  const next = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('dots');
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('nav');
  let current = 0;
  let interval = null;
  const delay = 4000; // 4s

  function createDots(){
    slides.forEach((s,i)=>{
      const d = document.createElement('button');
      d.className = 'dot' + (i===0? ' active':'');
      d.setAttribute('data-index', i);
      d.addEventListener('click', ()=> goTo(i));
      dotsContainer.appendChild(d);
    });
  }

  function update(){
    slides.forEach((s,i)=> s.classList.toggle('active', i===current));
    const dots = dotsContainer.querySelectorAll('.dot');
    dots.forEach((d,i)=> d.classList.toggle('active', i===current));
  }

  function nextSlide(){
    current = (current+1) % slides.length;
    update();
  }
  function prevSlide(){
    current = (current-1 + slides.length) % slides.length;
    update();
  }
  function goTo(i){ current = i; update(); resetInterval(); }

  prev.addEventListener('click', ()=>{ prevSlide(); resetInterval(); });
  next.addEventListener('click', ()=>{ nextSlide(); resetInterval(); });

  function startInterval(){ interval = setInterval(nextSlide, delay); }
  function resetInterval(){ clearInterval(interval); startInterval(); }

  // nav toggle
  navToggle.addEventListener('click', ()=>{
    if(nav.style.display === 'flex'){ nav.style.display = 'none'; }
    else{ nav.style.display = 'flex'; }
  });

  // init
  createDots();
  update();
  startInterval();

  // set year
  document.getElementById('year').textContent = new Date().getFullYear();
});