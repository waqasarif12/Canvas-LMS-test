const fs = require('fs');
const csv = require('csv-parser');

exports.parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          course_id: data.course_id,
          assignment_id: data.assignment_id,
          user_id: data.user_id,
          grade: data.grade
        });
      })
      .on('end', () => resolve(results))
      .on('error', reject);
  });
};
