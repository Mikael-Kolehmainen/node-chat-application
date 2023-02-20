# Node-chat-application

## About this project
<p>This is a very simple chat application which I made with Nodejs and React for learning the AWS environment and services. I used LocalStack to develop the app locally.</p>

## AWS services used in this project
<ul>
  <li>DynamoDB</li>
  <li>S3</li>
  <li>Lambda</li>
  <li>SNS</li>
  <li>SQS</li>
</ul>

## How to install LocalStack
<p>https://www.youtube.com/watch?app=desktop&v=ATo19E6oegE&ab_channel=DevOpsJourney</p>

### "Problem" with LocalStack
<p>Persistence is a pro feature which means the data won't be saved after restarting the server. For example. The DynamoDB tables have to created again after restart.</p>
<p>https://docs.localstack.cloud/references/persistence-mechanism/</p>
