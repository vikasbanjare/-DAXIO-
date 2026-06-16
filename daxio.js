/* Cue — theme toggle, mobile nav, pricing billing, panel tilt */
(function(){
  'use strict';
  var root = document.documentElement;

  // ---- theme ----
  function apply(t){ root.setAttribute('data-theme', t); try{ localStorage.setItem('cue-theme', t); }catch(e){} }
  var saved; try{ saved = localStorage.getItem('cue-theme'); }catch(e){}
  if(!saved) saved = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
  apply(saved);

  function ready(fn){ if(document.readyState!=='loading') fn(); else document.addEventListener('DOMContentLoaded', fn); }
  ready(function(){
    var tog = document.getElementById('themeToggle');
    if(tog) tog.addEventListener('click', function(){ apply(root.getAttribute('data-theme')==='dark' ? 'light' : 'dark'); });

    // ---- mobile nav ----
    var burger = document.getElementById('hamburger'), links = document.getElementById('navLinks');
    if(burger && links) burger.addEventListener('click', function(){ links.classList.toggle('open'); });

    // ---- pricing billing toggle ----
    var billing = document.getElementById('billing');
    if(billing){
      var btns = billing.querySelectorAll('button');
      function setBilling(annual){
        btns.forEach(function(b){ b.classList.toggle('on', (b.dataset.bill==='annual')===annual); });
        document.querySelectorAll('[data-monthly]').forEach(function(el){ el.textContent = annual ? el.dataset.annual : el.dataset.monthly; });
        document.querySelectorAll('[data-billnote]').forEach(function(el){ el.textContent = annual ? 'billed annually' : 'billed monthly'; });
      }
      btns.forEach(function(b){ b.addEventListener('click', function(){ setBilling(b.dataset.bill==='annual'); }); });
      setBilling(true);
    }

    // ---- 3D tilt on device panels ----
    var fine = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(fine && !reduce){
      document.querySelectorAll('[data-tilt]').forEach(function(zone){
        var target = zone.querySelector('.device') || zone;
        var raf = 0;
        zone.addEventListener('pointermove', function(e){
          var r = zone.getBoundingClientRect();
          var px = (e.clientX - r.left)/r.width - 0.5, py = (e.clientY - r.top)/r.height - 0.5;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(function(){ target.style.transform = 'rotateX('+(-py*6).toFixed(2)+'deg) rotateY('+(px*7).toFixed(2)+'deg)'; });
        });
        zone.addEventListener('pointerleave', function(){ cancelAnimationFrame(raf); target.style.transform='rotateX(0) rotateY(0)'; });
      });
    }
  });
})();


/* scroll-driven 3D on the hero device */
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function init(){
    var dev = document.querySelector('[data-hero] .device');
    var glow = document.querySelector('.hero .glow-hero');
    if(!dev || reduce) return;
    function tick(){
      var y = window.scrollY || window.pageYOffset || 0;
      var p = Math.max(0, Math.min(1, y/560));
      dev.style.transform = 'perspective(1600px) rotateX(' + (p*7).toFixed(2) + 'deg) rotateY(' + ((p-0.5)*9).toFixed(2) + 'deg) translateY(' + (p*-24).toFixed(1) + 'px) scale(' + (1-p*0.05).toFixed(3) + ')';
      if(glow) glow.style.transform = 'translateX(' + (p*70).toFixed(0) + 'px)';
    }
    window.addEventListener('scroll', function(){ window.requestAnimationFrame(tick); }, {passive:true});
    tick();
  }
  if(document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
})();
