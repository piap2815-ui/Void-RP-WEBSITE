const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
const toast = document.getElementById("toast");
let toastTimer;

menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Menü öffnen" : "Menü schließen");
    mainNav.classList.toggle("is-open", !isOpen);
});

mainNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Menü öffnen");
        mainNav.classList.remove("is-open");
    });
});

document.addEventListener("click", (event) => {
    if (!event.target.closest(".header-inner")) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Menü öffnen");
        mainNav.classList.remove("is-open");
    }
});

function showToast(message) {
    window.clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = window.setTimeout(() => {
        toast.classList.remove("is-visible");
    }, 4200);
}

document.querySelectorAll("[data-placeholder]").forEach((button) => {
    button.addEventListener("click", () => {
        showToast(button.dataset.placeholder);
    });
});

const revealElements = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach((element) => observer.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("is-visible"));
}

document.getElementById("year").textContent = new Date().getFullYear();
