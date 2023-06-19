import Koa from 'koa';
import { router } from './router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';

const app:Koa = new Koa();

app.use(bodyParser());
app.use(cors());
app.use(router.routes())

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


