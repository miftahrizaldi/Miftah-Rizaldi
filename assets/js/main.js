/* main.js
   - typing effect
   - scroll reveal setup
   - cert modal open/close
   - menu link active on scroll (simple)
*/

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- TYPING EFFECT ---------- */
  const words = ["Computer Engineer", "Web Developer", "IoT Enthusiast", "Data Analyst"];
  const el = document.getElementById('typed');
  const cursor = document.querySelector('.cursor');
  let wIndex = 0, cIndex = 0, forward = true;

  function typeLoop() {
    const word = words[wIndex];
    if (forward) {
      if (cIndex <= word.length) {
        el.textContent = word.substring(0, cIndex);
        cIndex++;
        setTimeout(typeLoop, 90);
      } else {
        forward = false;
        setTimeout(typeLoop, 1100);
      }
    } else {
      if (cIndex >= 0) {
        el.textContent = word.substring(0, cIndex);
        cIndex--;
        setTimeout(typeLoop, 40);
      } else {
        forward = true;
        wIndex = (wIndex + 1) % words.length;
        setTimeout(typeLoop, 500);
      }
    }
  }
  setTimeout(typeLoop, 600);

  /* ---------- SCROLLREVEAL ---------- */
  if (window.ScrollReveal) {
    ScrollReveal().reveal('.hero-left', { delay: 150, distance: '40px', origin: 'left', duration: 900, easing: 'cubic-bezier(.2,.9,.3,1)'});
    ScrollReveal().reveal('.hero-right', { delay: 250, distance: '20px', origin: 'bottom', duration: 900, easing: 'cubic-bezier(.2,.9,.3,1)'});
    ScrollReveal().reveal('.swipe', { interval: 120, distance: '10px', origin:'bottom', duration:700 });
    ScrollReveal().reveal('.card, .exp-card, .cert-card, .skill-box, .box', { interval: 80, origin:'bottom', distance:'20px', duration:800 });
  }

  /* ---------- CERT LIGHTBOX ---------- */
  const modal = document.getElementById('cert-modal');
  const frame = document.getElementById('cert-frame');
  const viewBtns = document.querySelectorAll('.view-cert');

  viewBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      const parent = btn.closest('.cert-card');
      const src = parent && parent.dataset && parent.dataset.pdf;
      if (src) {
        frame.src = src;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('.modal-close').forEach(b => {
    b.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal();
  });

  function closeModal(){
    frame.src = '';
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }

  /* ---------- LINK HIGHLIGHT ON SCROLL ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function onScroll(){
    const scrollPos = window.scrollY + window.innerHeight/3;
    sections.forEach(s => {
      if (s.offsetTop <= scrollPos && (s.offsetTop + s.offsetHeight) > scrollPos) {
        navLinks.forEach(a => a.classList.remove('active'));
        const link = document.querySelector(`.nav-link[href="#${s.id}"]`);
        if (link) link.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- PROFILE CARD HOVER GLOW (cursor follow subtle) ---------- */
  const profileCard = document.getElementById('profile-card');
  profileCard && profileCard.addEventListener('mousemove', function(e){
    const rect = profileCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    profileCard.style.setProperty('--mx', x + 'px');
  });

});
