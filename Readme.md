To add a backend to your news site, you can use a server-side language like Node.js with Express. Below is a simple example of how you can create a backend to handle the API requests. Please note that this is a basic example, and you might want to enhance it based on your specific requirements.

1. Install Node.js and npm (if not already installed).

2. Create a new directory for your project and navigate to it in the terminal.

3. Run the following commands to initialize a new Node.js project and install necessary dependencies:

```bash
npm init -y
npm install express node-fetch
```

4. Create a file named `server.js` for your backend code:

```javascript
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;
const apiKey = 'ff508e28e7014c7e8624ccd1b1048ce6';
const country = 'in';

app.use(express.static('public'));

app.get('/news', async (req, res) => {
  const { category } = req.query;

  try {
    const response = await fetch(
      `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apiKey}`
    );

    if (!response.ok) {
      throw new Error('Data unavailable at the moment. Please try again later');
    }

    const data = await response.json();
    res.json(data.articles);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

5. Create a `public` folder in your project directory and move your HTML, CSS, and JavaScript files into it.

6. Update the `script.js` file to make API requests to your backend:

```javascript
const container = document.querySelector('.container');
const optionsContainer = document.querySelector('.options-container');
const options = ['general', 'entertainment', 'health', 'science', 'sports', 'technology'];

const generateUI = (articles) => {
  container.innerHTML = '';
  for (let item of articles) {
    let card = document.createElement('div');
    card.classList.add('news-card');
    card.innerHTML = `<div class="news-image-container">
      <img src="${item.urlToImage || './newspaper.jpg'}" alt="" />
    </div>
    <div class="news-content">
      <div class="news-title">
        ${item.title}
      </div>
      <div class="news-description">
        ${item.description || item.content || ''}
      </div>
      <a href="${item.url}" target="_blank" class="view-button">Read More..</a>
    </div>`;
    container.appendChild(card);
  }
};

const getNews = async (category) => {
  try {
    let response = await fetch(`/news?category=${category}`);
    if (!response.ok) {
      alert('Data unavailable at the moment. Please try again later');
      return false;
    }
    let data = await response.json();
    generateUI(data);
  } catch (error) {
    console.error(error.message);
  }
};

const selectCategory = (e, category) => {
  let options = document.querySelectorAll('.option');
  options.forEach((element) => {
    element.classList.remove('active');
  });
  e.target.classList.add('active');
  localStorage.setItem('selectedCategory', category);
  getNews(category);
};

const createOptions = () => {
  for (let i of options) {
    optionsContainer.innerHTML += `<button class="option ${
      i == 'general' ? 'active' : ''
    }" onclick="selectCategory(event,'${i}')">${i}</button>`;
  }
};

const init = () => {
  optionsContainer.innerHTML = '';
  let selectedCategory = localStorage.getItem('selectedCategory') || 'general';
  getNews(selectedCategory);
  createOptions();
};

const refreshNews = () => {
  let selectedCategory = localStorage.getItem('selectedCategory') || 'general';
  getNews(selectedCategory);
};

window.onload = () => {
  init();
};
```

7. Update your `index.html` file to fix the script source paths:

```html
<!-- Update the script sources -->
<script src="api-key.js"></script>
<script src="/script.js"></script>
```

8. Start your server by running:

```bash
node server.js
```

Visit http://localhost:3000 in your browser to see the news site with the added backend. This example assumes that your HTML, CSS, and JavaScript files are in the `public` folder. Adjust the file paths accordingly based on your project structure.
