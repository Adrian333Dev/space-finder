import {
  DynamoDBClient,
  GetItemCommand,
  ScanCommand,
} from '@aws-sdk/client-dynamodb';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { unmarshall } from '@aws-sdk/util-dynamodb';

export async function getSpaces(
  event: APIGatewayProxyEvent,
  ddbClient: DynamoDBClient
): Promise<APIGatewayProxyResult> {
  if (event.queryStringParameters && 'id' in event.queryStringParameters) {
    const spaceId = event.queryStringParameters.id;
    const result = await ddbClient.send(
      new GetItemCommand({
        TableName: process.env.TABLE_NAME,
        Key: { id: { S: spaceId } },
      })
    );

    if (!result.Item)
      return {
        statusCode: 404,
        body: JSON.stringify({ message: `Space with id ${spaceId} not found` }),
      };

    console.log(result.Item);
    return {
      statusCode: 200,
      body: JSON.stringify(unmarshall(result.Item)),
    };
  }

  const result = await ddbClient.send(
    new ScanCommand({
      TableName: process.env.TABLE_NAME,
    })
  );

  console.log(result.Items);

  return {
    statusCode: 200,
    body: JSON.stringify(result.Items.map((item) => unmarshall(item))),
  };
}
