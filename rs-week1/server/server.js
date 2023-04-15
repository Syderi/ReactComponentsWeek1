import App from '../src/App';
import express from 'express';
import { createServer } from 'http';
import { renderToPipeableStream } from '@react-ssr/express';

const app = express();

app.use(express.static('public'));

app.get('*', (req, res) => {
  const stream = renderToPipeableStream(<App />);
  stream.pipe(res);
});

const server = createServer(app);

server.listen(3000, () => {
  console.log('Server started on port 3000');
});































// const app = express();

// app.use(express.static('public'));

// app.get('*', (req, res) => {
//   const html = renderToString(
//     <Provider store={store}>
//       <App />
//     </Provider>
//   );

//   res.send(`
//   <!DOCTYPE html>
//   <html lang="en">
//     <head>
//       <meta charset="UTF-8" />
//       <link rel="icon" type="image/svg+xml" href="/vite.svg" />
//       <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//       <title>RS + Week1 + Vite + React + TS</title>
//     </head>
//       <body>
//         <div id="root">${html}</div>
//         <script type="module" src="/build/bundle.js"></script>
//       </body>
//     </html>
//   `);
// });

// app.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });
