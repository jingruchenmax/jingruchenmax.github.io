document.addEventListener("DOMContentLoaded", function () {
    const researchContainer = document.getElementById("research-list");

    fetch("research.json")
        .then(response => response.json())
        .then(data => {
            researchContainer.innerHTML = ""; // Clear default content

            // Sort research by date (most recent first)
            data.sort((a, b) => new Date(b.date) - new Date(a.date));

            // Group research by year
            const researchByYear = {};
            data.forEach(item => {
                const year = item.date.split(" ")[1] || item.date; // Extract year
                if (!researchByYear[year]) {
                    researchByYear[year] = [];
                }
                researchByYear[year].push(item);
            });

            // Generate collapsible year sections (expanded by default)
            Object.keys(researchByYear)
                .sort((a, b) => b - a) // Sort years in descending order
                .forEach(year => {
                    const yearSection = document.createElement("div");
                    yearSection.classList.add("year-section");

                    // Year Header (Collapsible but expanded by default)
                    const yearHeader = document.createElement("button");
                    yearHeader.classList.add("collapsible", "active");
                    yearHeader.innerHTML = `<h3>📅 ${year}</h3>`;
                    yearHeader.addEventListener("click", function () {
                        this.classList.toggle("active");
                        const content = this.nextElementSibling;
                        content.style.display = content.style.display === "none" ? "block" : "none";
                    });

                    // Research List for Year (Expanded by default)
                    const yearContent = document.createElement("div");
                    yearContent.classList.add("collapsible-content");
                    yearContent.style.display = "block"; // Ensure all cards are visible initially

                    researchByYear[year].forEach(item => {
                        // Research Type Icons
                        const typeIcons = {
                            "journal": `<i class="fa fa-star me-2"></i>`,
                            "conference": `<i class="fa fa-sticky-note me-2"></i>`,
                            "workshop": `<i class="fa fa-cog me-2"></i>`,
                            "demo": `<i class="fa fa-flask me-2"></i>`,
                            "panel": `<i class="fa fa-comments me-2"></i>`,
                            "presentation": `<i class="fa fa-chalkboard-teacher me-2"></i>`,
                            "talk": `<i class="fa fa-microphone me-2"></i>`,
                            "other": `<i class="fa fa-ellipsis-h me-2"></i>`
                        };

                        // Construct authors string
                        const authorsFormatted = item.authors.join(", ");

                        // Research Card
                        const researchCard = document.createElement("div");
                        researchCard.classList.add("research-card");

                        researchCard.innerHTML = `
                            <div class="research-header">
                                ${typeIcons[item.type] || `<i class="fa fa-ellipsis-h me-2"></i>`}
                                <h4 class="research-title">${item.title}</h4>
                            </div>
                            <p class="text-secondary research-authors">${authorsFormatted}</p>
                            <p class="research-description">${item.description || ""}</p>
                            <p class="research-meta">
                                <b>${item.venue}</b> · ${item.location ? item.location + " · " : ""} ${item.date}
                            </p>
                            ${item.link ? `<a href="${item.link}" target="_blank" class="btn btn-outline-primary">View Publication</a>` : ""}
                        `;

                        yearContent.appendChild(researchCard);
                    });

                    // Append sections
                    yearSection.appendChild(yearHeader);
                    yearSection.appendChild(yearContent);
                    researchContainer.appendChild(yearSection);
                });
        })
        .catch(error => console.error("Error loading research data:", error));
});
