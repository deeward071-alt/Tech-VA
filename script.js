(function(){
 const data=window.PORTFOLIO_CONTENT||{};
 document.querySelectorAll('[data-content]').forEach(el=>{const k=el.dataset.content;if(data[k])el.textContent=data[k]});
 if(data.name&&data.name!=="YOUR NAME"){document.title=document.title.replaceAll("YOUR NAME",data.name);document.querySelectorAll('meta[property="og:title"]').forEach(m=>m.content=m.content.replaceAll("YOUR NAME",data.name))}
 if(data.email&&data.email!=="[YOUR EMAIL]"&&data.email.includes("@")){document.querySelectorAll('[data-content="email"]').forEach(a=>a.href='mailto:'+data.email)}
 if(data.linkedin&&data.linkedin!=="[YOUR LINKEDIN]"&&/^https:\/\//.test(data.linkedin)){document.querySelectorAll('[data-content="linkedin"]').forEach(a=>{a.href=data.linkedin;a.target='_blank';a.rel='noopener noreferrer'})}
 if(data.linkedin&&/^https:\/\//.test(data.linkedin)){document.querySelectorAll('[data-link="linkedin"]').forEach(a=>{a.href=data.linkedin;a.target='_blank';a.rel='noopener noreferrer'})}
 document.querySelector('[data-year]').textContent=new Date().getFullYear();
 const menu=document.querySelector('.menu-toggle'),nav=document.querySelector('.nav-links');
 menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));menu.setAttribute('aria-label',open?'Open navigation':'Close navigation');nav.classList.toggle('open',!open)});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation')}));
 const dialog=document.querySelector('.case-dialog'),caseStudyTrigger=document.querySelector('.case-study-trigger'),dialogClose=document.querySelector('.case-dialog .dialog-close');if(dialog&&caseStudyTrigger&&dialogClose){caseStudyTrigger.addEventListener('click',()=>dialog.showModal());dialogClose.addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()})}
 const items=document.querySelectorAll('.reveal');if('IntersectionObserver'in window&&!window.matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12,rootMargin:'0px 0px -25px 0px'});items.forEach(item=>observer.observe(item))}else items.forEach(item=>item.classList.add('is-visible'));
})();
