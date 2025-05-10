
if (!(isMobile() || isTablet())) {
	document.querySelectorAll(".nav-item-title").forEach(function (el) {
		el.style.display = "none";
	});
	const sidebar = document.querySelector(".hr-sidebar");
	if (sidebar) {
		sidebar.style.transition = "width .2s";
		sidebar.onmouseover = function () {
			sidebar.style.width = "250px";
			sidebar.querySelectorAll(".nav-item-title").forEach(function (el) {
				el.style.display = "flex";
			});
		};
		sidebar.onmouseout = function () {
			document.querySelectorAll(".nav-item-title").forEach(function (el) {
				el.style.display = "none";
			});
			sidebar.style.width = "50px";
		};
	}
}

function setup_sidebar_toggle() {
	if (!document.querySelector(".frappe-sidebar-toggle")) return;
	document.querySelector(".frappe-sidebar-toggle").onclick = () => {
		if (!document.querySelector(".hr-sidebar")) return;
		document.querySelector(".hr-sidebar").style.left = "0px";
		document.querySelector(".sidebar-backdrop").style.display = "block";
	};
	document.querySelector(".sidebar-backdrop").onclick = () => {
		if (!document.querySelector(".hr-sidebar")) return;
		document.querySelector(".hr-sidebar").style.left = "-250px";
		document.querySelector(".sidebar-backdrop").style.display = "none";
	};
}

function isMobile() {
	return window.matchMedia("(max-width: 767px)").matches;
}
function isTablet() {
	return window.matchMedia("(max-width: 1024px) and (min-width: 768px)").matches;
}




function setup_navbar_tooltip() {
	if (isMobile() || isTablet()) return;
	Promise.all([
		loadScript("https://unpkg.com/@popperjs/core@2"),
		loadScript("https://unpkg.com/tippy.js@6")
	]).then(() => {
		const navItems = [
			{ selector: ".nav-contents", content: "Contents" },
			{ selector: ".nav-welcome", content: "Welcome" },
			{ selector: ".nav-home", content: "Home" },
			{ selector: ".nav-products", content: "Products" },
			{ selector: ".nav-partners", content: "Partners" },
			{ selector: ".nav-blog", content: "Blog" },
			{ selector: ".nav-contact", content: "Contact" },
			{ selector: ".nav-story", content: "Story" },
			{ selector: ".nav-about", content: "About" },
			{ selector: ".nav-values", content: "Values" },
			{ selector: ".nav-vision", content: "Vision" },
			{ selector: ".nav-events", content: "Events" },
			{ selector: ".nav-testimonials", content: "Testimonials" },
			{ selector: ".nav-explainers", content: "Explainers" },
			{ selector: ".nav-incubator", content: "Incubator" },
			{ selector: ".nav-careers", content: "Careers" },
		];

		tippy.setDefaultProps({ placement: "right" });

		navItems.forEach((item) => {
			tippy(item.selector, {
				content: item.content,
			});
		});
	});
}

async function loadScript(src) {
	return new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = src;
		script.onload = resolve;
		script.onerror = reject;
		document.head.appendChild(script);
	});
}

async function loadStyle(href) {
	return new Promise((resolve, reject) => {
		const link = document.createElement("link");
		link.rel = "stylesheet";
		link.href = href;
		link.onload = resolve;
		link.onerror = reject;
		document.head.appendChild(link);
	});
}

function setup_scroll_position_restore() {
	function wasTraversed() {
		const entries = performance.getEntriesByType("navigation");
		if (entries.length === 0) return false;
		return entries[0].type === "back_forward";
	}

	function wasReloaded() {
		const entries = performance.getEntriesByType("navigation");
		if (entries.length === 0) return false;
		return entries[0].type === "reload";
	}

	window.addEventListener("beforeunload", function () {
		if (wasReloaded() && !window.location.pathname.includes("/blog/")) {
			sessionStorage.removeItem(`scrollPosition:${window.location.pathname}`);
		}
		const container = document.querySelector(".body-container");
		if (container) {
			const scrollPosition = container.scrollTop;
			sessionStorage.setItem(`scrollPosition:${window.location.pathname}`, scrollPosition);
		}
	});

	const savedScrollPosition =
		sessionStorage.getItem(`scrollPosition:${window.location.pathname}`) || 0;

	const container = document.querySelector(".body-container");
	if (container && (wasTraversed() || window.location.pathname.includes("/blog/"))) {
		container.scrollTop = savedScrollPosition;
	}
}


function setup_navigation_shortcut() {
	document.addEventListener("keydown", function (e) {
		const active = document.querySelector(".nav-link-item[active=true]");
		if (!active) return;

		let next = e.keyCode === 40 ? active.nextElementSibling :
			e.keyCode === 38 ? active.previousElementSibling : null;

		while (next && (!next.classList.contains("nav-link-item") || next.offsetParent === null)) {
			next = e.keyCode === 40 ? next.nextElementSibling :
				e.keyCode === 38 ? next.previousElementSibling : null;
		}

		if (e.shiftKey && next) {
			next.click();
		}
	});
}

setup_navbar_tooltip();
setup_sidebar_toggle();
setup_scroll_position_restore();
setup_navigation_shortcut();

