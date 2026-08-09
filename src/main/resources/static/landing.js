// =======================================
// Scroll Reveal Animation
// =======================================

const revealElements = document.querySelectorAll(
    ".feature-card, .cta, footer"
);

function revealOnScroll() {

    revealElements.forEach(element => {

        const windowHeight = window.innerHeight;

        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 120) {

            element.classList.add("active");

            element.classList.add("reveal");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

revealOnScroll();


// =======================================
// Hero Zoom Effect
// =======================================

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");

    let scroll = window.scrollY;

    hero.style.transform =
        `scale(${1 - scroll * 0.00015})`;

});


// =======================================
// Floating Mouse Parallax
// =======================================

const illustration = document.querySelector(".hero-illustration");

document.addEventListener("mousemove", (e) => {

    const x = (window.innerWidth / 2 - e.clientX) / 35;

    const y = (window.innerHeight / 2 - e.clientY) / 35;

    illustration.style.transform =
        `translate(${x}px,${y}px)`;

});


// =======================================
// Smooth Navbar Shadow
// =======================================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,.15)";

    }

    else {

        navbar.style.boxShadow =
            "0 5px 20px rgba(0,0,0,.08)";

    }

});


// =======================================
// Floating Animation Delay
// =======================================

document.querySelectorAll(".floating-card").forEach((card, index) => {

    card.style.animationDelay = `${index * .4}s`;

});


// =======================================
// Button Ripple Effect
// =======================================

document.querySelectorAll("button,.btn,.primary-btn,.secondary-btn")

.forEach(button => {

    button.addEventListener("click", function (e) {

        const circle = document.createElement("span");

        const diameter = Math.max(this.clientWidth, this.clientHeight);

        circle.style.width = circle.style.height = diameter + "px";

        circle.style.left = e.offsetX - diameter / 2 + "px";

        circle.style.top = e.offsetY - diameter / 2 + "px";

        circle.classList.add("ripple");

        const ripple = this.querySelector(".ripple");

        if (ripple) {

            ripple.remove();

        }

        this.appendChild(circle);

    });

});

// =======================================
// Mouse Spark Effect
// =======================================

const colors = [

    "#2563eb",
    "#3b82f6",
    "#60a5fa",
    "#22c55e",
    "#f59e0b",
    "#ec4899",
    "#a855f7"

];

document.addEventListener("mousemove", function(e){

    const particle = document.createElement("div");

    particle.className = "particle";

    particle.style.left = e.clientX + "px";

    particle.style.top = e.clientY + "px";

    particle.style.background =
        colors[Math.floor(Math.random()*colors.length)];

    particle.style.color =
        particle.style.background;

    const size = Math.random()*8 + 4;

    particle.style.width = size + "px";

    particle.style.height = size + "px";

    document.body.appendChild(particle);

    setTimeout(()=>{

        particle.remove();

    },800);

});