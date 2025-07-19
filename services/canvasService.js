const axios = require('axios');
const API_BASE = process.env.CANVAS_API_BASE_URL;
const AUTH_TOKEN = process.env.CANVAS_AUTH_TOKEN;

const canvas = axios.create({
  baseURL: API_BASE,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

exports.submitBulkGrades = async (grades) => {
  const results = [];

  for (const entry of grades) {
    const { course_id, assignment_id, user_id, grade } = entry;

    try {
      const response = await canvas.put(
        `/courses/${course_id}/assignments/${assignment_id}/submissions/${user_id}`,
        {
          submission: { posted_grade: grade.toString() }
        }
      );

      results.push({
        user_id,
        assignment_id,
        status: 'success',
        canvas_response: response.data
      });
    } catch (err) {
      results.push({
        user_id,
        assignment_id,
        status: 'error',
        error: err.response?.data || err.message
      });
    }
  }

  return results;
};
