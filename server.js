const fs = require('fs');

const fileContent = 'This is the content of the file.';

const fileName = 'file_1.txt';

fs.writeFile(fileName, fileContent, (err) => {
  if (err) {
    console.error('Error writing to file:', err);
  } else {
    console.log('File created successfully:', fileName);
  }
});
