function createHeaderSection(title, description) {
    return `
        <section class="py-5 text-center container">
            <div class="row py-lg-5">
                <div class="col-lg-6 col-md-8 mx-auto">
                    <h1>${title}</h1>
                    <p class="lead-text">${description}</p>
                </div>
            </div>
        </section>
    `;
}

// Function to insert the header into a page
function insertHeaderSection(containerId, title, description) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = createHeaderSection(title, description);
    }
}
