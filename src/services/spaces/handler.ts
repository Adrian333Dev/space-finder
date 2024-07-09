import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message = 'Not found';
  let statusCode = 200;

  switch (event.httpMethod) {
    case 'GET':
      message = 'GET method';
      break;
    case 'POST':
      message = 'POST method';
      break;
    default:
      statusCode = 404;
      break;
  }

  return {
    statusCode,
    body: JSON.stringify({ message }),
  };
}

export { handler };
