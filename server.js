const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./bd/db.json');
const middlewares = jsonServer.defaults();
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('./bd/db.json');
const db = low(adapter);

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (req.method === 'POST' && req.path === '/users') {
    const users = db.get('users');
    const maxId = users.size().value() > 0 ? users.maxBy('id').value().id : 0;
    req.body.id = maxId + 1;
  }
  next();
});

server.use(router);

server.listen(3000, () => {
  console.log('JSON Server is running on port 3000');
});