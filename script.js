const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector(".navbar");
const header = document.querySelector(".header");
const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("section[id]");
const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = themeToggle?.querySelector("i");
const scrollTopButton = document.querySelector("#scroll-top");
const statCounters = document.querySelectorAll("[data-count]");

const applyTheme = (theme) => {
    const isLight = theme === "light";
    document.body.classList.toggle("light-theme", isLight);
    if (themeIcon) {
        themeIcon.classList.toggle("bx-moon", !isLight);
        themeIcon.classList.toggle("bx-sun", isLight);
    }
};

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme) {
    applyTheme(savedTheme);
}

menuIcon?.addEventListener("click", () => {
    menuIcon.classList.toggle("bx-x");
    navbar?.classList.toggle("active");
});

themeToggle?.addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("light-theme") ? "dark" : "light";
    applyTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
});

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        menuIcon?.classList.remove("bx-x");
        navbar?.classList.remove("active");
    });
});

window.addEventListener("scroll", () => {
    header?.classList.toggle("sticky", window.scrollY > 30);
    scrollTopButton?.classList.toggle("show", window.scrollY > 500);

    let currentSection = "home";
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            currentSection = section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });
});

scrollTopButton?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

if (document.querySelector(".multiple-text") && typeof Typed !== "undefined") {
    new Typed(".multiple-text", {
        strings: ["Frontend Developer", "MERN Stack Learner", "Community Builder"],
        typeSpeed: 75,
        backSpeed: 42,
        backDelay: 1400,
        loop: true,
    });
}

const revealItems = document.querySelectorAll("[data-reveal]");

const animateCounter = (element) => {
    const target = Number(element.dataset.count || 0);
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const value = Math.floor(progress * target);
        element.textContent = `${value}+`;
        element.classList.add("counting");
        if (progress < 1) {
            requestAnimationFrame(tick);
        } else {
            element.textContent = `${target}+`;
            element.classList.remove("counting");
        }
    };

    requestAnimationFrame(tick);
};

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    if (entry.target.querySelectorAll("[data-count]").length) {
                        entry.target.querySelectorAll("[data-count]").forEach(animateCounter);
                    }
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add("visible"));
    statCounters.forEach(animateCounter);
}

