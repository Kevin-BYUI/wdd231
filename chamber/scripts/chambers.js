// DOM Elements
const hamBtn = document.querySelector("#ham-btn");
const crossBtn = document.querySelector("#cross-btn");
const navList = document.querySelector("nav");
const businessCards = document.querySelector("#business-cards");
const errorHandling = document.querySelector("#error-handling");
const gridView = document.querySelector("#grid-view");
const listView = document.querySelector("#list-view");
const modificationDate = document.querySelector("#modification-date");
const copyright = document.querySelector("#copyright");

// URLs & Dates
const url = "./data/members.json";
const date = new Date();

copyright.textContent = date.getFullYear();
modificationDate.textContent = `Modified on: ${date.toLocaleString()}`;

// Hamburger / Cross Toggle
const toggleNav = () => {
  hamBtn.classList.toggle("hidden");
  crossBtn.classList.toggle("hidden");
  navList.classList.toggle("open");
};

hamBtn.addEventListener("click", toggleNav);
crossBtn.addEventListener("click", toggleNav);

// Fetch & Render Business Cards
const fetchApi = async () => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP Error ${response.status}`);

    const data = await response.json();
    renderBusinessCards(data);
  } catch (error) {
    errorHandling.textContent = error.message;
  }
};

const renderBusinessCards = (cards) => {
  const fragment = document.createDocumentFragment();

  cards.forEach((card) => {
    const cardContainer = document.createElement("article");
    cardContainer.classList.add("card-container");

    const cardImage = document.createElement("img");
    cardImage.src = card.imageFile;
    cardImage.alt = card.companyName;
    cardImage.width = 300; // or the actual intended size
    cardImage.height = 200;
    cardImage.loading = "lazy";

    const cardName = document.createElement("h3");
    cardName.classList.add("card-name");
    cardName.textContent = card.companyName;

    const cardAddress = document.createElement("p");
    cardAddress.textContent = card.companyAddress;

    const cardPhone = document.createElement("p");
    cardPhone.classList.add("card-phone");
    cardPhone.textContent = card.companyPhone;

    const cardWebsite = document.createElement("a");
    cardWebsite.classList.add("card-website");
    cardWebsite.href = card.companyWebsite;
    cardWebsite.textContent = card.companyWebsite;

    const cardMail = document.createElement("p");
    cardMail.classList.add("card-mail");
    cardMail.textContent = card.email;

    cardContainer.append(
      cardImage,
      cardName,
      cardAddress,
      cardPhone,
      cardWebsite,
      cardMail
    );

    fragment.appendChild(cardContainer);
  });

  businessCards.append(fragment);
};

// List / Grid View Toggle
listView.addEventListener("click", () =>
  businessCards.classList.add("list-view")
);
gridView.addEventListener("click", () =>
  businessCards.classList.remove("list-view")
);

// Initial API Fetch
fetchApi();
