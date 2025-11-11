// 폰트 크기 조절 기능
(function() {
    const STORAGE_KEY = 'fontSize';
    const FONT_SIZES = {
        small: 'font-small',
        normal: '',
        large: 'font-large',
        xlarge: 'font-xlarge'
    };
    
    const FONT_ORDER = ['small', 'normal', 'large', 'xlarge'];
    
    let currentFontIndex = 1; // 기본값: normal (index 1)
    
    // DOM 요소
    const fontDecrease = document.getElementById('fontDecrease');
    const fontReset = document.getElementById('fontReset');
    const fontIncrease = document.getElementById('fontIncrease');
    const body = document.body;
    
    // localStorage에서 폰트 크기 설정 불러오기
    function loadFontSize() {
        const savedFontSize = localStorage.getItem(STORAGE_KEY);
        if (savedFontSize) {
            const index = FONT_ORDER.indexOf(savedFontSize);
            if (index !== -1) {
                currentFontIndex = index;
                applyFontSize(savedFontSize);
            }
        }
    }
    
    // 폰트 크기 적용
    function applyFontSize(size) {
        // 기존 폰트 크기 클래스 제거
        Object.values(FONT_SIZES).forEach(className => {
            if (className) {
                body.classList.remove(className);
            }
        });
        
        // 새 폰트 크기 클래스 추가
        if (FONT_SIZES[size]) {
            body.classList.add(FONT_SIZES[size]);
        }
        
        // localStorage에 저장
        localStorage.setItem(STORAGE_KEY, size);
    }
    
    // 폰트 크기 감소
    function decreaseFont() {
        if (currentFontIndex > 0) {
            currentFontIndex--;
            const size = FONT_ORDER[currentFontIndex];
            applyFontSize(size);
        }
    }
    
    // 폰트 크기 초기화
    function resetFont() {
        currentFontIndex = 1; // normal
        applyFontSize('normal');
    }
    
    // 폰트 크기 증가
    function increaseFont() {
        if (currentFontIndex < FONT_ORDER.length - 1) {
            currentFontIndex++;
            const size = FONT_ORDER[currentFontIndex];
            applyFontSize(size);
        }
    }
    
    // 이벤트 리스너 등록
    if (fontDecrease) {
        fontDecrease.addEventListener('click', decreaseFont);
    }
    
    if (fontReset) {
        fontReset.addEventListener('click', resetFont);
    }
    
    if (fontIncrease) {
        fontIncrease.addEventListener('click', increaseFont);
    }
    
    // 페이지 로드 시 저장된 폰트 크기 적용
    loadFontSize();
})();

