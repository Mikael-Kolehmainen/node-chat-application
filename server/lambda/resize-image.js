const sharp = require("sharp");

const { AWS } = require("../AWS");

exports.handler = async (event, context) => {
  const bucket = event.Records[0].s3.bucket.name;
  const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
  let params = {
    Bucket: bucket,
    Key: key
  };
  const s3 = new AWS.S3({
    s3ForcePathStyle: true,
  });

  try {
    const message = await s3.getObject(params).promise();
    const image = message.Body;
    const resizedImage = await sharp(image)
                          .resize(800)
                          .toBuffer();
    params = {
      Bucket: bucket,
      Key: key,
      Body: resizedImage,
    };
    const imageData = await s3.upload(params).promise();
    console.log(imageData.Location);
  } catch (error) {
    console.log(error);
  }
};