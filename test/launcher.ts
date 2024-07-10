import { handler } from '../src/services/spaces/handler';

handler(
  {
    httpMethod: 'GET',
    queryStringParameters: {
      id: 'f40d8088-ae9e-4fbf-bb3f-af39df411581',
    },
    // body: JSON.stringify({ location: 'My Ass' }),
  } as any,
  {} as any
);
