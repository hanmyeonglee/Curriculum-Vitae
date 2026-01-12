import express from 'express';
import http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import path from 'path';
import fs from 'fs';
import chokidar from 'chokidar';
import { build } from '../build/builder';

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

// 정적 파일 제공
const ROOT_DIR = path.join(__dirname, '..', '..');
const CONTENT_DIR = path.join(ROOT_DIR, 'content');
const indexHTML = fs.readFileSync(
  path.join(ROOT_DIR, 'public', 'index.html'), 'utf-8'
);
const hotloadHTML = fs.readFileSync(
  path.join(ROOT_DIR, 'public', 'hotload.html'), 'utf-8'
);

// 이미지 폴더 정적 제공 (content/img → /img)
app.use('/img', express.static(path.join(CONTENT_DIR, 'img')));

// 클라이언트별 구독 파일 추적
const clientFiles = new Map<WebSocket, string>();

interface RenderResult {
  html: string;
  filename: string;
  title: string;
  error?: boolean;
}

// 마크다운 파일 읽기 및 렌더링 (완전한 HTML 생성)
async function getRenderedContent(filename: string): Promise<RenderResult> {
  const filePath = path.join(CONTENT_DIR, filename);

  if (!fs.existsSync(filePath)) {
    return { 
      html: '<!DOCTYPE html><html><body><p>파일을 찾을 수 없습니다.</p></body></html>', 
      filename, 
      title: 'Error',
      error: true 
    };
  }

  const markdown = fs.readFileSync(filePath, 'utf-8');
  const { html, meta } = await build(markdown, { title: filename.replace('.md', '') });
  const title = (meta.title as string) || filename.replace('.md', '');

  return { html, filename, title };
}

// 파일 목록 가져오기
function getFileList(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) {
    fs.mkdirSync(CONTENT_DIR, { recursive: true });
    return [];
  }
  return fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
}

// 인덱스 페이지 HTML 생성
function generateIndexPage(): string {
  const files = getFileList();
  const fileLinks = files.map(f => `<li><a href="/${f}">${f}</a></li>`).join('\n      ');
  
  return indexHTML.replace('{{contentsList}}', 
    files.length > 0 
    ? `<ul>${fileLinks}</ul>` 
    : '<p class="empty">content 폴더에 .md 파일이 없습니다.</p>'
  );
}

// 루트 경로: 인덱스 페이지
app.get('/', (_req, res) => {
  res.send(generateIndexPage());
});

// API: 파일 목록
app.get('/api/files', (_req, res) => {
  res.json(getFileList());
});

// API: 마크다운 렌더링
app.get('/api/render', async (req, res) => {
  const filename = req.query.file as string;
  if (!filename) {
    return res.status(400).json({ error: 'file parameter required' });
  }
  const result = await getRenderedContent(filename);
  res.json(result);
});

// *.md 경로: hotload 페이지 제공
app.get('/:filename.md', (_req, res) => {
  res.send(hotloadHTML);
});

// WebSocket 연결 처리
wss.on('connection', (ws) => {
  console.log('🔌 클라이언트 연결됨');

  ws.on('message', async (data) => {
    try {
      const message = JSON.parse(data.toString());
      
      if (message.type === 'subscribe' && message.filename) {
        const filename = message.filename;
        clientFiles.set(ws, filename);
        console.log(`📂 구독: ${filename}`);
        
        // 초기 렌더링 전송
        const result = await getRenderedContent(filename);
        ws.send(JSON.stringify({ type: 'render', data: result }));
      }
    } catch (err) {
      console.error('메시지 파싱 오류:', err);
    }
  });

  ws.on('close', () => {
    clientFiles.delete(ws);
    console.log('🔌 클라이언트 연결 해제');
  });
});

// 파일 변경 감지 (Docker 볼륨에서는 polling 필요)
const watcher = chokidar.watch(CONTENT_DIR, {
  ignored: /(^|[\/\\])\../,
  persistent: true,
  usePolling: true,
  interval: 250
});

watcher.on('change', async (filePath) => {
  const filename = path.basename(filePath);
  if (!filename.endsWith('.md')) return;
  
  console.log(`📝 파일 변경 감지: ${filename}`);
  const result = await getRenderedContent(filename);

  // 해당 파일을 구독하는 클라이언트에게만 업데이트 전송
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN && clientFiles.get(client) === filename) {
      client.send(JSON.stringify({ type: 'update', data: result }));
    }
  });
});

watcher.on('add', (filePath) => {
  const filename = path.basename(filePath);
  if (!filename.endsWith('.md')) return;
  console.log(`➕ 새 파일 추가: ${filename}`);
});

// 서버 시작
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`
🚀 마크다운 렌더러 서버 시작!
📍 http://localhost:${PORT}
📁 마크다운 파일 위치: ${CONTENT_DIR}
🔥 핫로드 활성화됨 - 파일 수정시 자동 반영
  `);
});
