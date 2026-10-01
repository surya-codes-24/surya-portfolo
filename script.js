const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.12 });
reveals.forEach(el => observer.observe(el));

async function loadRepos() {
  const grid = document.getElementById("repo-grid");
  try {
    const response = await fetch("https://api.github.com/users/surya-codes-24/repos?sort=updated&per_page=6");
    if (!response.ok) throw new Error("GitHub API unavailable");
    const repos = await response.json();
    if (!repos.length) {
      grid.innerHTML = '<div class="repo-placeholder">No public repositories yet — new projects will appear here automatically.</div>';
      return;
    }
    grid.innerHTML = repos.map(repo => `
      <article class="repo-card">
        <h4>${escapeHTML(repo.name)}</h4>
        <p>${escapeHTML(repo.description || "A project by S. Surya.")}</p>
        <a href="${repo.html_url}" target="_blank">View repository ↗</a>
      </article>
    `).join("");
  } catch {
    grid.innerHTML = '<div class="repo-placeholder">GitHub repositories could not be loaded right now. <a href="https://github.com/surya-codes-24" target="_blank">Open GitHub ↗</a></div>';
  }
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[char]));
}
loadRepos();

function sendMail(event) {
  event.preventDefault();
  const name = document.getElementById("senderName").value;
  const email = document.getElementById("senderEmail").value;
  const message = document.getElementById("senderMessage").value;
  const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:surya524111@gmail.com?subject=${subject}&body=${body}`;
  return false;
}

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");
menuBtn?.addEventListener("click", () => {
  navLinks.style.display = navLinks.style.display === "flex" ? "none" : "flex";
  navLinks.style.position = "absolute";
  navLinks.style.top = "65px";
  navLinks.style.left = "0";
  navLinks.style.right = "0";
  navLinks.style.padding = "18px";
  navLinks.style.background = "rgba(7,16,24,.98)";
  navLinks.style.flexDirection = "column";
  navLinks.style.borderBottom = "1px solid rgba(124,180,205,.16)";
});
