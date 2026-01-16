document.addEventListener('DOMContentLoaded', () => {

  // smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      e.preventDefault();
      document.querySelector(a.getAttribute('href'))
        ?.scrollIntoView({behavior:'smooth'});
    });
  });

  // copy email
  document.getElementById('copyEmail')?.addEventListener('click',()=>{
    navigator.clipboard.writeText('vivaanvivekaggarwal@gmail.com');
  });

  // print
  document.getElementById('printBtn')?.addEventListener('click',()=>window.print());

  // reveal setup
  const revealEls = [...document.querySelectorAll('.card,.glass')];
  revealEls.forEach((el,i)=>{
    el.classList.add('reveal');
    el.dataset.idx=i;
  });

  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        setTimeout(()=>{
          e.target.classList.add('visible');
        },Math.min(80*e.target.dataset.idx,400));
        io.unobserve(e.target);
      }
    });
  },{threshold:.12});

  revealEls.forEach(el=>io.observe(el));

  // FIX: re-observe when details opens
  const details = document.querySelector('#competitions details');
  details?.addEventListener('toggle',()=>{
    if(details.open){
      details.querySelectorAll('.card:not(.visible)').forEach(el=>{
        el.classList.add('reveal');
        io.observe(el);
      });
    }
  });

  // year
  document.getElementById('year').textContent=new Date().getFullYear();
});
