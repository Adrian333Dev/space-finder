import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
  UpdateItemCommand,
} from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export async function updateSpace(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (
    !event.queryStringParameters ||
    !('id' in event.queryStringParameters) ||
    !event.body
  )
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Missing space id' }),
    };

  const spaceId = event.queryStringParameters.id;
  const body = JSON.parse(event.body);
  const bodyKey = Object.keys(body)[0];
  const bodyValue = body[bodyKey];

  const updateResult = await ddbClient.send(
    new UpdateItemCommand({
      TableName: process.env.TABLE_NAME,
      Key: { id: { S: spaceId } },
      UpdateExpression: `SET #zzzNew = :new`,
      ExpressionAttributeNames: { '#zzzNew': bodyKey },
      ExpressionAttributeValues: { ':new': { S: bodyValue } },
    })
  );
}
