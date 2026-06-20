/* Daxio — theme toggle, mobile nav, pricing billing, panel tilt */
(function(){
  'use strict';
  var root = document.documentElement;

  // ---- theme ----
  function apply(t){ root.setAttribute('data-theme', t); try{ localStorage.setItem('daxio-theme', t); }catch(e){} }
  var saved; try{ saved = localStorage.getItem('daxio-theme'); }catch(e){}
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


/* interactive 3D parallax on the hero (follows the cursor) */
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function init(){
    if(reduce) return;
    var hero = document.querySelector('[data-hero]');
    var dev  = document.querySelector('[data-hero] .device');
    var glow = document.querySelector('.hero .glow-hero');
    var fc   = document.querySelector('[data-hero] .float-card');
    if(glow){ window.addEventListener('scroll', function(){ window.requestAnimationFrame(function(){
      var p = Math.max(0, Math.min(1, (window.scrollY||0)/560)); glow.style.transform = 'translateX(' + (p*80).toFixed(0) + 'px)'; }); }, {passive:true}); }
    if(hero && dev){
      hero.addEventListener('pointermove', function(e){
        var r = hero.getBoundingClientRect();
        var px = (e.clientX - r.left)/r.width - 0.5, py = (e.clientY - r.top)/r.height - 0.5;
        dev.style.transform = 'perspective(1400px) rotateY(' + (px*9).toFixed(2) + 'deg) rotateX(' + (-py*7).toFixed(2) + 'deg)';
        if(fc) fc.style.transform = 'translate3d(' + (px*-30).toFixed(0) + 'px,' + (py*-20).toFixed(0) + 'px,60px)';
      });
      hero.addEventListener('pointerleave', function(){
        dev.style.transform = 'perspective(1400px) rotateY(0deg) rotateX(0deg)';
        if(fc) fc.style.transform = '';
      });
    }
  }
  if(document.readyState !== 'loading') init(); else document.addEventListener('DOMContentLoaded', init);
})();
