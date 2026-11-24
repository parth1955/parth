document.documentElement.classList.add("js");

var EMAIL = "your@email.com"; // ✏️ replace with your real email
var $ = function (i) { return document.getElementById(i); };

$("ap").src = $("hp").src;
$("ml").href = "mailto:" + EMAIL;

$("cp").onclick = function () {
    try {
        navigator.clipboard.writeText(EMAIL);
        $("cp").textContent = "Copied!";
        setTimeout(function () { $("cp").textContent = "Copy email"; }, 1800);
    } catch (e) {}
};

$("mailForm").onsubmit = async function (e) {
    e.preventDefault();
    var btn = $("sendBtn");
    var status = $("formStatus");
    btn.textContent = "Sending...";
    btn.disabled = true;

    try {
        var res = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: new FormData($("mailForm"))
        });
        var data = await res.json();
        if (data.success) {
            status.textContent = "Message sent! I’ll get back to you soon.";
            $("mailForm").reset();
        } else {
            status.textContent = "Something went wrong. Please try again.";
        }
    } catch (err) {
        status.textContent = "Network error. Please try again.";
    } finally {
        btn.textContent = "Send email";
        btn.disabled = false;
    }
};

addEventListener("scroll", function () {
    $("nav").classList.toggle("s", scrollY > 20);
}, { passive: true });

var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
        if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
        }
    });
}, { threshold: .1 });

document.querySelectorAll(".rv").forEach(function (e) { io.observe(e); });

var so = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
        if (e.isIntersecting) {
            document.querySelectorAll(".links a").forEach(function (a) {
                a.classList.toggle("on", a.getAttribute("href") == "#" + e.target.id);
            });
        }
    });
}, { rootMargin: "-45% 0px -50% 0px" });

["work", "about", "services", "contact"].forEach(function (i) { so.observe($(i)); });

// cursor label like the Framer preview
if (matchMedia("(hover:hover) and (pointer:fine)").matches && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
    var t = $("tag"), x = 0, y = 0, tx = 0, ty = 0;
    addEventListener("mousemove", function (e) {
        tx = e.clientX + 16;
        ty = e.clientY + 18;
        var d = e.target.closest("[data-tag]");
        if (d) {
            t.textContent = d.dataset.tag;
            t.style.opacity = 1;
        } else {
            t.style.opacity = 0;
        }
    });
    document.addEventListener("mouseleave", function () { t.style.opacity = 0; });
    (function f() {
        x += (tx - x) * .18;
        y += (ty - y) * .18;
        t.style.transform = "translate(" + x + "px," + y + "px)";
        requestAnimationFrame(f);
    })();

    var roles = ["UX Researcher", "UI Designer", "UI/UX Designer"];
var roleIndex = 0;
var roleEl = $("roleText");

if (roleEl && !matchMedia("(prefers-reduced-motion:reduce)").matches) {
    setInterval(function () {
        roleEl.classList.add("fade");
        setTimeout(function () {
            roleIndex = (roleIndex + 1) % roles.length;
            roleEl.textContent = roles[roleIndex];
            roleEl.classList.remove("fade");
        }, 350);
    }, 2600);
}
}