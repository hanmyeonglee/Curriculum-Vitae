# Markdown It Self

마크다운을 **커스텀 규칙으로 HTML로 변환**하고, 결과물을 **정적 HTML로 빌드하여 Nginx로 서빙**하는 프로젝트입니다.  
개발 모드에서는 Express + WebSocket 기반의 **핫로드(실시간 미리보기)** 를 제공합니다.

- 빌드/렌더링: [`build`](src/build/builder.ts), [`buildAll`](src/build/builder.ts)
- 개발 서버(핫로드): [src/server/server.ts](src/server/server.ts)

---

## 주요 기능

1. 일반 markdown
2. front-matter를 통한 metadata 관리
3. code syntax highlighting + code theme customization
4. KaTeX
5. Mermaid.js
6. attrs, tailwind와 연동해 페이지 구성 가능
7. nested div, horizontal 영역을 활용

---

## 빠른 시작

### 1. 로컬(Node)로 실행

#### 개발(핫로드)

```sh
npm install
npm run dev
```

- 접속: `http://localhost:3000`
- 목록: `/` (index)
- 미리보기: `http://localhost:3000/sample.md` 처럼 `*.md` 경로

#### 정적 빌드

```sh
npm install
npm run build
```

- TypeScript 컴파일: `npm run build:ts`
- 마크다운 빌드: `npm run build:md`
- 산출물: `dist/`

### 2. Docker로 실행

#### 개발(nginx + devserver)

```sh
docker compose up --build
```

- nginx: `http://localhost:8080`
- devserver(핫로드): `http://localhost:3000`
- `content/`는 컨테이너에 read-only로 마운트됨: [docker-compose.override.yml](docker-compose.override.yml)

#### Production(정적 파일만)

```sh
docker compose -f docker-compose.yml -f docker-compose.prod.yml up --build
```

- nginx: `http://localhost:80`
- 빌드 단계에서 `content/`를 HTML로 변환 후 Nginx 이미지에 포함: [Dockerfile](Dockerfile)

---

## 사용법

### 마크다운 작성 위치

- 마크다운: [content/](content/)
- 예시: [content/sample.md](content/sample.md)
- 이미지: `content/img/*`  
  - 마크다운에서는 `![...](./img/xxx.png)` 형태로 사용 (예시 참고)

### Front-matter 옵션(예시 기반)

[content/sample.md](content/sample.md)처럼 YAML front-matter로 일부 동작을 제어합니다.

- `title`, `description`, `author`, `keywords`, `lang`
- `theme`: Shiki 테마(예: `github-dark`, `min-light` 등) — [`BuildOptions.theme`](src/build/builder.ts)
- `tailwind: true`: Tailwind CDN 삽입
- `css`: 추가 CSS URL 배열/문자열
- `font`: body 폰트 지정

---

## 프로젝트 구조

- 정적 페이지 템플릿: [public/template.html](public/template.html)
- 파일 목록 인덱스: [public/index.html](public/index.html)
- 핫로드 프리뷰(iframe + WS): [public/hotload.html](public/hotload.html)

- 마크다운 빌더/렌더러: [src/build/builder.ts](src/build/builder.ts)
  - 진입점: [`build`](src/build/builder.ts), [`buildAll`](src/build/builder.ts), [`buildAndSave`](src/build/builder.ts)
  - 이미지 복사: [`copyImgFolder`](src/build/builder.ts)

- 개발 서버: [src/server/server.ts](src/server/server.ts)
  - 라우팅:
    - `/` 인덱스
    - `/api/files` 파일 목록
    - `/api/render?file=...` 렌더 결과(JSON)
    - `/:filename.md` 핫로드 페이지
  - WebSocket: 파일 구독 후 변경 시 해당 클라이언트에만 업데이트

- 컨테이너/서빙:
  - Nginx 설정: [nginx.conf](nginx.conf)
  - Compose: [docker-compose.yml](docker-compose.yml), [docker-compose.override.yml](docker-compose.override.yml), [docker-compose.prod.yml](docker-compose.prod.yml)

---

## 스크립트

[package.json](package.json)

- `npm run dev`: 개발 서버(핫로드)
- `npm run build`: TS 컴파일 + 정적 HTML 빌드
- `npm start`: 컴파일된 서버 실행(`out/server/server.js`)

---

## 참고

- TypeScript 설정: [tsconfig.json](tsconfig.json)
- Puppeteer 설정(mermaid-cli 용): [puppeteer.config.json](puppeteer.config.json)
