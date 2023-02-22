const { AWS } = require("../AWS");

snsAlarmImageResize = async (imageSize) => {
  const params = {
    Message: `A sent image was rezised to ${imageSize}`,
    TopicArn: 'arn:aws:sns:us-east-1:000000000000:image-resize'
  };

  try {
    const publishText = await new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
    console.log(`Message ${params.Message} sent to the topic ${params.TopicArn}`);
    console.log(`MessageID is ${publishText.MessageId}`);
  } catch (error) {
    console.error(error, error.stack);
  }
}

module.exports = {
  snsAlarmImageResize
};