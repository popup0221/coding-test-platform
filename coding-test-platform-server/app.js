const express = require('express');
const bundle = require('./bundle');

const app = express();

app.post('/bundle', async (req, res) => {
  try {
    // API 요청으로부터 React 소스를 가져옴
    const source = req.body.source;

    // React 소스를 번들링하여 JavaScript 코드 생성
    const js = await bundle(source);

    // Express 서버의 HTML 파일 읽기
    const html = fs.readFileSync(path.join(__dirname, 'public', 'react-index.html'), 'utf-8');

    // JavaScript 코드를 HTML 파일의 <div id="root"> 요소에 삽입하여 완성된 HTML을 응답으로 전송
    const modifiedHtml = html.replace('<div id="root"></div>', `<div id="root">${js}</div>`);
    res.send(modifiedHtml);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

// 서버 시작
app.listen(3030, () => {
  console.log(`Server is running on port 3030`);
});
