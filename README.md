# [JYSCinema]()

### 프로젝트 설명
JYSCinema는 TMDB API를 활용하여 영화 정보를 제공하고, 사용자가 영화를 검색하고 찜 목록에 영화를 추가하거나 삭제할 수 있는 React 기반 웹 애플리케이션입니다. 이 애플리케이션은 사용자에게 최신 영화 정보를 제공하고, 직관적인 UI를 통해 영화를 관리할 수 있는 기능을 제공합니다.

### 주요 기능
- **회원가입 및 로그인**: 사용자가 계정을 생성하고 로그인할 수 있습니다.
- **TMDB API를 활용한 영화 리스트 제공**: 최신 영화 목록을 TMDB API에서 가져와서 제공하며, 세부 정보를 확인할 수 있습니다.
- **무한 스크롤 및 페이지네이션 지원**: 영화 목록을 무한 스크롤 또는 페이지네이션 방식으로 제공합니다.
- **영화 필터링**: 장르, 개봉일, 평점 등을 기준으로 영화를 필터링할 수 있습니다.
- **찜 목록 관리**: 사용자가 찜 목록에 영화를 추가하거나 삭제할 수 있습니다.

### 기술 스택
- **React.js**: 사용자 인터페이스를 구축하는 라이브러리
- **FontAwesome**: UI 아이콘 제공
- **TMDB API**: 영화 데이터를 가져오기 위한 외부 API
- **React Router**: 애플리케이션 내 페이지 네비게이션을 처리하는 라이브러리
- **CSS/SCSS**: 스타일링 및 레이아웃 구성

### 설치 및 실행 방법

1. **레포지토리 클론**
   ```bash
   https://github.com/jys-jeong/WSD.git
2. **패키지 설치**
   ```bash
   cd WSD
   npm install
3. **애플리케이션 실행**
   ```bash
   npm start

### 프로젝트 구조
```bash
   WSD/
├── .github/workflows
│   ├── deploy.yml
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── assets/styles
│   │   ├── AuthForm.css
│   │   ├── Banner.css
│   │   ├── Auth/Filter.css
│   │   └── ...
│   ├── components/
│   │   ├── Auth/
│   │   ├── home/
│   │   ├── popular/
│   │   ├── search/
│   │   ├── Header.tsx
│   │   └── ...
│   ├── hooks/
│   │   ├── useAuth.tsx
│   │   ├── useToast.tsx
│   │   ├── useFetchMovies.tsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── hompage.tsx
│   │   ├── popular.tsx
│   │   └── ...
│   ├── types/
│   │   └── Movie.d.ts
│   ├── utils/vvvvvvvvvvvvv
│   │   ├── URL.tsx
│   │   ├── calculateLayout.tsx
│   │   ├── localstorage.tsx
│   │   └── ...
│   ├── App.tsx
│   ├── App.css
│   ├── routes.tsx
│   ├── index.tsx
│   └── ...
├── .env
├── package.json
└── README.md
