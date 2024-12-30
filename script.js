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

// 검색 실행 함수
function executeSearch() {
  if (searchInput.value.trim() !== "") {
    // 검색창과 텍스트 서서히 사라지게 처리
    searchContainer.style.transition = 'opacity 0.5s ease';
    searchContainer.style.opacity = '0'; // 화면에서 서서히 사라지도록 설정
    
    setTimeout(() => {
      searchContainer.style.display = 'none'; // 완전히 숨기기
      loadingContainer.classList.add('active'); // 로딩 화면 활성화
    }, 500); // 500ms 후 로딩 화면이 나타나도록 설정

    // 2초 후에 검색된 카드들을 필터링하고 출력
    setTimeout(() => {
      loadingContainer.classList.remove('active'); // 로딩 화면 비활성화

      // 카드 필터링
      const searchTerm = searchInput.value.toLowerCase();
      const filteredCards = cards.filter(card =>
        card.name.toLowerCase().includes(searchTerm)
      );

      // 기존 카드들 삭제
      cardsContainer.innerHTML = '';

      if (filteredCards.length > 0) {
        // 카드가 있으면 출력
        filteredCards.forEach(card => {
          const cardElement = createCard(card.name);
          cardsContainer.appendChild(cardElement);
        });
        cardsContainer.classList.remove('hidden');
        noResultsContainer.classList.remove('active');
      } else {
        // 카드가 없으면 "결과 없음" 출력
        noResultsContainer.classList.add('active');
        cardsContainer.classList.add('hidden');
      }
    }, 2000); // 2초 뒤에 결과 보여주기
  } else {
    alert("검색어를 입력해주세요.");
  }
}

// 버튼 클릭으로 검색 실행
searchButton.addEventListener('click', executeSearch);

// 엔터 키로 검색 실행
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    executeSearch();
  }
});
