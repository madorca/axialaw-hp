# PRD: 법무법인엑시아 홈페이지

## 1. 프로젝트 개요

| 항목 | 내용 |
|------|------|
| **프로젝트명** | 법무법인엑시아 홈페이지 (axialaw-hp) |
| **목적** | 법무법인엑시아의 공식 홈페이지. 조세·형사·민사 분쟁 전문 로펌의 신뢰감과 전문성을 전달 |
| **테마** | Premium (라이트 모드, 네이비 + 골드 컬러) |
| **프레임워크** | React 19 + Vite 8 + Tailwind CSS v4 |
| **배포** | 정적 빌드 (`dist/`) 또는 Vite dev 서버 |

---

## 2. 기술 스택

```
React 19.2       — UI 프레임워크
Vite 8.0         — 빌드 도구 & 개발 서버
Tailwind CSS 4   — 유틸리티 CSS (Vite 플러그인)
```

### 2.1 개발 서버 실행
```bash
npm install
npm run dev       # → http://localhost:3000
```

### 2.2 프로덕션 빌드
```bash
npm run build     # → dist/ 디렉터리 생성
npm run preview   # → 빌드 결과 미리보기
```

---

## 3. 디렉터리 구조

```
axialaw-hp/
├── index.html                    # HTML 엔트리 (SEO 메타 포함)
├── package.json                  # 의존성 & 스크립트
├── vite.config.js                # Vite + React + Tailwind 설정
│
├── public/                       # 정적 에셋 (favicon 등)
│
├── src/
│   ├── main.jsx                  # React 엔트리포인트
│   ├── App.jsx                   # 루트 컴포넌트 (섹션 조합)
│   ├── index.css                 # Tailwind CSS 진입점
│   │
│   ├── data/
│   │   └── content.js            # ★ CMS 컨텐츠 데이터 (문자열/이미지)
│   │
│   ├── styles/
│   │   └── theme.js              # ★ 디자인 토큰 (Premium 테마)
│   │
│   └── components/
│       ├── SectionTitle.jsx      # 공통 섹션 제목
│       ├── ImageCard.jsx         # 공통 이미지 카드
│       ├── Header.jsx            # 상단 네비게이션
│       ├── Hero.jsx              # 메인 히어로 섹션
│       ├── About.jsx             # 로펌소개 섹션
│       ├── Lawyers.jsx           # 구성원(대표변호사) 섹션
│       ├── Strength.jsx          # 레미넌트의 기준 섹션
│       ├── Practice.jsx          # 업무분야 섹션
│       ├── Cases.jsx             # 주요사례 섹션
│       ├── Consult.jsx           # 상담문의 섹션
│       └── Footer.jsx            # 푸터
│
├── docs/
│   ├── PRD.md                    # 이 문서
│   └── design.md                 # 디자인 시스템 문서
│
└── dist/                         # (빌드 결과물)
```

---

## 4. 페이지 구성 (섹션별)

### 4.1 Header
- Sticky 네비게이션 바
- 브랜드 로고 (AXIA / 법무법인엑시아)
- 네비게이션 링크: 로펌소개, 구성원, 업무분야, 주요사례, 상담문의
- CTA 버튼: "상담 예약"

### 4.2 Hero Section
- 아이브로우 태그: "TAX · CRIMINAL · CIVIL"
- 메인 카피: "분쟁 해결의 / 기준이 되는 로펌"
- 서브 카피 2줄
- CTA 버튼 2개 (상담 문의하기 / 대표변호사 보기)
- 이미지 카드 (오버레이 텍스트 포함)

### 4.3 About Section (로펌소개)
- 섹션 타이틀 + 이미지 + 텍스트 카드
- 3개의 핵심 메시지 단락

### 4.4 Lawyers Section (구성원)
- 대표변호사 2인 프로필 카드
- 각 변호사: 이름, 직책, 전문분야, 소개문, 전문분야 태그

### 4.5 Strength Section (레미넌트의 기준)
- 3개의 핵심 가치 카드
- 번호, 제목, 설명문

### 4.6 Practice Section (업무분야)
- 3개 분야: 조세, 형사, 민사
- 각 분야: 담당 변호사, 설명문, 세부항목 리스트

### 4.7 Cases Section (주요사례)
- 4개 주요 수행 영역 리스트
- 이미지 썸네일 포함

### 4.8 Consult Section (상담문의)
- 상담 안내 텍스트 + 접수 절차 안내
- 상담 요청 폼 (이름, 연락처, 이메일, 사건분야, 사건개요)
- 개인정보 동의 체크박스
- 제출 버튼

### 4.9 Footer
- 브랜드 정보, 대표변호사 목록, 연락처 정보
- 저작권 표시

---

## 5. CMS 컨텐츠 구조

### 5.1 설계 원칙
**모든 문자열과 이미지 URL은 `src/data/content.js` 에 분리되어 있습니다.**

컴포넌트는 이 데이터 파일을 import하여 렌더링하므로:
- 운영툴(CMS/관리자 페이지)에서 `content.js`의 값만 변경하면 사이트 컨텐츠 수정 가능
- 향후 REST API / CMS 연동 시 `content.js`의 export를 API 호출로 대체

### 5.2 데이터 섹션 목록

| Export 이름 | 용도 | 수정 가능 항목 |
|------------|------|---------------|
| `siteInfo` | 사이트 기본정보 | 브랜드명, 대표 설명, SEO 정보 |
| `navigation` | 헤더 네비게이션 | 메뉴 라벨, 링크 URL |
| `headerCta` | 헤더 CTA 버튼 | 버튼 텍스트, 링크 |
| `hero` | 히어로 섹션 | 타이틀, 서브카피, CTA, 이미지 URL |
| `about` | 로펌소개 | 제목, 설명문, 이미지 URL |
| `lawyersSection` | 구성원 섹션 헤더 | 섹션 제목, 설명 |
| `lawyers` | 변호사 프로필 | 이름, 직책, 전문분야, 사진 URL |
| `strengthSection` | 레미넌트의 기준 헤더 | 섹션 제목 |
| `strengths` | 핵심 가치 카드 | 번호, 제목, 본문 |
| `practiceSection` | 업무분야 헤더 | 섹션 제목, 설명 |
| `practices` | 업무분야 상세 | 분야명, 담당변호사, 설명, 항목, 이미지 |
| `caseSection` | 주요사례 헤더 | 섹션 제목, 설명 |
| `cases` | 주요 수행 영역 | 사례 제목, 이미지 URL |
| `consultSection` | 상담문의 | 제목, 설명, 절차, 폼 라벨/플레이스홀더 |
| `footer` | 푸터 | 브랜드, 변호사, 주소, 전화, 이메일 |

---

## 6. 컴포넌트 아키텍처

### 6.1 공통 컴포넌트
- **SectionTitle**: 아이브로우 + 제목(멀티라인) + 본문(옵션)
- **ImageCard**: 이미지 + 오버레이 + 자식 컨텐츠

### 6.2 섹션 컴포넌트
각 섹션 컴포넌트는:
1. `data/content.js`에서 해당 컨텐츠를 import
2. `styles/theme.js`에서 디자인 토큰을 import
3. 공통 컴포넌트를 조합하여 렌더링

### 6.3 의존성 흐름
```
data/content.js ──→ components/*.jsx ──→ App.jsx
styles/theme.js ──→ components/*.jsx ──→ App.jsx
```

---

## 7. 향후 확장 계획

### 7.1 CMS 연동
```
현재: content.js (정적 데이터)
향후: API Gateway → CMS DB → content fetcher hook
```

### 7.2 운영툴(Admin Panel) 구조
```
/admin
├── /content     — 문자열/이미지 편집
├── /lawyers     — 변호사 프로필 관리
├── /cases       — 사례 관리
└── /settings    — SEO, 연락처 등
```

### 7.3 SEO 강화
- SSR 또는 SSG 전환 (Next.js or Astro)
- 구조화된 데이터 (JSON-LD) 추가
- 사이트맵 자동 생성

---

## 8. 비기능 요구사항

| 항목 | 요구사항 |
|------|---------|
| 반응형 | 모바일 ~ 데스크톱 풀서포트 (Tailwind breakpoints) |
| 성능 | 빌드 크기 < 100KB gzip (현재 ~72KB) |
| SEO | 메타태그, 시맨틱 HTML, 단일 h1 |
| 접근성 | alt 텍스트, label, 시맨틱 마크업 |
| 브라우저 | Chrome, Safari, Firefox, Edge 최신 2버전 |
