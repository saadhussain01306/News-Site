const container = document.querySelector(".container");
const optionsContainer = document.querySelector(".options-container");
const country = "in";
const options = [
  "general",
  "entertainment",
  "health",
  "science",
  "sports",
  "technology",
];

let requestURL;
let selectedCategory;

const generateUI = (articles) => {
  container.innerHTML = "";
  for (let item of articles) {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `<div class="news-image-container">
      <img src="${item.urlToImage || "./newspaper.jpg"}" alt="" />
    </div>
    <div class="news-content">
      <div class="news-title">
        ${item.title}
      </div>
      <div class="news-description">
        ${item.description || item.content || ""}
      </div>
      <a href="${item.url}" target="_blank" class="view-button">Read More..</a>
    </div>`;
    container.appendChild(card);
  }
};

const getNews = async () => {
  let response = await fetch(requestURL);
  if (!response.ok) {
    alert("Data unavailable at the moment. Please try again later");
    return false;
  }
  let data = await response.json();
  generateUI(data.articles);
};

const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`;
  e.target.classList.add("active");
  selectedCategory = category;
  localStorage.setItem("selectedCategory", selectedCategory); // Store selected category
  getNews();
};

const createOptions = () => {
  for (let i of options) {
    optionsContainer.innerHTML += `<button class="option ${
      i == "general" ? "active" : ""
    }" onclick="selectCategory(event,'${i}')">${i}</button>`;
  }
};

const init = () => {
  optionsContainer.innerHTML = "";
  selectedCategory = localStorage.getItem("selectedCategory");
  if (selectedCategory) {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${selectedCategory}&apiKey=${apiKey}`;
  } else {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${apiKey}`;
  }
  getNews();
  createOptions();
};

const refreshNews = () => {
  if (selectedCategory) {
    requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${selectedCategory}&apiKey=${apiKey}`;
    getNews();
  }
};

window.onload = () => {
  init();
};
