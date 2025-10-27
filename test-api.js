// // Simple API test script
// const axios = require('axios');

// const API_BASE_URL = 'http://localhost:4000/api';

// async function testAPI() {
//     console.log('🧪 Testing API Connection...');
//     console.log(`📡 API Base URL: ${API_BASE_URL}`);
    
//     try {
//         // Test basic server response
//         console.log('\n1️⃣ Testing server root endpoint...');
//         const rootResponse = await axios.get('http://localhost:4000');
//         console.log('✅ Server root response:', rootResponse.data);
        
//         // Test todolist endpoint
//         console.log('\n2️⃣ Testing todolist endpoint...');
//         const todoResponse = await axios.get(`${API_BASE_URL}/todolist`);
//         console.log('✅ Todolist response:', todoResponse.data);
        
//         console.log('\n🎉 All API tests passed!');
//     } catch (error) {
//         console.error('\n❌ API Test Failed:');
        
//         if (error.response) {
//             console.error('Server responded with error:', error.response.status, error.response.data);
//         } else if (error.request) {
//             console.error('No response received from server. Check if backend is running on port 4000');
//         } else {
//             console.error('Request setup error:', error.message);
//         }
        
//         console.error('\n🔍 Debug Info:');
//         console.error('- Backend should be running on: http://localhost:4000');
//         console.error('- API endpoint should be: http://localhost:4000/api/todolist');
//         console.error('- Make sure MongoDB connection is working');
//     }
// }

// testAPI();