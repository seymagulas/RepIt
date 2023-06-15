const Koa = require('koa');
const router = require('./router');
const bodyParser = require('koa-bodyparser');
// const mongoose = require('mongoose');
const cors = require('@koa/cors');

const app = new Koa();

// mongoose.connect('mongodb://localhost:27017/RepIt', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((error) => {
//     console.error('Failed to connect to MongoDB:', error);
//   });

app.use(bodyParser());

app.use(cors());

app.use(router.routes())

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// module.exports = mongoose;
