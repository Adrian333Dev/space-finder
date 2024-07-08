import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration } from 'aws-cdk-lib/aws-apigateway';
import { ITable } from 'aws-cdk-lib/aws-dynamodb';
import {
  Function as LambdaFn,
  Code as LambdaCode,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import { join } from 'path';

interface ILambdaStackProps extends Partial<StackProps> {
  spacesTable: ITable;
}

export class LambdaStack extends Stack {
  public readonly helloLambdaIntegration: LambdaIntegration;

  constructor(scope: Construct, id: string, props: ILambdaStackProps) {
    super(scope, id, props);

    const helloLambda = new LambdaFn(this, 'HelloLambda', {
      runtime: Runtime.NODEJS_18_X,
      handler: 'hello.main',
      code: LambdaCode.fromAsset(join(__dirname, '..', '..', 'services')),
      environment: {
        TABLE_NAME: props.spacesTable.tableName,
      }, 
    });

    this.helloLambdaIntegration = new LambdaIntegration(helloLambda);
  }
}
