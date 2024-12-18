import { handlerPath } from '@libs/handler-resolver';
import schema from './schema';

export default {
  createRecipe: {
    handler: `${handlerPath(__dirname)}/handler.createFunc`,
    events: [
      {
        http: {
          method: 'post',
          path: 'recipe',
          request: {
            schemas: {
              'application/json': schema,
            },
          },
        },
      },
    ],
  },
  updateRecipe: {
    handler: `${handlerPath(__dirname)}/handler.updateFunc`,
    events: [
      {
        http: {
          method: 'put',
          path: 'recipe/{id}',
          request: {
            schemas: {
              'application/json': schema,
            },
          },
        },
      },
    ],
  },
  deleteRecipe: {
    handler: `${handlerPath(__dirname)}/handler.deleteFunc`,
    events: [
      {
        http: {
          method: 'delete',
          path: 'recipe/{id}',
        },
      },
    ],
  },
};
