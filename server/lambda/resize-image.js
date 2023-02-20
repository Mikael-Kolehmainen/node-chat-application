const sharp = require("sharp");

const { AWS } = require("../AWS");
const { snsAlarmImageResize } = require("../sns/alarm-image-resize");

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
    const newImageWidth = 800;
    const resizedImage = await sharp(image)
                          .resize(newImageWidth)
                          .toBuffer();
    params = {
      Bucket: bucket,
      Key: key,
      Body: resizedImage,
    };
    const imageData = await s3.upload(params).promise();
    console.log(imageData.Location);
    await snsAlarmImageResize(newImageWidth);
    return "success!";
  } catch (error) {
    console.log(error);
    return "error!";
  }
};