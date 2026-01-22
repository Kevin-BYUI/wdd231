const hamBtn = document.querySelector("#ham-btn");
const crossBtn = document.querySelector("#cross-btn");
const navList = document.querySelector("nav");
const modificationDate = document.querySelector("#modification-date");
const copyright = document.querySelector("#copyright");
const errorHandling = document.querySelector("#error-handling");

const weatherIcon = document.querySelector("#weather-icon");
const temperature = document.querySelector("#temp");
const weatherDesc = document.querySelector("#description");
const highTemp = document.querySelector("#high-temp");
const lowTemp = document.querySelector("#low-temp");
const humidity = document.querySelector("#humidity");
const sunRise = document.querySelector("#sunrise");
const sunSet = document.querySelector("#sunset");

const today = document.querySelector("#today");
const friday = document.querySelector("#friday");
const saturday = document.querySelector("#saturday");

const membersContainer = document.querySelector("#membersContainer");

// URLs & Dates
const url = "./data/members.json";
const apiKey = "48a64c166bb4d476dc16013f509c2b28";
const weatherApi = `https://api.openweathermap.org/data/2.5/forecast?lat=-4.082&lon=39.6449&appid=${apiKey}&units=metric`;
const date = new Date();

copyright.textContent = date.getFullYear();
modificationDate.textContent = `Modified on: ${date.toLocaleString()}`;

const toggleNav = () => {
  hamBtn.classList.toggle("hidden");
  crossBtn.classList.toggle("hidden");
  navList.classList.toggle("open");
};

hamBtn.addEventListener("click", toggleNav);
crossBtn.addEventListener("click", toggleNav);

const fetchWeatherApi = async () => {
  try {
    const response = await fetch(weatherApi);
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const data = await response.json();
    displayeWeather(data);
    showForecast(threeDayForecast(data));
  } catch (error) {
    errorHandling.textContent = error.message;
  }
};

const fetchMembersApi = async () => {
  const membersResponse = await fetch(url);
  if (!membersResponse.ok) {
    throw new Error(`Request failed ${membersResponse.status}`);
  }
  const membersData = await membersResponse.json();
  showMembers(membersData);
};

const threeDayForecast = (forecast) =>
  forecast.list
    .filter((item) => item.dt_txt.includes("12:00:00"))
    .slice(0, 3);

const showForecast = (content) => {
  today.textContent = `${content[0].main.temp}°C`;
  friday.textContent = `${content[1].main.temp}°C`;
  saturday.textContent = `${content[2].main.temp}°C`;
};

const showMembers = (members) => {
  const fragment = document.createDocumentFragment();

  const eligibleMembers = members.filter(
    (member) => member.membershipLevel >= 2,
  );

  const selectedMembers = [];

  for (let i = 0; i < 3 && eligibleMembers.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * eligibleMembers.length);
    selectedMembers.push(eligibleMembers[randomIndex]);
    eligibleMembers.splice(randomIndex, 1);
  }

  selectedMembers.forEach((data) => {
    const dataContainer = document.createElement("article");
    dataContainer.classList.add("data-container");

    const memberName = document.createElement("h2");
    memberName.textContent = data.companyName;

    const memberTagline = document.createElement("p");
    memberTagline.textContent = data.tagLine;

    const memberImage = document.createElement("img");
    memberImage.src = data.imageFile;
    memberImage.alt = data.companyName;
    memberImage.loading = "lazy";

    const memberEmail = document.createElement("p");
    memberEmail.textContent = `EMAIL: ${data.email}`;

    const memberPhone = document.createElement("p");
    memberPhone.textContent = `PHONE: ${data.companyPhone}`;

    const memberUrl = document.createElement("p");
    memberUrl.textContent = `URL: ${data.companyWebsite}`;

    dataContainer.append(
      memberName,
      memberTagline,
      memberImage,
      memberEmail,
      memberPhone,
      memberUrl,
    );

    fragment.appendChild(dataContainer);
  });

  membersContainer.innerHTML = "";
  membersContainer.appendChild(fragment);
};

const displayeWeather = (content) => {
  const current = content.list[0];

  weatherIcon.src = `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;
  weatherIcon.alt = current.weather[0].description;

  temperature.textContent = `${current.main.temp}°C`;
  weatherDesc.textContent = current.weather[0].description;
  highTemp.textContent = `${current.main.temp_max}°C`;
  lowTemp.textContent = `${current.main.temp_min}°C`;
  humidity.textContent = `${current.main.humidity}%`;

  sunRise.textContent = formatTime(content.city.sunrise);
  sunSet.textContent = formatTime(content.city.sunset);
};

const formatTime = (unixSeconds) =>
  new Date(unixSeconds * 1000).toLocaleTimeString();

fetchMembersApi();
fetchWeatherApi();
