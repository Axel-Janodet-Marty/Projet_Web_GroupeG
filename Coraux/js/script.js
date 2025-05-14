console.log("Bienvenue sur le site dédié aux coraux !");

window.addEventListener("DOMContentLoaded", () => {
    const titles = document.querySelectorAll("h2");
    titles.forEach(title => {
        title.addEventListener("click", () => {
            title.style.color = "#ff6600";
        });
    });
});
