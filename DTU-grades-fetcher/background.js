// background.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getGrades') {
      let studentId = request.studentId;
      // Lấy dữ liệu từ Google Sheets (sử dụng API Google Sheets)
      fetch(`https://sheets.googleapis.com/v4/spreadsheets/1XGZrjzCv4i7wBPBWGMjnU1IQnzOQZc9tgWhN82pUIvQ/values/Sheet1?majorDimension=ROWS`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer YOUR_ACCESS_TOKEN`
        }
      })
      .then(response => response.json())
      .then(data => {
        let grades = data.values.find(row => row[0] === studentId); // Giả sử mã số sinh viên là cột đầu tiên
        sendResponse({ grades: grades ? grades[1] : null }); // Giả sử điểm nằm ở cột thứ hai
      })
      .catch(error => {
        console.error(error);
        sendResponse({ grades: null });
      });
      return true; // Giữ kênh trả lời mở
    }
  });
  