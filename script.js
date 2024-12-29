const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-icon');
const searchContainer = document.querySelector('.search-container');
const loadingContainer = document.querySelector('.loading-container');

// 검색 실행 함수
function executeSearch() {
  if (searchInput.value.trim() !== "") {
    // 현재 화면에 있는 검색창과 텍스트를 서서히 사라지게 처리
    searchContainer.classList.add('hidden');
    setTimeout(() => {
      searchContainer.style.display = 'none'; // 완전히 숨김
      loadingContainer.classList.add('active'); // 로딩 화면 표시
    }, 500); // 사라지는 애니메이션 시간을 고려
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
