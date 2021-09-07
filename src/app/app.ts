import * as Koa from 'koa';
import * as cors from '@koa/cors';
import * as bodyParser from 'koa-bodyparser';
import apiRoutes from '../api/api.routes';

const app:Koa = new Koa();

app.use(bodyParser());
app.use(cors());

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status || 500;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

app.use(apiRoutes.routes());
app.use(apiRoutes.allowedMethods());

// Application error logging.
app.on('error', console.error);

export default app;