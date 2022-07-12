import { rest } from 'msw';
import { USERS } from './users.mock';

export const handlers = [

  rest.get('/users', (req, res, ctx) => {

    return res(
      ctx.status(200),
      ctx.json(USERS),
    )

  }),

]
