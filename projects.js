document.addEventListener("DOMContentLoaded", function () {
    const projectsContainer = document.getElementById("projects-list");

    fetch("projects.json")
        .then(response => response.json())
        .then(data => {
            projectsContainer.innerHTML = ""; // Clear existing content

            data.forEach(project => {
                // Card element
                const projectCard = document.createElement("div");
                projectCard.classList.add("col");

                let mediaContent;
                if (project.type === "image") {
                    mediaContent = `<img src="${project.media}" class="card-img-top">`;
                } else if (project.type === "iframe") {
                    mediaContent = `<iframe class="card-img-top" src="${project.media}" frameborder="0" allowfullscreen></iframe>`;
                }

                // Card HTML
                projectCard.innerHTML = `
                    <div class="card">
                        ${mediaContent}
                        <div class="card-body">
                            <h2>${project.title}</h2>
                            <p class="card-text">${project.description}</p>
                            <div class="mb-3">
                                ${project.tags.map(tag => `<span class="badge bg-secondary">${tag}</span>`).join(" ")}
                            </div>
                            <div class="btn-group">
                                ${project.links.map(link => `<a href="${link.url}" class="btn btn-sm btn-outline-primary">${link.label}</a>`).join(" ")}
                            </div>
                            <small class="small-text">${project.status}</small>
                        </div>
                    </div>
                `;
                projectsContainer.appendChild(projectCard);
            });
        })
        .catch(error => console.error("Error loading projects:", error));
});
