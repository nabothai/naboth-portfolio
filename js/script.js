/* =========================================================
   NABOTH MAFADZA PORTFOLIO
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
    ====================================================== */

    const body = document.body;

    const menuToggle =
        document.getElementById("menu-toggle");

    const navWrapper =
        document.getElementById("nav-wrapper");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const themeToggle =
        document.getElementById("theme-toggle");

    const themeIcon =
        document.querySelector(".theme-icon");

    const currentYear =
        document.getElementById("current-year");

    const academicStatus =
        document.getElementById("academic-status");

    const graduationStatus =
        document.getElementById("graduation-status");

    const heroAcademicStatus =
        document.getElementById("hero-academic-status");


    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    function openMenu() {

        if (!menuToggle || !navWrapper) {
            return;
        }

        menuToggle.classList.add("active");
        navWrapper.classList.add("open");
        body.classList.add("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "true"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );
    }


    function closeMenu() {

        if (!menuToggle || !navWrapper) {
            return;
        }

        menuToggle.classList.remove("active");
        navWrapper.classList.remove("open");
        body.classList.remove("menu-open");

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        menuToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );
    }


    if (menuToggle) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navWrapper.classList.contains("open");

                if (isOpen) {
                    closeMenu();
                } else {
                    openMenu();
                }

            }
        );

    }


    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            () => {
                closeMenu();
            }
        );

    });


    document.addEventListener(
        "click",
        event => {

            if (
                !navWrapper ||
                !menuToggle
            ) {
                return;
            }

            const clickedInsideNav =
                navWrapper.contains(event.target);

            const clickedMenu =
                menuToggle.contains(event.target);

            if (
                navWrapper.classList.contains("open") &&
                !clickedInsideNav &&
                !clickedMenu
            ) {
                closeMenu();
            }

        }
    );


    /* =====================================================
       THEME
    ====================================================== */

    const savedTheme =
        localStorage.getItem("naboth-theme");

    const systemPrefersLight =
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: light)"
        ).matches;


    function setTheme(theme) {

        if (theme === "light") {

            document.documentElement
                .setAttribute(
                    "data-theme",
                    "light"
                );

            if (themeIcon) {
                themeIcon.textContent = "☾";
            }

        } else {

            document.documentElement
                .removeAttribute("data-theme");

            if (themeIcon) {
                themeIcon.textContent = "☼";
            }

        }

        localStorage.setItem(
            "naboth-theme",
            theme
        );
    }


    if (savedTheme) {

        setTheme(savedTheme);

    } else if (systemPrefersLight) {

        setTheme("light");

    } else {

        setTheme("dark");

    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                const current =
                    document.documentElement
                        .getAttribute("data-theme");

                if (current === "light") {

                    setTheme("dark");

                } else {

                    setTheme("light");

                }

            }
        );

    }


    /* =====================================================
       GRADUATION STATUS
       
       This automatically updates the portfolio after
       the configured graduation date.
    ====================================================== */

    const graduationDate =
        new Date(
            "2028-12-31T23:59:59"
        );


    function updateAcademicStatus() {

        const today = new Date();

        const graduated =
            today >= graduationDate;


        if (graduated) {

            if (academicStatus) {

                academicStatus.textContent =
                    "Graduate · BSc (Honours) IT";

            }

            if (graduationStatus) {

                graduationStatus.textContent =
                    "Graduated · December 2028";

            }

            if (heroAcademicStatus) {

                heroAcademicStatus.textContent =
                    "Graduate · BSc (Honours) IT";

            }

        } else {

            if (academicStatus) {

                academicStatus.textContent =
                    "2nd Year · 2nd Semester";

            }

            if (graduationStatus) {

                graduationStatus.textContent =
                    "Expected December 2028";

            }

            if (heroAcademicStatus) {

                heroAcademicStatus.textContent =
                    "2nd Year · 2nd Semester";

            }

        }

    }


    updateAcademicStatus();


    /* =====================================================
       CURRENT YEAR
    ====================================================== */

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if (
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target
                                .classList
                                .add(
                                    "reveal-visible"
                                );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.08,
                    rootMargin:
                        "0px 0px -40px 0px"
                }
            );


        revealElements.forEach(element => {

            observer.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add(
                "reveal-visible"
            );

        });

    }


    /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );


    function updateActiveNav() {

        const scrollPosition =
            window.scrollY +
            window.innerHeight * 0.35;


        let currentSection = "home";


        sections.forEach(section => {

            const top =
                section.offsetTop;

            const bottom =
                top + section.offsetHeight;


            if (
                scrollPosition >= top &&
                scrollPosition < bottom
            ) {

                currentSection =
                    section.id;

            }

        });


        navLinks.forEach(link => {

            const target =
                link.getAttribute("href");


            link.classList.toggle(
                "active",
                target === `#${currentSection}`
            );

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNav,
        {
            passive: true
        }
    );


    updateActiveNav();


    /* =====================================================
       ESCAPE KEY
    ====================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       RESIZE HANDLING
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 800
            ) {

                closeMenu();

            }

        }
    );


    /* =====================================================
       CERTIFICATE IMAGE ERROR HANDLING
    ====================================================== */

    const certificateImage =
        document.querySelector(
            ".certificate-image"
        );


    if (certificateImage) {

        certificateImage.addEventListener(
            "error",
            () => {

                certificateImage.alt =
                    "Certificate image could not be loaded.";

            }
        );

    }


    /* =====================================================
       SMOOTH INTERNAL LINKS
       
       Keeps navigation reliable even if browser settings
       interfere with native scrolling.
    ====================================================== */

    document
        .querySelectorAll(
            'a[href^="#"]'
        )
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(
                            targetId
                        );

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    const header =
                        document.querySelector(
                            ".site-header"
                        );

                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;

                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;

                    window.scrollTo({
                        top:
                            targetPosition,
                        behavior:
                            "smooth"
                    });

                }
            );

        });


    /* =====================================================
       INITIAL PAGE STATE
    ====================================================== */

    document
        .querySelectorAll(
            ".hero .reveal"
        )
        .forEach(element => {

            setTimeout(
                () => {

                    element.classList.add(
                        "reveal-visible"
                    );

                },
                120
            );

        });

});