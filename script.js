const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-icon');
const searchContainer = document.querySelector('.search-container');
const loadingContainer = document.querySelector('.loading-container');
const cardsContainer = document.querySelector('.cards-container');
const noResultsContainer = document.querySelector('.no-results');

// 카드 목록 (임시 데이터)
const cards = [
  { name: 'AA', key: '1', content: '내용이 얼마나 길어질수있을지 테스트내용이 얼마나 길어질수있을지 테스트내용이 얼마나 길어질수있을지 테스트내용이 얼마나 길어질수있을지 테스트내용이 얼마나 길어질수있을지 테스트내용이 얼마나 길어질수있을지 테스트내용이 얼마나 길어질수있을지 테스트' },
  { name: 'BB', key: '2', content: '내용 BB' },
  { name: 'CC', key: '3', content: '내용 CC' },
  { name: 'A', key: '4', content: '내용 A' },
  { name: 'B', key: '5', content: '내용 B' },
  { name: 'C', key: '6', content: '내용 C' }
];

// 홈 버튼 추가
const homeButton = document.createElement('button');
homeButton.textContent = "홈으로 가기";
homeButton.classList.add('home-button');
homeButton.onclick = () => window.location.reload(); // 새로고침으로 홈으로 돌아가기
document.body.appendChild(homeButton);

// 카드 생성 함수
function createCard(cardName) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `<div class="card-text">To. ${cardName}</div>`;

  // 카드 클릭 이벤트
  card.addEventListener('click', () => {
    const userInput = prompt(`"${cardName}" 카드 인증키를 입력하세요:`);
    const cardData = cards.find(c => c.name === cardName);
    if (userInput === cardData.key) {
      // 인증키가 맞으면 로딩화면 표시하고 메시지 불러오기
      hideCardsAndShowLoading(); // 카드들을 서서히 숨기고 로딩 화면 보이기
      setTimeout(() => {
        displayCardContent(cardData); // 카드 내용 표시
      }, 2000); // 2초 후에 카드 내용 표시
    } else {
      alert("잘못된 인증키!");
    }
  });

  return card;
}

// 카드 내용 출력 함수
function displayCardContent(card) {
  // 카드 내용 표시
  const cardDisplay = document.createElement('div');
  cardDisplay.classList.add('card-display');

  const title = document.createElement('h1');
  title.textContent = `To. ${card.name}`;
  title.classList.add('card-title');

  const content = document.createElement('p');
  content.textContent = card.content;
  content.classList.add('card-content');

  cardDisplay.appendChild(title);
  cardDisplay.appendChild(content);
  cardsContainer.innerHTML = ''; // 기존 카드들 제거
  cardsContainer.appendChild(cardDisplay);

  // 카드 내용이 서서히 나타나도록 설정
  cardDisplay.style.transition = 'opacity 1s ease';
  cardDisplay.style.opacity = '0';  // 처음에는 투명하게 시작
  setTimeout(() => {
    cardDisplay.style.opacity = '1'; // 1초 뒤에 서서히 나타나게 설정
  }, 100);
}

// 로딩 화면 표시 및 카드 서서히 숨기기
function hideCardsAndShowLoading() {
  // 카드들 서서히 숨기기
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.transition = 'opacity 1s ease';
    card.style.opacity = '0';
  });

  // 로딩 화면 표시
  loadingContainer.classList.add('active');
  
  // 로딩 화면을 서서히 사라지게 하기
  setTimeout(() => {
    loadingContainer.classList.remove('active'); // 2초 후 로딩 화면 사라짐
  }, 2000);
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

// F12 키와 Win+Shift+I 단축키 차단
document.addEventListener('keydown', function(event) {
    // F12 키 차단
    if (event.key === "F12" || (event.ctrlKey && event.shiftKey && event.key === "I")) {
        event.preventDefault(); // 기본 동작(개발자 도구 열기) 방지
    }
});

// 마우스 오른쪽 클릭 차단
document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // 오른쪽 클릭 방지
});
