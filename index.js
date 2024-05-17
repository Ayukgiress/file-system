const { EventEmitter } = require('events');

class fileUploaderError extends Error {
  constructor(message) {
    super(message);
    this.name = 'fileUploaderError';
  }
}

const fileUploader = new EventEmitter();

function uploadFile() {
  fileUploader.emit('fileUpload');

  const randomNumber = Math.random();
  if (randomNumber > 0.8) {
    fileUploader.emit('error', new fileUploaderError(`random number ${randomNumber} is greater than 0.8. file upload failed.`));
  } else {
    fileUploader.emit('fileUploadComplete');
    fileUploader.emit('fileProcessingStarted');

    console.log('file processing....');

    fileUploader.emit('fileProcessingComplete');
    console.log('notification sent');
  }
}

fileUploader.on('fileUpload', () => {
  console.log('your file uploading has started');
});

fileUploader.on('error', (error) => {
  console.error(error.message);
});

fileUploader.on('fileUploadComplete', () => {
  console.log('your upload is completed');
});

fileUploader.on('fileProcessingStarted', () => {
  console.log('file processing has started');
});

fileUploader.on('fileProcessingComplete', () => {
  console.log('file processing is completed');
});

uploadFile();

