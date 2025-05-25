// Initialize AOS (Animate On Scroll)
AOS.init();

// Store email in sessionStorage on login (optional enhancement)
if (window.location.pathname.endsWith('/login.html')) {
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const email = form.querySelector('input[name="email"]').value;
      const role = form.querySelector('select[name="role"]').value;
      sessionStorage.setItem('userEmail', email);
      sessionStorage.setItem('userRole', role);
    });
  }
}

// Optional dark mode toggle (future enhancement)
// const toggleBtn = document.getElementById("dark-mode-toggle");
// if (toggleBtn) {
//   toggleBtn.addEventListener("click", () => {
//     document.body.classList.toggle("dark-mode");
//   });
// }
