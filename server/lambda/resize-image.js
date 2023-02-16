const { AWS } = require("../AWS");

exports.handler = async (event, context) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  const params = {
    Bucket: bucket,
    Key: key
  };
  const s3 = new AWS.S3({
    s3ForcePathStyle: true,
  });

  try {
    const { ContentType } = await s3.getObject(params).promise();
    console.log("CONTENT TYPE:", ContentType);
    return ContentType;
  } catch (error) {
    console.log(error);
    const message = `Error getting object ${key} from bucket ${bucket}`;
    console.log(message);
    throw new Error(message);
  }
};