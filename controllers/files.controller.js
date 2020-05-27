const moment = require('moment');
const fileUtils = require('../utils/file.util');

const getFile = async (req, res) => {
  const { name } = req.query;
  const targetFilePath = await fileUtils.createPathFile(name);
  const readStreamData = await fileUtils.readStream(targetFilePath);
  if (!readStreamData) {
    res.status(404).send({
      message: 'File not found',
    });
  } else {
    readStreamData.pipe(res);
  }
};

const uploadFile = async (req, res) => {
  const { fields, file: fileInput } = await fileUtils.handleFormData(req);

  const fileNameSplit = fileInput.file.name.split('.');
  const lastIndexOfSplit = fileNameSplit.length - 1;
  const fileExtension = fileNameSplit[lastIndexOfSplit];
  const timeStamp = moment().format('YYYYMMDDHHmmss');
  const newFileName = `${fileNameSplit.filter((val, index) => index !== lastIndexOfSplit).join('')}_${timeStamp}.${fileExtension}`;

  const targetFilePath = await fileUtils.createPathFile(newFileName);
  const fileBinaryEncoding = await fileUtils.readFile(fileInput.file.path);

  // Create buffer from binary encode file (file want to store)
  const fileBufferData = Buffer.from(fileBinaryEncoding, 'binary');

  await fileUtils.writeFile({
    filePath: targetFilePath,
    fileData: fileBufferData,
  });

  res.status(200).send({
    fileName: newFileName,
    message: 'Upload file success',
  });
};

module.exports = {
  uploadFile,
  getFile,
};
