import { DeleteItemCommand, DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export async function deleteSpace(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (!event.queryStringParameters || !('id' in event.queryStringParameters))
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing space id' }),
    };

  const spaceId = event.queryStringParameters.id;

  const deleteResult = await ddbClient.send(
    new DeleteItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: { id: { S: spaceId } },
    })
  );

  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Space deleted' }),
  };
}
