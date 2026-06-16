import axios from 'axios';

const api = axios.create({
  baseURL: 'https://nayepankhfoundation-volunteers-portal-1.onrender.com/api',
  withCredentials: true,
  headers: {
    'Origin': 'https://nayepankh-vms.vercel.app' // Simulate Vercel origin
  }
});

(async () => {
  try {
    const res = await api.post('/auth/register', {
      name: "Test User Axios",
      email: "axios@test.com",
      password: "password123",
      phone: "0987654321",
      college: "Test",
      course: "Test",
      year: "2nd",
      city: "Test",
      skills: ["Testing"],
      interests: ["Testing"],
      availability: "Weekends only",
      consent: true
    });
    console.log('SUCCESS:', res.data);
    console.log('SET-COOKIE HEADER:', res.headers['set-cookie']);
  } catch (error) {
    console.log('ERROR STATUS:', error.response?.status);
    console.log('ERROR DATA:', error.response?.data);
    console.log('ERROR MESSAGE:', error.message);
  }
})();
