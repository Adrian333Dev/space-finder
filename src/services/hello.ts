import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Context,
} from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { S3Client, ListBucketsCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client();

async function handler(event: APIGatewayProxyEvent, context: Context) {
  const command = new ListBucketsCommand({});
  const lisBucketsResult = (await s3.send(command)).Buckets;

  const res: APIGatewayProxyResult = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Hello from Lambda!',
      event,
      context,
      lisBucketsResult,
      uuid: uuid(),
    }),
  };

  console.log('EVENT:', event);
  return res;
}

export { handler };
