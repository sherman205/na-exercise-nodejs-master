const app = require('./routes/app').app;

const port = 3000;
const host = 'localhost';

const server = app.listen(port, host, () => {
  const host = server.address().address;
  const port = server.address().port;
  /* eslint-disable no-console */
  console.log('app listening at http://' + host + ':' + port);
  /* eslint-disable no-console */
});
