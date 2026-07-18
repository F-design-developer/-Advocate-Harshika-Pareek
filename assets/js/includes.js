document.addEventListener("DOMContentLoaded", async () => {
    try {

        /* ==========================
           HEADER LOAD
        ========================== */

        const header = document.getElementById("header");

        if (header) {

            const headerResponse = await fetch("./components/header.html");
            header.innerHTML = await headerResponse.text();

            /* ==========================
               DISCLAIMER POPUP
            ========================== */

            if (!localStorage.getItem("disclaimerAccepted")) {

                setTimeout(() => {

                    const modal =
                        document.getElementById("disclaimerModal");

                    if (!modal) return;

                    modal.style.display = "block";
                    modal.classList.add("show");

                    document.body.classList.add("modal-open");

                    if (!document.getElementById("customModalBackdrop")) {

                        const backdrop = document.createElement("div");
                        backdrop.className = "modal-backdrop fade show";
                        backdrop.id = "customModalBackdrop";

                        document.body.appendChild(backdrop);
                    }

                }, 2000);
            }

            /* ==========================
               MODAL BUTTONS
            ========================== */

            document.addEventListener("click", function (e) {

                if (e.target.id === "disclaimerAgree") {

                    localStorage.setItem(
                        "disclaimerAccepted",
                        "true"
                    );

                    const modal =
                        document.getElementById("disclaimerModal");

                    if (modal) {

                        // focus hatao
                        document.activeElement.blur();

                        modal.classList.remove("show");
                        modal.style.display = "none";
                    }

                    document.body.classList.remove("modal-open");

                    const backdrop =
                        document.getElementById(
                            "customModalBackdrop"
                        );

                    if (backdrop) {
                        backdrop.remove();
                    }
                }

                if (e.target.id === "disclaimerExit") {

                    window.location.href =
                        "https://www.google.com";
                }

            });
        }

        /* ==========================
           FOOTER LOAD
        ========================== */

        const footer = document.getElementById("footer");

        if (footer) {

            const footerResponse =
                await fetch("./components/footer.html");

            footer.innerHTML =
                await footerResponse.text();
        }

        /* ==========================
           ACTIVE MENU
        ========================== */

        const currentPage =
            window.location.pathname.split("/").pop() ||
            "index.html";

        document.querySelectorAll(".nav-link").forEach(link => {

            const href = link.getAttribute("href");

            if (href === currentPage) {
                link.classList.add("active");
            }
        });

        /* ==========================
           AOS INIT
        ========================== */

        if (typeof AOS !== "undefined") {

            AOS.init({
                duration: 800,
                once: true
            });

            AOS.refresh();
        }

    } catch (err) {

        console.error("Includes Error:", err);
    }
});