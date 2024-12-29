const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-icon');
const searchContainer = document.querySelector('.search-container');
const loadingContainer = document.querySelector('.loading-container');
const cardsContainer = document.querySelector('.cards-container');
const noResultsContainer = document.querySelector('.no-results');

// 카드 목록 (임시 데이터)
const cards = [
  { name: 'AA' },
  { name: 'BB' },
  { name: 'CC' },
  { name: 'A' },
  { name: 'B' },
  { name: 'C' }
];

// 카드 생성 함수
function createCard(cardName) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `<div class="card-text">To. ${cardName}</div>`;
  return card;
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
