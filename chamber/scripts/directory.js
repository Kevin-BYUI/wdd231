const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

membersContainer.classList.add("list");
membersContainer.classList.remove("grid");

async function fetchMembers() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Failed to fetch members");

    const members = await response.json();
    displayMembers(members);
  } catch (error) {
    console.error("Error loading members:", error);
    membersContainer.innerHTML = "<p>Failed to load members.</p>";
  }
}

function displayMembers(members) {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");

    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo" loading="lazy" />
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p class="level">Level: ${["Member", "Silver", "Gold"][member.membership - 1]}</p>
    `;

    membersContainer.appendChild(card);
  });
}

// Toggle views
gridBtn.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");
});

listBtn.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");
});

// Run fetch
fetchMembers();