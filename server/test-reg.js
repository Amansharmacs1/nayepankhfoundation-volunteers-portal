const axios = require('axios');

async function testReg() {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'password123',
      phone: '1234567890',
      college: 'Test College',
      course: 'BTech',
      year: '1',
      city: 'Test City',
      skills: ['React', 'Node'],
      interests: ['Coding'],
      availability: 'Weekends only'
    });
    console.log('Success:', res.data);
  } catch (error) {
    if (error.response) {
      console.log('Error Data:', error.response.data);
      console.log('Error Status:', error.response.status);
    } else {
      console.log('Network Error or Server not running:', error.message);
    }
  }
}

testReg();
