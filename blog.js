document.addEventListener("DOMContentLoaded", function () {
    const blogListContainer = document.getElementById("blog-list");
    const blogContentContainer = document.getElementById("blog-content");
    const returnButton = document.getElementById("return-btn");
    const converter = new showdown.Converter({
        tables: true,                // Enable table support
        simplifiedAutoLink: true,     // Auto-link URLs
        strikethrough: true,          // Enable ~~strikethrough~~
        tasklists: true,              // Enable [ ] and [x] task lists
        smoothLivePreview: true,      // Live preview smooth rendering
        openLinksInNewWindow: true    // Open links in new tabs
    });

    // Simulated list of markdown files (Static Websites can't fetch directories)
    const posts = ["OlfactoryInterfaces.md", "Quals.md"];

    // Display blog previews as cards
    blogListContainer.innerHTML = "";
    posts.forEach(post => {
        fetch(`posts/${post}`)
            .then(response => response.ok ? response.text() : Promise.reject("Failed to load " + post))
            .then(markdown => {
                const lines = markdown.split("\n").filter(line => line.trim() !== "");
                const postTitle = lines[0].replace("# ", ""); // Extract title
                let postIntro = "";
                for (let i = 1; i < lines.length; i++) {
                    if (!lines[i].startsWith("#")) { // Ignore headers
                        postIntro = lines[i].trim(); // Take the first actual paragraph
                        break;
                    }
                }
                
                const introHTML = converter.makeHtml(postIntro); // Convert only first paragraph

                const postCard = document.createElement("div");
                postCard.classList.add("blog-card");

                const postLink = document.createElement("a");
                postLink.href = "#";
                postLink.classList.add("blog-title");
                postLink.textContent = postTitle;
                postLink.onclick = function () {
                    loadMarkdown(post);
                };

                const introText = document.createElement("div");
                introText.classList.add("blog-intro");
                introText.innerHTML = introHTML;

                postCard.appendChild(postLink);
                postCard.appendChild(introText);
                blogListContainer.appendChild(postCard);
            })
            .catch(error => console.error(error));
    });

    function loadMarkdown(postFile) {
        fetch(`posts/${postFile}`)
            .then(response => response.ok ? response.text() : Promise.reject("Failed to load " + postFile))
            .then(markdown => {
                const htmlContent = converter.makeHtml(markdown);
                blogContentContainer.innerHTML = `<div class="full-post">${htmlContent}</div>`;
    
                blogContentContainer.appendChild(returnButton);
                blogContentContainer.classList.remove("hidden");
                blogListContainer.style.display = "none";
            })
            .catch(error => {
                blogContentContainer.innerHTML = "<p>Error loading the blog post.</p>";
                console.error(error);
            });
    }

    returnButton.addEventListener("click", function () {
        blogContentContainer.classList.add("hidden");
        blogListContainer.style.display = "block";
    });
});