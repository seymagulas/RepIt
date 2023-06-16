import Koa from 'koa';
const router =  require('./router');
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

const app:Koa = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(router.routes())

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


