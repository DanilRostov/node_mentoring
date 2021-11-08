import { User } from '../interfaces/user';

export function sortByASC(a: User, b: User) {
  return a.login > b.login ? 1 : -1;
}
