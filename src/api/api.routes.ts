import * as Koa from "koa";
import * as Router from "koa-router";
import { getRepository } from 'typeorm';
import nanoid from '../nanoid'
import UrlInfo from '../entities/url.entity'

const router: Router = new Router();

/**
 * Shortens a given long url.
 *
 * Url: POST /shorten
 * Body: { url: "http://somelongurl.com" }
 * Returns: { original_url, short_url }
 */

router.post('/shorten', async (ctx:Koa.Context) => {
  let short_url: string;
  // Check if it already exists.
  const x: UrlInfo | undefined = await getRepository(UrlInfo).findOne({original_url: ctx.request.body.url})
  // If it doesn't exist, create and return
  if (!x) {
    short_url = nanoid();
    const now: Date = new Date();
    await getRepository(UrlInfo).insert({
      original_url: ctx.request.body.url,
      short_url,
      visits: 0,
      date_created: now,
      date_updated: now
    })
    ctx.body = {original_url: ctx.request.body.url, short_url };
  } else {
    // return UrlInfo 
    ctx.body = {original_url: x.original_url, short_url: x.short_url};
  }
});

/**
 * Finds a short url code and sends back the original url.
 *
 * Url: GET /:shortUrlCode
 * Returns: original_url
 */

router.get('/:shortUrlCode', async (ctx:Koa.Context) => {
  const x: UrlInfo | undefined = await getRepository(UrlInfo).findOne({short_url: ctx.params.shortUrlCode});
  if (x){
    getRepository(UrlInfo).increment({id:x.id}, "visits", 1);
    ctx.body = x.original_url;
  } else {
    ctx.body = null;
  }
  
})

interface TopResults {
  original_url: string,
  short_url:string,
  visits: number
}

/**
 * Returns top "num" number of results based on descending order of visits.
 *
 * Url: /top/:num
 * Returns: TopResults[]
 */

router.get('/top/:num', async (ctx:Koa.Context) => {
  // Get top n visits in descending order.
  const results: TopResults[] = await getRepository(UrlInfo)
    .createQueryBuilder("url_info")
    .select(["url_info.original_url as original_url","url_info.short_url as short_url","url_info.visits as visits"])
    .orderBy("visits", "DESC")
    .limit(ctx.params.num)
    .getRawMany();
  ctx.body = results;
})

export default router;