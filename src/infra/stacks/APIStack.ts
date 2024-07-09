import { Stack, StackProps } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

interface APIStackProps extends Partial<StackProps> {
  spacesLambdaIntegration: LambdaIntegration;
}

export class APIStack extends Stack {
  constructor(scope: Construct, id: string, props: APIStackProps) {
    super(scope, id, props);

    const api = new RestApi(this, 'SpacesAPI');
    const spaceResource = api.root.addResource('spaces');
    spaceResource.addMethod('GET', props.spacesLambdaIntegration);
    spaceResource.addMethod('POST', props.spacesLambdaIntegration);
  }
}
