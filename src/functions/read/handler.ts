import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { GetCommand } from "@aws-sdk/lib-dynamodb";
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { dynamoDBDocumentClient } from "src/config/dbConfig";

const tableName = process.env.RECIPE_TABLE!;

const getRecipe: ValidatedEventAPIGatewayProxyEvent<null> = async (event: any) => {
  try {
    const { id } = event.pathParameters!;

    const params = {
      TableName: tableName,
      Key: { id },
    };

    const result = await dynamoDBDocumentClient.send(new GetCommand(params));

    if (!result.Item) {
      return formatJSONResponse({
        statusCode: 404,
        message: 'Receta no encontrada',
      });
    }

    return formatJSONResponse({
      statusCode: 200,
      data: result.Item,
    });
  } catch (error) {
    return formatJSONResponse({
      statusCode: 500,
      message: 'Error al obtener receta',
      error: error.message,
    });
  }
};


const getAll: ValidatedEventAPIGatewayProxyEvent<null> = async () => {
  try {
    const params = {
      TableName: tableName,
    };

    const result = await dynamoDBDocumentClient.send(new ScanCommand(params));

    return formatJSONResponse({
      statusCode: 200,
      data: result.Items || [],
    });
  } catch (error) {
    return formatJSONResponse({
      statusCode: 500,
      message: 'Error al obtener todas las recetas',
      error: error.message,
    });
  }
};
export const getRecipeById = middyfy(getRecipe);
export const getAllRecipes = middyfy(getAll);

