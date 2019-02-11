import express from 'express';
import React from 'react';
import { renderToNodeStream } from 'react-dom/server';
import App from './client/App';

const port = 3000;
const server = express();

server.get('/', (req, res) => {
	// Create the cache stream and pipe it into the response
	// Send the start of your HTML to the browser
	res.write('<html><head><title>Page</title></head><body><div id="root">');

	// Render your frontend to a stream and pipe it to the response
	const stream = renderToNodeStream(<App />);
	stream.pipe(res, { end: 'false' });
  
	// When React finishes rendering send the rest of your HTML to the browser
	stream.on('end', () => {
	  res.end('</div></body></html>');
	});
});

server.listen(port);
console.log(`Serving at http://localhost:${port}`);