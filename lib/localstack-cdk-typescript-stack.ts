import { CfnOutput, Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { HttpLambdaIntegration } from '@aws-cdk/aws-apigatewayv2-integrations-alpha';
import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2-alpha';

export class LocalstackCdkTypescriptStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloFn = new NodejsFunction(this, 'HelloFunction', {
      functionName: 'helloFn',
      entry: './resources/functions/hello/index.ts'
    });
    const helloIntegration = new HttpLambdaIntegration('HelloIntegration', helloFn);
    
    const httpApi = new HttpApi(this, 'HttpAPI', {
      description: 'HTTP API example with localstack',
      createDefaultStage: true
    });
    
    httpApi.addRoutes({
      path: '/hello',
      methods: [ HttpMethod.GET ],
      integration: helloIntegration,
    });

    new CfnOutput(this, 'hello-endpoint', {
      value: (httpApi.url || "") + 'hello'
    });
  }
}
