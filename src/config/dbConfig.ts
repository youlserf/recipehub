import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const dynamoDBClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
});

const dynamoDBDocumentClient = DynamoDBDocumentClient.from(dynamoDBClient);

export { dynamoDBDocumentClient };

