// 다크모드 기능 구현
(function() {
    // localStorage에서 다크모드 설정 불러오기
    const savedTheme = localStorage.getItem('darkMode');
    const isDarkMode = savedTheme === 'true';
    
    // 페이지 로드 시 저장된 테마 적용
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    // 다크모드 토글 버튼
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // 다크모드 전환 함수
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        
        // localStorage에 설정 저장
        localStorage.setItem('darkMode', isDark);
    }
    
    // 버튼 클릭 이벤트
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', toggleDarkMode);
    }
})();

