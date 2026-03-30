# Design System: 법무법인엑시아 (Premium Theme)

## 1. 디자인 원칙

| 원칙 | 설명 |
|------|------|
| **절제된 격조** | 과도한 장식 없이 여백과 타이포그래피로 신뢰감 전달 |
| **따뜻한 중립** | 차가운 회색 대신 따뜻한 베이지/아이보리 계열 배경 |
| **골드 액센트** | 핵심 포인트에만 골드 컬러를 절제적으로 사용 |
| **네이비 안정감** | 제목과 버튼에 네이비를 사용하여 전문성과 안정감 확보 |

---

## 2. 컬러 팔레트

### 2.1 Primary — Navy

| Token | HEX | 용도 |
|-------|-----|------|
| `navy900` | `#18263f` | 제목 텍스트, 메인 컬러 |
| `navy800` | `#1c2b45` | 버튼 배경 |
| `navy700` | `#223454` | 버튼 hover |
| `navy600` | `#314057` | 강조 본문, 칩 텍스트 |
| `navy500` | `#435065` | 중간 강조 본문 |
| `navy400` | `#516070` | CTA 보조 텍스트 |

### 2.2 Gold — Accent

| Token | HEX | 용도 |
|-------|-----|------|
| `gold600` | `#b08a4a` | 아이브로우, 라벨 액센트 |
| `gold500` | `#cbb68a` | 보조 버튼 테두리 |
| `gold400` | `#d8c19a` | 이미지 오버레이 텍스트 |

### 2.3 Neutral — Warm Gray

| Token | HEX | 용도 |
|-------|-----|------|
| `warmGray900` | `#5d6778` | 네비게이션 텍스트 |
| `warmGray800` | `#5f6979` | 본문 텍스트 |
| `warmGray700` | `#667180` | 서브 본문 |
| `warmGray600` | `#687387` | 브랜드 서브 텍스트 |
| `warmGray500` | `#6f7988` | 부가 정보 |
| `warmGray400` | `#9aa1ad` | placeholder, 풋터 텍스트 |

### 2.4 Background

| Token | HEX | 용도 |
|-------|-----|------|
| `bgPrimary` | `#f7f5f0` | 기본 페이지 배경 |
| `bgSecondary` | `#f1ede6` | 교차 섹션 배경 |
| `bgCard` | `#ffffff` | 카드 배경 |
| `bgCardAlt` | `#f9f7f2` | 대체 카드 배경 |
| `bgChip` | `#f7f3eb` | 칩/태그 배경 |
| `bgHover` | `#f2ece0` | hover 상태 배경 |
| `bgConsent` | `#faf7f2` | 동의 영역 배경 |

### 2.5 Border

| Token | HEX | 용도 |
|-------|-----|------|
| `borderPrimary` | `#ddd6cb` | 카드, 섹션 구분선 |
| `borderSecondary` | `#d9d1c4` | 헤더 하단 테두리 |
| `borderInput` | `#d7d0c5` | 입력 필드 테두리 |
| `borderChip` | `#d8d0c2` | 칩 테두리 |
| `borderConsent` | `#e3ddd3` | 동의 영역 테두리 |

---

## 3. 타이포그래피

### 3.1 시스템 폰트 스택
```css
font-family: system-ui, -apple-system, sans-serif;
```

### 3.2 텍스트 스케일

| 역할 | 크기 (모바일 → 데스크톱) | Weight | Tracking |
|------|------------------------|--------|----------|
| 히어로 제목 | 48px → 96px | 600 (semibold) | -0.04em |
| 섹션 제목 | 34px → 42px | 600 (semibold) | -0.035em |
| 카드 제목 | 24px ~ 30px | 600 (semibold) | -0.03em |
| 강조 본문 | 16px ~ 17px | 500 (medium) | -0.015em |
| 일반 본문 | 14px ~ 15px | 400 (regular) | -0.01em |
| 아이브로우 | 12px | 400 (regular) | 0.28em ~ 0.35em |
| 칩/태그 | 12px | 400 (regular) | normal |

### 3.3 행간 (Line Height)

| 텍스트 유형 | Line Height |
|------------|-------------|
| 히어로 제목 | 1.08 |
| 섹션 제목 | 1.18 |
| 카드 제목 | 1.2 (tight) |
| 강조 본문 | 2.0 (8/16) |
| 일반 본문 | 1.75 ~ 2.0 (7~8/14) |

---

## 4. 레이아웃

### 4.1 그리드
- **최대 너비**: `max-w-7xl` (80rem = 1280px)
- **좌우 패딩**: `px-6` 모바일, `lg:px-8` 데스크톱
- **섹션 패딩**: `py-24` (96px)
- **갭**: `gap-6` ~ `gap-10`

### 4.2 반응형 그리드 패턴
```
히어로:      lg:grid-cols-[1.08fr_0.92fr]
About:      lg:grid-cols-[1fr_1.1fr]
Lawyers:    lg:grid-cols-2
Strength:   lg:grid-cols-3
Practice:   lg:grid-cols-[220px_1fr_1.1fr]
Cases:      lg:grid-cols-[120px_1fr_220px]
Consult:    lg:grid-cols-[0.9fr_1.1fr]
Footer:     lg:grid-cols-[1.1fr_0.9fr_0.8fr]
```

---

## 5. 컴포넌트 스타일

### 5.1 버튼

| 타입 | 스타일 |
|------|--------|
| Primary | 네이비 배경 (`#1c2b45`), 흰색 텍스트, hover 시 `#223454` |
| Secondary (outline) | 골드 테두리 (`#cbb68a`), 네이비 텍스트, hover 시 `#f2ece0` 배경 |
| 모양 | `rounded-full`, 패딩 `px-7 py-3.5` |

### 5.2 카드

| 속성 | 값 |
|------|-----|
| 라운딩 | `rounded-[24px]` ~ `rounded-[32px]` |
| 테두리 | `border border-[#ddd6cb]` |
| 배경 | 흰색 또는 `#f9f7f2` |
| 그림자 | `shadow-[0_20px_60px_rgba(24,38,63,0.06)]` ~ `shadow-[0_25px_70px_rgba(24,38,63,0.08)]` |

### 5.3 칩/태그
```
rounded-full border border-[#d8d0c2] bg-[#f7f3eb] text-[#314057]
px-3 py-1.5 text-xs
```

### 5.4 입력 필드
```
rounded-2xl border border-[#d7d0c5] bg-white
px-4 py-3 text-[#18263f] outline-none
placeholder:text-[#9aa1ad]
```

### 5.5 이미지 카드
- 절대 위치 이미지 (`absolute inset-0 object-cover`)
- 선택적 오버레이 그래디언트
- 기본 오버레이: `from-[#18263f]/45 via-[#18263f]/10 to-transparent`

---

## 6. 그림자 시스템

| 용도 | 값 |
|------|-----|
| 일반 카드 | `0 20px 60px rgba(24,38,63,0.06)` |
| 강조 카드 | `0 25px 70px rgba(24,38,63,0.08)` |
| 히어로 이미지 | `0 30px 80px rgba(24,38,63,0.08)` |
| 리스트 카드 | `0 20px 60px rgba(24,38,63,0.05)` |

> 모든 그림자는 네이비(`#18263f`) 기반 투명도 변형이며, 따뜻한 배경 위에서 자연스럽게 녹아듦.

---

## 7. 라운딩 시스템

| 용도 | 값 |
|------|-----|
| 버튼 | `rounded-full` (9999px) |
| 입력 필드 | `rounded-2xl` (16px) |
| 작은 카드 / 썸네일 | `rounded-2xl` (16px) |
| 리스트 카드 | `rounded-[24px]` |
| 프로필 이미지 | `rounded-[28px]` |
| 주요 카드 | `rounded-[32px]` |
| 히어로 이미지 | `rounded-[36px]` |

---

## 8. 섹션 배경 교차 패턴

```
Header  → bgPrimary (#f7f5f0) + 반투명
Hero    → bgPrimary (#f7f5f0)
About   → bgSecondary (#f1ede6) ← alt
Lawyers → bgPrimary (#f7f5f0) ← base
Strength→ bgSecondary (#f1ede6) ← alt
Practice→ bgPrimary (#f7f5f0) ← base
Cases   → bgSecondary (#f1ede6) ← alt
Consult → bgPrimary (#f7f5f0) ← base
Footer  → bgSecondary (#f1ede6) ← alt
```

> 섹션 간 시각적 리듬을 위해 `bgPrimary`와 `bgSecondary`를 교차 배치

---

## 9. 디자인 토큰 파일

디자인 토큰은 `src/styles/theme.js`에 Tailwind 클래스 기반으로 정의되어 있습니다.

```javascript
import { theme } from '../styles/theme';

// 사용 예시
<div className={theme.page}>          // 페이지 배경
<h2 className={theme.title}>          // 제목 색상
<p className={theme.body}>            // 본문 색상
<button className={theme.buttonPrimary}> // 기본 버튼
```

---

## 10. 아이콘/에셋

현재 아이콘 라이브러리는 사용하지 않으며, 텍스트 기반 인터페이스를 유지합니다.
이미지 에셋은 모두 Unsplash 외부 URL을 참조합니다.

향후 자체 이미지 에셋 교체 시 `content.js`의 이미지 URL만 변경하면 됩니다.
