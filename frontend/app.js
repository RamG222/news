document.addEventListener("DOMContentLoaded", async () => {
  const newsList = document.getElementById("news-list");

  try {
    const response = await fetch("http://localhost:3000/news");
    const data = await response.json();

    data.forEach((article) => {
      const articleElement = document.createElement("div");
      articleElement.className = "article";
      articleElement.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.content}</p>
        <p class="date">Published on: ${new Date(
          article.published_at
        ).toLocaleDateString()}</p>
      `;
      newsList.appendChild(articleElement);
    });
  } catch (error) {
    console.error("Error fetching news:", error);
  }
});
