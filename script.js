// 카드 데이터
const cardsData = [
  { title: "AA", key: "1", content: "ㄱ" },
  { title: "BB", key: "2", content: "ㄴ" },
  { title: "CC", key: "3", content: "ㄷ" },
  { title: "A", key: "4", content: "ㄹ" },
  { title: "B", key: "5", content: "ㅁ" },
  { title: "C", key: "6", content: "ㅂ" },
];

// DOM 요소
const searchInput = document.querySelector(".search-box input");
const searchButton = document.querySelector(".search-icon");
const cardsContainer = document.querySelector(".cards-container");
const loadingContainer = document.querySelector(".loading-container");
const noResultsContainer = document.querySelector(".no-results");
const body = document.body;

// 홈 버튼 추가
const homeButton = document.createElement("button");
homeButton.textContent = "홈으로 가기";
homeButton.classList.add("home-button");
homeButton.onclick = () => window.location.reload();
body.appendChild(homeButton);

// 카드 클릭 이벤트
function showKeyInput(card) {
  const key = prompt(`Enter the authentication key for "${card.title}"`);
  if (key === card.key) {
    displayCardContent(card);
  } else {
    alert("잘못된 인증키!");
  }
}

// 카드 내용 출력
function displayCardContent(card) {
  // 화면 초기화
  cardsContainer.innerHTML = "";
  noResultsContainer.classList.remove("active");
  loadingContainer.classList.remove("active");

  // 카드 내용 표시
  const cardDisplay = document.createElement("div");
  cardDisplay.classList.add("card-display");

  const title = document.createElement("h1");
  title.textContent = `To. ${card.title}`;
  title.classList.add("card-title");

  const content = document.createElement("p");
  content.textContent = card.content;
  content.classList.add("card-content");

  cardDisplay.appendChild(title);
  cardDisplay.appendChild(content);
  body.appendChild(cardDisplay);
}

// 카드 렌더링
function renderCards(cards) {
  cardsContainer.innerHTML = ""; // 초기화
  if (cards.length === 0) {
    noResultsContainer.classList.add("active");
  } else {
    cards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.textContent = `To. ${card.title}`;
      cardElement.onclick = () => showKeyInput(card);
      cardsContainer.appendChild(cardElement);
    });
  }
}

// 검색 이벤트
function searchCards(query) {
  return cardsData.filter((card) =>
    card.title.toLowerCase().includes(query.toLowerCase())
  );
}

// 검색 버튼 클릭 이벤트
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return;

  loadingContainer.classList.add("active");
  noResultsContainer.classList.remove("active");
  cardsContainer.innerHTML = "";

  setTimeout(() => {
    loadingContainer.classList.remove("active");
    const results = searchCards(query);
    renderCards(results);
  }, 2000);
});
