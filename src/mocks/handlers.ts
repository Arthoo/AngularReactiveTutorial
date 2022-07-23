import { rest } from 'msw';
import { User } from 'src/model/user.model';
import { USERS } from './users.mock';

export const handlers = [

  rest.get('/users', (req, res, ctx) => {
    // Parameters
    const searchText  = (req.url.searchParams.get('searchText') || '').toLowerCase();
    const pageSize = Number(req.url.searchParams.get('pageSize'));
    const page = Number(req.url.searchParams.get('page'));
    // Process request
    const filteredUsers = filterUsers(searchText as string);
    const start = page * pageSize;
    const end = start + pageSize;
    const users = filteredUsers.slice(start, end);
    const pages = Math.ceil(filteredUsers.length / pageSize);
    // Return result
    return res(
      ctx.status(200),
      ctx.delay(200),
      ctx.json({ users, pages }),
    )
  }),

]

const filterUsers = (searchText: string): User[] => {
  return USERS.filter(user => isUserSearchMatch(user, searchText));
}

const isUserSearchMatch = (user: User, searchText: string): boolean => {
  return !searchText
    || Number(searchText) === user.id
    || [user.first_name, user.last_name, user.email].some(value => value.toLowerCase().includes(searchText));
}
