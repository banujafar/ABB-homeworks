import http from 'http';

let requestCount = 0;

const server = http.createServer((req, res) => {
  if (req.url !== '/favicon.ico') {
    requestCount += 1;
  }

  res.end(
    JSON.stringify({
      message: 'Request handled successfully',
      requestCount,
    }),
  );
});

const PORT =
  process.argv.find(arg => arg.includes('port'))?.split('=')[1] || 3000;
server.listen(PORT, () => {
  console.log(`Server is starting on Port: ${PORT}`);
});
