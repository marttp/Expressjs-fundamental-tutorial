// ! fs-extra สามารถ Write path ที่ขาดให้เอง
const fse = require('fs-extra');
const formidable = require('formidable');

const FILE_DIRECTORY = `${process.cwd()}/files`;

const createPathFile = async (fileName) => {
  // if (!fse.existsSync(FILE_DIRECTORY)) {
  //   await fse.ensureDir(FILE_DIRECTORY);
  // }
  return `${FILE_DIRECTORY}/${fileName}`;
};

const readFile = async (filePath, encoding = 'binary') => {
  return fse.readFile(filePath, encoding);
};

const writeFile = async ({ filePath, fileData }) => {
  return fse.outputFile(filePath, fileData);
};

const readStream = async (filePath) => {
  if (!fse.existsSync(filePath)) {
    return null;
  }
  return fse.createReadStream(filePath);
};

const handleFormData = async (req) => {
  const result = {
    fields: [],
    file: {},
  };
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    try {
      form
        .parse(req)
        .on('error', (error) => {
          reject(error);
        })
        .on('field', (key, value) => {
          result.fields.push({ key, value });
        })
        .on('file', (key, file) => {
          result.file = { key, file };
        })
        .on('end', () => {
          resolve(result);
        });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleFormData,
  createPathFile,
  readFile,
  writeFile,
  readStream,
};
