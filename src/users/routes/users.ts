import express, { Router } from 'express';
import { v4 as uuid } from 'uuid';
import expressJoiValidation from 'express-joi-validation';

import { logger } from '../../main';
import { User } from '../interfaces/user';
import { sortByASC } from '../util/users';
import { userSchema } from '../schemas/user';

export const UsersRouter: Router = express.Router();

const validator = expressJoiValidation.createValidator({});

let users: User[] = [];

UsersRouter.get('/', (req, res) => {
  logger.info('get all users request');
  const { login, limit } = req.query;
  let filteredUsers = users.sort(sortByASC);
  if (limit) {
    filteredUsers = filteredUsers.slice(0, Number(limit));
  }
  if (login) {
    filteredUsers = filteredUsers.filter((user) => user.login.toLowerCase().includes((login as string).toLowerCase()));
  }
  res.status(200).json(filteredUsers);
});

UsersRouter.get('/:id', (req, res) => {
  logger.info('get singe user request');
  const userId = req.params.id;
  const user = users.find((user) => user.id === userId);
  if (user) {
    logger.info('user found');
    res.status(200).json(user);
  } else {
    logger.info('user not found');
    res.sendStatus(404);
  }
});

UsersRouter.post('/', validator.body(userSchema), (req, res) => {
  logger.info('create user request');
  const createdUser = {
    ...req.body.user,
    id: uuid(),
  };
  users.push(createdUser);
  logger.info('user successfully created');
  res.status(200).json(createdUser);
});

UsersRouter.put('/:id', validator.body(userSchema), (req, res) => {
  logger.info('update user request');
  const updatedData = req.body.user;
  const userId = req.params.id;
  const userToUpdate = users.find((user) => user.id === userId);
  if (userToUpdate) {
    const updatedUser = {
      ...userToUpdate,
      ...updatedData,
    };
    updateUser(userId, updatedUser);
    logger.info('user successfully updated');
    res.status(200).json(updatedUser);
  } else {
    logger.info('user not found');
    res.sendStatus(404);
  }
});

UsersRouter.delete('/:id', (req, res) => {
  logger.info('delete singe user request');
  const userId = req.params.id;
  const userToDelete = users.find((user) => user.id === userId);
  if (userToDelete) {
    updateUser(userId, {
      ...userToDelete,
      isDeleted: true,
    });
    logger.info('user successfully deleted');
    res.sendStatus(200);
  } else {
    logger.info('user not found');
    res.sendStatus(404);
  }
});

function updateUser(userId: string, updatedUser: User): void {
  users = users.reduce(
    (acc, user) =>
      user.id === userId
        ? [
            ...acc,
            {
              ...updatedUser,
            },
          ]
        : [...acc, user],
    []
  );
}
