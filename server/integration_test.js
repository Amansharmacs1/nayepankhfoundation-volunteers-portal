import axios from 'axios';

const API_URL = 'http://localhost:5001/api';

let sessionCookie = '';

// Axios interceptor to capture and send cookies
const client = axios.create({ baseURL: API_URL, withCredentials: true });

client.interceptors.response.use((response) => {
  const cookies = response.headers['set-cookie'];
  if (cookies && cookies.length > 0) {
    // Extract jwt cookie
    const jwtCookie = cookies.find(c => c.startsWith('jwt='));
    if (jwtCookie) {
      sessionCookie = jwtCookie.split(';')[0]; // Extract just the key=value part
    }
  }
  return response;
});

client.interceptors.request.use((config) => {
  if (sessionCookie) {
    config.headers.Cookie = sessionCookie;
  }
  return config;
});

async function runTests() {
  console.log('🚀 Starting Integration Tests...');
  let volunteerId = '';

  const testEmail = `test.vol.${Date.now()}@example.com`;
  
  try {
    // 1. Register a new volunteer
    console.log('\n[1] Testing Registration...');
    const regRes = await client.post('/auth/register', {
      name: 'Integration Test Volunteer',
      email: testEmail,
      password: 'password123',
      phone: '1234567890',
      college: 'Test College',
      course: 'BTech',
      year: '3rd',
      city: 'Test City',
      skills: ['Coding', 'Testing'],
      interests: ['Education'],
      availability: 'Weekends'
    });
    console.log('✅ Registration successful:', regRes.data.message);

    // 2. Login as volunteer
    console.log('\n[2] Testing Login...');
    const loginRes = await client.post('/auth/login', {
      email: testEmail,
      password: 'password123'
    });
    volunteerId = loginRes.data._id;
    console.log('✅ Login successful:', loginRes.data.name);

    // 3. Get Volunteer Profile
    console.log('\n[3] Testing Get Profile...');
    const profileRes = await client.get('/auth/me');
    console.log('✅ Profile fetched successfully. Status:', profileRes.data.status);

    // 4. Logout Volunteer
    console.log('\n[4] Testing Logout...');
    await client.post('/auth/logout');
    console.log('✅ Logout successful.');

    // 5. Login as Admin
    console.log('\n[5] Testing Admin Login...');
    const adminLoginRes = await client.post('/auth/login', {
      email: 'admin@nayepankh.org',
      password: 'adminpassword123'
    });
    console.log('✅ Admin login successful:', adminLoginRes.data.name);

    // 6. Admin: Get Volunteers
    console.log('\n[6] Testing Admin Fetch Volunteers...');
    const volsRes = await client.get('/admin/volunteers');
    console.log(`✅ Admin fetched volunteers. Found: ${volsRes.data.volunteers.length}`);

    // 7. Admin: Update Volunteer Status to Approved
    console.log('\n[7] Testing Admin Approve Volunteer...');
    const approveRes = await client.put(`/admin/volunteers/${volunteerId}/status`, {
      status: 'Approved',
      remarks: 'Looks good!'
    });
    console.log(`✅ Volunteer status updated to: ${approveRes.data.status}`);
    if(approveRes.data.volunteerId) {
      console.log(`✅ ID Card Generated: ${approveRes.data.volunteerId}`);
    } else {
      throw new Error("ID Card was not generated on approval!");
    }

    // 8. Admin: Get Analytics
    console.log('\n[8] Testing Admin Analytics...');
    const analyticsRes = await client.get('/admin/analytics');
    console.log(`✅ Analytics fetched. Total Approved: ${analyticsRes.data.cards.approved}`);

    // 9. Admin: Export CSV
    console.log('\n[9] Testing Admin CSV Export...');
    const csvRes = await client.get('/admin/export/volunteers');
    if (csvRes.data.includes(testEmail)) {
      console.log('✅ CSV Exported successfully and contains test user.');
    } else {
      throw new Error("CSV Export failed or doesn't contain the user.");
    }

    console.log('\n🎉 ALL TESTS PASSED SUCCESSFULLY! The backend is working perfectly.');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ TEST FAILED:');
    if (error.response) {
      console.error(error.response.data);
      console.error('Status:', error.response.status);
    } else {
      console.error(error.message);
    }
    process.exit(1);
  }
}

runTests();
