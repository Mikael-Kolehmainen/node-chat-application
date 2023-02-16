exports.handler = async (event) => {
  console.log(event);
  // Create Lambda environment variable
  // console.log(env.process.testKey);
  const response = {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
  return response;
}