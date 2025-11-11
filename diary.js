// 일기 저장 및 관리 기능
(function() {
    const STORAGE_KEY = 'diaryEntries';
    let currentDiaryId = null;

    // DOM 요소
    const diaryForm = document.getElementById('diaryForm');
    const diaryList = document.getElementById('diaryList');
    const writeSection = document.getElementById('write-section');
    const listSection = document.getElementById('list-section');
    const diaryModal = document.getElementById('diaryModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDate = document.getElementById('modalDate');
    const modalContent = document.getElementById('modalContent');
    const closeModal = document.querySelector('.close');
    const deleteBtn = document.getElementById('deleteDiary');

    // localStorage에서 일기 목록 불러오기
    function getDiaries() {
        const diaries = localStorage.getItem(STORAGE_KEY);
        return diaries ? JSON.parse(diaries) : [];
    }

    // localStorage에 일기 목록 저장하기
    function saveDiaries(diaries) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(diaries));
    }

    // 날짜 포맷팅
    function formatDate(dateString) {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}년 ${month}월 ${day}일`;
    }

    // 일기 목록 렌더링
    function renderDiaryList() {
        const diaries = getDiaries();
        diaryList.innerHTML = '';

        if (diaries.length === 0) {
            diaryList.innerHTML = '<div class="empty-message">저장된 일기가 없습니다.</div>';
            return;
        }

        // 날짜순으로 정렬 (최신순)
        diaries.sort((a, b) => new Date(b.date) - new Date(a.date));

        diaries.forEach(diary => {
            const diaryItem = document.createElement('div');
            diaryItem.className = 'diary-item';
            diaryItem.setAttribute('data-id', diary.id);
            
            const preview = diary.content.length > 100 
                ? diary.content.substring(0, 100) + '...' 
                : diary.content;

            diaryItem.innerHTML = `
                <div class="diary-item-title">${diary.title}</div>
                <div class="diary-item-date">${formatDate(diary.date)}</div>
                <div class="diary-item-preview">${preview}</div>
            `;

            diaryItem.addEventListener('click', () => showDiaryDetail(diary.id));
            diaryList.appendChild(diaryItem);
        });
    }

    // 일기 상세 보기
    function showDiaryDetail(id) {
        const diaries = getDiaries();
        const diary = diaries.find(d => d.id === id);
        
        if (!diary) return;

        currentDiaryId = id;
        modalTitle.textContent = diary.title;
        modalDate.textContent = formatDate(diary.date);
        modalContent.textContent = diary.content;
        diaryModal.style.display = 'flex';
    }

    // 모달 닫기
    function closeDiaryModal() {
        diaryModal.style.display = 'none';
        currentDiaryId = null;
    }

    // 일기 삭제
    function deleteDiary() {
        if (!currentDiaryId) return;

        if (confirm('정말 이 일기를 삭제하시겠습니까?')) {
            const diaries = getDiaries();
            const filteredDiaries = diaries.filter(d => d.id !== currentDiaryId);
            saveDiaries(filteredDiaries);
            renderDiaryList();
            closeDiaryModal();
        }
    }

    // 폼 제출 처리
    function handleFormSubmit(e) {
        e.preventDefault();

        const date = document.getElementById('date').value;
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        if (!date || !title || !content) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const diaries = getDiaries();
        const newDiary = {
            id: Date.now().toString(),
            date: date,
            title: title,
            content: content,
            createdAt: new Date().toISOString()
        };

        diaries.push(newDiary);
        saveDiaries(diaries);

        // 폼 초기화
        diaryForm.reset();
        
        // 목록 새로고침
        renderDiaryList();
        
        alert('일기가 저장되었습니다!');
    }

    // 내비게이션 메뉴 클릭 처리
    function handleNavigation() {
        const navLinks = document.querySelectorAll('nav a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');
                
                if (href === '#home' || href === '#write') {
                    writeSection.style.display = 'block';
                    listSection.style.display = 'none';
                } else if (href === '#list') {
                    writeSection.style.display = 'none';
                    listSection.style.display = 'block';
                    renderDiaryList();
                }
            });
        });
    }

    // 이벤트 리스너 등록
    if (diaryForm) {
        diaryForm.addEventListener('submit', handleFormSubmit);
    }

    if (closeModal) {
        closeModal.addEventListener('click', closeDiaryModal);
    }

    if (deleteBtn) {
        deleteBtn.addEventListener('click', deleteDiary);
    }

    // 모달 배경 클릭 시 닫기
    if (diaryModal) {
        diaryModal.addEventListener('click', (e) => {
            if (e.target === diaryModal) {
                closeDiaryModal();
            }
        });
    }

    // ESC 키로 모달 닫기
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && diaryModal.style.display === 'flex') {
            closeDiaryModal();
        }
    });

    // 내비게이션 초기화
    handleNavigation();

    // 페이지 로드 시 일기 목록 렌더링 (목록 섹션이 보일 때)
    if (listSection.style.display !== 'none') {
        renderDiaryList();
    }
})();

