import co from 'co';
import koa from 'koa';
import route from 'koa-route';
import moment from 'moment';
import {index} from './lib/server/routes';
moment.relativeTimeThreshold('m', 59);
const app = koa();

function cleanHandler(f) {
  return function* () {
    Object.assign(this, yield co(f));
  };
}

app.use(route.get('/', cleanHandler(index)));

app.listen(8008);
console.log('Koa listening on port 8008');
