# Typescript cdk v2 app on localstack

# Running this project

1. Install the following

    1. [AWS Cli](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
    1. Nodejs
    1. CDK and CDK local: `npm install -g aws-cdk-local aws-cdk`
    1. [LocalStacks](https://docs.localstack.cloud/get-started/)
    1. [Docker](https://docs.docker.com/get-docker/)
    1. [AWS SAM Cli](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)

2. Set your env vars, open a terminal and set the following. This can also be set automatically using a `.envrc` file and direnv [https://direnv.net/](https://direnv.net/)

```bash
export LOCALSTACK_API_KEY={enter your key}
export LOCALSTACK_DOCKER_NAME=cdk-tsc-example
```

3. Install local project dependencies

```bash
npm install
```

## Running locally

### With AWS SAM Cli

1. Run the following to invoke our function

```bash
cdk synth --no-staging
sam local invoke -t ./cdk.out/LocalStacksCdkTypescriptStack.template.json HelloFunction
```

Example output:

```bash
Invoking index.handler (nodejs14.x)
Skip pulling image and use local one: public.ecr.aws/sam/emulation-nodejs14.x:rapid-1.40.1-x86_64.

Mounting /Users/jpittas/Documents/Demos/local-stacks-cdk-typescript/cdk.out/asset.61e05028c446aac1bce83db21df369a705411a9ec7d9d1932a8c14385f8f36ce as /var/task:ro,delegated inside runtime container
START RequestId: 592e7d7f-0010-44ab-b035-1704b6e1ff35 Version: $LATEST
END RequestId: 592e7d7f-0010-44ab-b035-1704b6e1ff35
REPORT RequestId: 592e7d7f-0010-44ab-b035-1704b6e1ff35	Init Duration: 0.23 ms	Duration: 145.90 ms	Billed Duration: 146 ms	Memory Size: 128 MB	Max Memory Used: 128 MB
{"statusCode":200,"body":"Hello from Lambda on localstack"}%
```

### Deploy to localstack

Note: You will need to set the env vars as mentioned above for each new terminal tab or window you open

If you’ve set up direnv then this will be automatic

1. Start localstack in a terminal

```tsx
docker compose up
```

2. Start a new terminal and verify that localstack is up and running

```tsx
curl http://localhost:4566/
// or `localstack status`
```

3. Verify that the services we need are running

```tsx
curl http://localhost:4566/health
// or `localstack status services`
```

4. Bootstrap & deploy cdk to localstack

```tsx
cdklocal bootstrap
cdklocal deploy
```

Example output:

```tsx
✅  LocalStacksCdkTypescriptStack

✨  Deployment time: 6.35s

Outputs:
LocalStacksCdkTypescriptStack.helloendpoint = https://b28d96bd.execute-api.localhost.localstack.cloud:4566//hello
Stack ARN:
arn:aws:cloudformation:ap-southeast-2:000000000000:stack/LocalStacksCdkTypescriptStack/0b02b969

✨  Total time: 13.81s
```

5. Test out the endpoint

```tsx
curl`aws cloudformation describe-stacks --endpoint=http://localhost:4566 --stack-name LocalStacksCdkTypescriptStack --query "Stacks[?stackname==LocalStacksCdkTypescriptStack] | [0].Outputs[?outputkey==helloendpoint] | [0].OutputValue" --output text`;
```
