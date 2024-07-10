import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';

import { postSpaces } from './PostSpaces';
import { getSpaces } from './GetSpaces';
import { updateSpace } from './UpdateSpace';
import { deleteSpace } from './DeleteSpace';

const ddbClient = new DynamoDBClient({});

async function handler(
  event: APIGatewayProxyEvent,
  context: Context
): Promise<APIGatewayProxyResult> {
  let message: string;

  try {
    switch (event.httpMethod) {
      case 'GET':
        const getSpacesResult = await getSpaces(event, ddbClient);
        console.log('getSpacesResult:', getSpacesResult);
        return getSpacesResult;
      case 'POST':
        const postSpacesResult = await postSpaces(event, ddbClient);
        console.log('postSpacesResult:', postSpacesResult);
        return postSpacesResult;
      case 'PUT':
        const updateSpaceResult = await updateSpace(event, ddbClient);
        console.log('updateSpaceResult:', updateSpaceResult);
        return updateSpaceResult;
      case 'DELETE':
        const deleteSpaceResult = await deleteSpace(event, ddbClient);
        console.log('deleteSpaceResult:', deleteSpaceResult);
        return deleteSpaceResult;
      default:
        break;
    }
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message }),
  };
}

export { handler };
