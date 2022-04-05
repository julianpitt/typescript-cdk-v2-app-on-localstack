#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { LocalstackCdkTypescriptStack } from '../lib/localstack-cdk-typescript-stack';

const app = new cdk.App();
new LocalstackCdkTypescriptStack(app, 'LocalStacksCdkTypescriptStack', {});