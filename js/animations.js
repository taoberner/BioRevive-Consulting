// animations.js — GSAP + AOS

function initAnimations() {
  AOS.init({ duration:700, easing:'ease-out-cubic', once:true, offset:70 });
  gsap.registerPlugin(ScrollTrigger);
  animateHero();
  createHeroParticles();
  initScrollTriggers();
  initNavbarScroll();
}

function animateHero() {
  var tl = gsap.timeline({ delay:0.2 });
  tl.from('.hero-badge',    { opacity:0, y:-28, duration:0.55, ease:'back.out(1.7)' })
    .from('.title-line',    { opacity:0, y:70,  duration:0.65, stagger:0.14, ease:'power3.out' }, '-=0.25')
    .from('.hero-subtitle', { opacity:0, y:28,  duration:0.55, ease:'power2.out' }, '-=0.3')
    .from('.hero-ctas .btn-primary, .hero-ctas .btn-secondary',
                            { opacity:0, y:22,  duration:0.5,  stagger:0.1,  ease:'power2.out' }, '-=0.2')
    .from('.hero-scroll',   { opacity:0, y:18,  duration:0.45, ease:'power2.out' }, '-=0.1');

  setTimeout(animateHeroCounters, 900);
}

function animateHeroCounters() {
  document.querySelectorAll('.stat-number').forEach(function(el) {
    var target = parseInt(el.dataset.target, 10);
    gsap.to({ v:0 }, { v:target, duration:2.2, ease:'power2.out', onUpdate:function(){ el.textContent = Math.round(this.targets()[0].v).toLocaleString(); } });
  });
}

function initScrollTriggers() {
  // Impact counter numbers
  document.querySelectorAll('.counter-number').forEach(function(el) {
    var target = parseInt(el.dataset.target, 10);
    ScrollTrigger.create({ trigger:el, start:'top 88%', once:true, onEnter:function() {
      gsap.to({ v:0 }, { v:target, duration:2, ease:'power2.out', onUpdate:function(){ el.textContent = Math.round(this.targets()[0].v).toLocaleString(); } });
    }});
  });

  // Progress bars
  document.querySelectorAll('.counter-fill').forEach(function(el) {
    var w = el.dataset.width;
    ScrollTrigger.create({ trigger:el, start:'top 88%', once:true, onEnter:function() {
      gsap.to(el, { width:w+'%', duration:1.6, ease:'power2.out' });
    }});
  });

  // Section headers stagger
  document.querySelectorAll('.section-header').forEach(function(el) {
    gsap.from(el.children, { scrollTrigger:{ trigger:el, start:'top 88%', toggleActions:'play none none reverse' },
      opacity:0, y:35, duration:0.65, stagger:0.12, ease:'power2.out' });
  });
}

function createHeroParticles() {
  var container = document.getElementById('particles');
  if (!container) return;
  for (var i = 0; i < 60; i++) {
    var p = document.createElement('div');
    p.className = 'particle';
    var size    = Math.random()*5 + 2;
    var delay   = Math.random()*5;
    var dur     = Math.random()*7 + 5;
    var opacity = Math.random()*0.55 + 0.1;
    p.style.cssText = 'width:'+size+'px;height:'+size+'px;left:'+(Math.random()*100)+'%;top:'+(Math.random()*100)+'%;opacity:'+opacity+';animation:floatParticle '+dur+'s '+delay+'s infinite ease-in-out;';
    container.appendChild(p);
  }
}

function initNavbarScroll() {
  var navbar = document.getElementById('navbar');
  window.addEventListener('scroll', throttle(function() {
    if (window.scrollY > 55) { navbar.classList.add('scrolled'); }
    else { navbar.classList.remove('scrolled'); }
  }, 80));
}
