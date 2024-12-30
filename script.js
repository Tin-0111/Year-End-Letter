const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-icon');
const searchContainer = document.querySelector('.search-container');
const loadingContainer = document.querySelector('.loading-container');
const cardsContainer = document.querySelector('.cards-container');
const noResultsContainer = document.querySelector('.no-results');

// 카드 목록 (임시 데이터)
const cards = [
  { name: 'AA', key: '1', content: '안녕 서연아!  음음 내가 편지란걸 원래 적는 사람은 아닌데 고3이 코앞으로 오니 미쳤다고나 할까... 처음 의도는 생기부에 적을 웹사이트를 하나 만드는거 였는데 어쩌다 보니 그냥 친했던 친구들에게 편지를 주고 싶어서 이렇게된거 같네 ㅋㅋㅋ. 이 사이트를 만드는데 무려 1주일에 가까운 시간이 들어갔었다?! 최근에 내가 잠을 못자게 만든 범인이지 ㅇㅇ... 24년이 끝나고 이제 25년이야! 난 너랑 다르게 24년이 별로 행복하지는 않았다? 딱히 좋은일도 없었고 재밌는일도 없었거든.... 수시를 완전히 그만두는 불행한 일만 있었달까? 하지만 누구 덕분에 연말에 기분이 아주 좋았던거 있지~ 우리가 처음만난지도 벌써 1년이 지났어. 이제 와서 하는 이야기인데 그때 겨울방학 윈터스쿨때 나 지원쌤이랑 너 이야기 한적있었어 ㅋㅎㅋㅋ 아무도 없는 곳에서 자고 싶은데 자꾸 뒤에 누구 있어서 신경쓰인다고 뭐하는 놈이냐고 막 그랬었어 ㅋㅋㅋㅋㅋ 어쩌면 그 윈터스쿨이 우리가 만나는 마지막이었을수도 있는데, 수학에서도 만났고 과학에서도 만났고... 계속 만나다가보니 내가 널 좋아하게 된거 아닐까 싶네┐(ﾟ～ﾟ)┌ \n\n 음! 넌 하나의 편지로 보이겠지만 적고 있는 내 입장에서는 위에 썼을때랑 지금이랑 날짜가 다르다. 아까도 이야기 했는데 관리형 자습실을 가게 되었거든? 진짜 너어어어어무 가기 싫다;; 방금전까지 너랑 전화하다가 집에와서 쓰고 있는건데, 너 점점 목소리 작아지면서 잠들던거 엄청 웃겼던거 알아? ㅋㅎㅋㅋㅋ 그냥 그렇다고 ㅋㅋㅋ \n\n 너꺼만 벌써 3번째 쓰고 있어! 지금은 30일 오후 3시 24분... 너 디엠 학교에서는 칼답 해준다 해놓고는 1시간이나 늦게 답장 해준건 미안해... 아니 나 자고 있었어... 너가 성적이 어떻게 나왔는지는 나야 모르겠지만... 넌 진짜 열심히 공부 하니 수시든 정시든 좋은 대학 갈거 같아... 내가 지금 망한거 같아! 내가 좋은 곳 못갈거 같으니 너가 꼭 내 몫까지 같이 가줘야해 ㅎㅎ... \n\n-2024/12/31/04:28(edited)\n-작성번호:1, 인증키: 1111\n-오류발생시 해당키를 보내주세요 : constcards:[01];line:10[js],css[none],html[none]\nevent.preventDefault()' },
  { name: 'BB', key: '2', content: '내용 BB' },
  { name: 'CC', key: '3', content: '내용 CC' },
  { name: 'A', key: '4', content: '내용 A' },
  { name: 'B', key: '5', content: '내용 B' },
  { name: 'C', key: '6', content: '내용 C' }
];

// 홈 버튼 추가
const homeButton = document.createElement('button');
homeButton.textContent = "🏠홈화면";
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


function displayCardContent(card) {
  const cardDisplay = document.createElement('div');
  cardDisplay.classList.add('card-display');

  const title = document.createElement('h1');
  title.textContent = `To. ${card.name}`;
  title.classList.add('card-title');

  const content = document.createElement('p');
  content.innerHTML = card.content.replace(/\n/g, '<br>'); // \n을 <br>로 변환
  content.classList.add('card-content');

  cardDisplay.appendChild(title);
  cardDisplay.appendChild(content);
  cardsContainer.innerHTML = ''; // 기존 카드들 제거
  cardsContainer.appendChild(cardDisplay);
}
