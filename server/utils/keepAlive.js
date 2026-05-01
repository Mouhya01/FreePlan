import https from 'https';

// Ping the server every 10 minutes to prevent Render free tier sleep
const keepAlive = (url) => {
  setInterval(() => {
    https.get(url, (res) => {
      console.log(`Keep-alive ping: ${res.statusCode}`);
    }).on('error', (err) => {
      console.log(`Keep-alive error: ${err.message}`);
    });
  }, 10 * 60 * 1000);
};

export default keepAlive;