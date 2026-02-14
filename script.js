// ===== ها وش تبي =====
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Connect Lenis to scroll effects
lenis.on('scroll', ({ scroll, limit, velocity, direction, progress }) => {
  // Update blur effect based on scroll
  const overlay = document.getElementById("bgOverlay");
  if(overlay) {
    const blurAmount = Math.min((scroll / limit) * 15, 15);
    overlay.style.backdropFilter = "blur(" + blurAmount + "px)";
    overlay.style.webkitBackdropFilter = "blur(" + blurAmount + "px)";
  }
});

// ===== PARTICLES SYSTEM =====
(function(){
  var container = document.getElementById("particlesContainer");
  var particleCount = 35;
  var fragment = document.createDocumentFragment();
  
  for(var i = 0; i < particleCount; i++){
    var particle = document.createElement("div");
    particle.className = "particle " + (Math.random() > 0.5 ? "cyan" : "yellow");
    var size = Math.random() * 3 + 2;
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 15 + "s, " + Math.random() * 3 + "s";
    particle.style.animationDuration = (15 + Math.random() * 10) + "s, " + (3 + Math.random() * 2) + "s";
    particle.style.animationName = "float, pulse";
    fragment.appendChild(particle);
  }
  container.appendChild(fragment);
})();

// ===== MODAL CONTROLS =====
(function(){
  var contactBtn = document.getElementById("contactBtn");
  var contactModalOverlay = document.getElementById("contactModalOverlay");
  var modalClose = document.getElementById("modalClose");
  
  if(contactBtn && contactModalOverlay){
    contactBtn.addEventListener("click", function(){
      contactModalOverlay.classList.add("show");
      lenis.stop();
    });
  }
  
  if(modalClose){
    modalClose.addEventListener("click", function(){
      contactModalOverlay.classList.remove("show");
      lenis.start();
    });
  }
  
  contactModalOverlay.addEventListener("click", function(e){
    if(e.target === contactModalOverlay){
      contactModalOverlay.classList.remove("show");
      lenis.start();
    }
  });
  
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
      contactModalOverlay.classList.remove("show");
      lenis.start();
    }
  });
})();

// ===== REVEAL ON SCROLL =====
(function(){
  var revealEls = document.querySelectorAll(".reveal");
  if(!revealEls || !revealEls.length) return;
  
  if(!("IntersectionObserver" in window)){
    for(var i = 0; i < revealEls.length; i++){ 
      revealEls[i].classList.add("show"); 
    }
    return;
  }
  
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.classList.add("show");
        io.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  });
  
  for(var j = 0; j < revealEls.length; j++){ 
    io.observe(revealEls[j]); 
  }
})();

// ===== TYPING ANIMATION =====
(function(){
  var titlePart = document.querySelector(".title-part");
  var subtitleText = document.querySelector(".subtitle-text");
  if(!titlePart || !subtitleText) return;

  var titleWords = ["متحف الويب"];
  var subtitleWords = ["اناقة", "تحفة", "جمال", "ابداع"];
  var colors = ["#00fff7", "#ff00ff", "#ffd700", "#ff4444", "#00ff88", "#ff8800"];

  function typeWriter(element, text, speed, callback){
    var i = 0;
    element.textContent = "";
    function type(){
      if(i < text.length){
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if(callback){
        setTimeout(callback, 1000);
      }
    }
    type();
  }

  function deleteWriter(element, speed, callback){
    var text = element.textContent;
    function del(){
      if(text.length > 0){
        text = text.substring(0, text.length - 1);
        element.textContent = text;
        setTimeout(del, speed);
      } else if(callback){
        setTimeout(callback, 500);
      }
    }
    del();
  }

  var titleIndex = 0;
  function animateTitle(){
    var word = titleWords[titleIndex];
    typeWriter(titlePart, word, 100, function(){
      setTimeout(function(){
        deleteWriter(titlePart, 50, function(){
          titleIndex = (titleIndex + 1) % titleWords.length;
          setTimeout(animateTitle, 500);
        });
      }, 2000);
    });
  }

  var subtitleIndex = 0;
  function animateSubtitle(){
    var word = subtitleWords[subtitleIndex];
    var color = colors[subtitleIndex % colors.length];
    subtitleText.style.color = color;
    subtitleText.style.textShadow = "0 0 20px " + color;
    typeWriter(subtitleText, "عاوز " + word, 80, function(){
      setTimeout(function(){
        deleteWriter(subtitleText, 50, function(){
          subtitleIndex = (subtitleIndex + 1) % subtitleWords.length;
          setTimeout(animateSubtitle, 300);
        });
      }, 3000);
    });
  }

  setTimeout(animateTitle, 500);
  setTimeout(animateSubtitle, 2000);
})();

// ===== SKILL BOXES INTERACTION =====
(function(){
  var skillBoxes = document.querySelectorAll(".skill-box");
  skillBoxes.forEach(function(box){
    box.addEventListener("click", function(){
      var isActive = this.classList.contains("active");
      skillBoxes.forEach(function(b){ b.classList.remove("active"); });
      if(!isActive){
        this.classList.add("active");
      }
    });
  });
  
  document.addEventListener("click", function(e){
    if(!e.target.closest(".skill-box")){
      skillBoxes.forEach(function(b){ b.classList.remove("active"); });
    }
  });
  
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape"){
      skillBoxes.forEach(function(b){ b.classList.remove("active"); });
    }
  });
})();

// Smooth anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if(target) {
      lenis.scrollTo(target);
    }
  });
});
