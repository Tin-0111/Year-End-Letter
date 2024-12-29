document.querySelector('.search-icon').addEventListener('click', () => {
  const searchInput = document.querySelector('.search-box input');
  if (searchInput.value.trim() !== "") {
    alert(`'${searchInput.value}'을(를) 검색합니다.`);
  } else {
    alert("검색어를 입력해주세요.");
  }
});
