# ==================== Builder Stage ====================
FROM node:20-slim AS builder

# Puppeteer/Mermaid CLI를 위한 Chromium 의존성 설치
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-noto-cjk \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Puppeteer가 설치된 Chromium 사용하도록 설정
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app

# 패키지 파일 복사 및 의존성 설치
COPY package*.json ./
RUN npm ci

# 소스 코드 복사
COPY tsconfig.json ./
COPY puppeteer.config.json ./
COPY src/ ./src/
COPY public/ ./public/

# TypeScript 빌드
RUN npm run build:ts

# content 복사 및 마크다운 빌드
COPY content/ ./content/
RUN npm run build:md

# ==================== Nginx Stage ====================
FROM nginx:alpine AS nginx

# 빌드된 정적 파일 복사
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# Nginx 설정 복사
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# ==================== Dev Server Stage ====================
FROM builder AS devserver

WORKDIR /app

# 환경 변수
ENV NODE_ENV=development

EXPOSE 3000

CMD ["node", "out/server/server.js"]
