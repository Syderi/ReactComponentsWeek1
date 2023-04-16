import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';
import renderApp from './dist/server/entry-server.js';

const app = express();
const PORT = 8080;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const template = fs.readFileSync(path.resolve(__dirname, './dist/client/index.html')).toString();
const inject = template.split('<!--ssr-inject-->');

app.use('/assets', express.static(path.resolve(__dirname, './dst/client/assets')));

app.use((request, response) => {
  response.write(inject[0]);
  const stream = renderApp(
    (request.url,
    {
      onShellReady() {
        stream.pipe(response);
      },
      onAllReady() {
        response.write(inject[1]);
        response.end();
      },
      onError(error: Error) {
        console.error(error);
      },
    })
  );
});

app.listen(PORT, () => {
  console.log(`Server start 'http://localhost:${PORT}'`);
});
