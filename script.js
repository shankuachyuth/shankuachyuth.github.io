document.addEventListener("DOMContentLoaded", () => {
  const toggleBtn = document.getElementById("theme-toggle");
  const body = document.body;
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme === "dark") {
    body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  }
  toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark");
    const isDark = body.classList.contains("dark");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = { threshold: 0.1 };
  const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => appearOnScroll.observe(fader));

  const topBtn = document.getElementById('topBtn');
  window.addEventListener('scroll', () => {
    topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const phrases = ["Achyuth Narayan"];
  let i = 0, j = 0, currentPhrase = [], isDeleting = false;
  function loop() {
    document.getElementById("typed-text").innerHTML = currentPhrase.join("");
    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j++]);
    } else if (isDeleting && j > 0) {
      currentPhrase.pop();
      j--;
    } else if (!isDeleting && j > phrases[i].length) {
      isDeleting = true;
      setTimeout(loop, 10000000000000000); // effectively stops
      return;
    } else if (isDeleting && j === 0) {
      isDeleting = false;
      i = (i + 1) % phrases.length;
    }
    setTimeout(loop, isDeleting ? 50 : 100);
  }
  loop();
});
