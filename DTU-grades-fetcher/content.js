(() => {
    let count_inserted_diem = 0;
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        (async function() {
            const sheetUrl = "https://docs.google.com/spreadsheets/d/1XGZrjzCv4i7wBPBWGMjnU1IQnzOQZc9tgWhN82pUIvQ/gviz/tq?tqx=out:json";
            try {
                
                const response = await fetch(sheetUrl);
                const text = await response.text();
                const json = JSON.parse(text.substring(47).slice(0, -2));  // loại bỏ đầu đuôi Google Sheet JSON
                const data = {};
                let tensv;
                json.table.rows.forEach(row => {
                    const mssv = row.c[1]?.v?.toString().trim();  // Cột A: MSSV
                    tensv = row.c[2]?.v?.toString().trim()+" "+row.c[3]?.v?.toString().trim();
                    const diem = parseFloat(row.c[request.job]?.v);                  
                    if (mssv) data[mssv] = diem.toFixed(2);
                    let index = findStudentIndex(mssv);
                    console.log("Điểm sinh viên " + tensv + " là:"+ diem);
                    setScoreByIndex(index, diem);
                });
                showToast("Đã cập nhật: " + count_inserted_diem, "success");
            } catch (error) {
                console.error("Lỗi tải dữ liệu:", error);
                alert("Không thể tải dữ liệu từ Google Sheet!");
            }
        })();
    });
    function findStudentIndex(studentID) {
        let rows = document.querySelectorAll("tr");
        for (let i = 0; i < rows.length; i++) {
            let tds = rows[i].querySelectorAll("td");
            if (tds.length > 1) { // đảm bảo có cột thứ 2
                let idText = tds[1].textContent.trim();
                if (idText === studentID) {
                    return i;  // Trả về index của <tr>
                }
            }
        }
        return -1;  // Không tìm thấy
    }
    function setScoreByIndex(index, newScore) {
        if (newScore === undefined || newScore === null || Number.isNaN(newScore)) {
            newScore = 0;
        }
        let rows = document.querySelectorAll("tr");
        if (index >= 0 && index < rows.length) {
            let tds = rows[index].querySelectorAll("td");
            if (tds.length > 6) {  // Đảm bảo có ô chứa input
                let input = tds[6].querySelector("input.txt");
                if (input) {
                    input.value = newScore.toFixed(2);  // Làm tròn 2 chữ số thập phân
                    input.dispatchEvent(new Event('change'));  // Kích hoạt sự kiện onchange
                    count_inserted_diem++;
                    // console.log(`Đã gán ${newScore.toFixed(2)} cho sinh viên ở index ${index}`);
                } else {
                    console.log("Không tìm thấy input có class 'txt' ở index này.");
                }
            }
        } else {
            console.log("Index không hợp lệ.");
        }
    }
    // Tạo khung chứa toast nếu chưa có
let toastContainer = document.createElement('div');
toastContainer.className = 'custom-toast-container';
document.body.appendChild(toastContainer);

// Hàm hiện Toast
function showToast(message="test", type = "info", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = `custom-toast ${type}`;
    toast.innerText = message;

    toastContainer.appendChild(toast);

    // Kích hoạt hiệu ứng hiện
    requestAnimationFrame(() => {
        toast.style.transform = "translateY(0)";
        toast.style.opacity = "1";
    });

    setTimeout(() => {
        // Khi đến lúc, nếu toast đang là đầu tiên thì mờ dần rồi xóa
        if (toast === toastContainer.firstChild) {
            toast.style.opacity = "0";
            toast.style.transform = "translateY(-20px)";
            toast.addEventListener("transitionend", () => toast.remove(), { once: true });
        } else {
            // Nếu không phải đầu tiên, tự động nhích lên
            toast.remove();
        }
    }, duration);
}

// CSS bổ sung
const toastStyle = document.createElement('style');
toastStyle.innerHTML = `
.custom-toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 9999;
}
.custom-toast {
    background: rgba(30, 30, 30, 0.9);
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    opacity: 0;
    transform: translateY(-20px);
    transition: all 0.5s ease;
    max-width: 300px;
    word-wrap: break-word;
}
.custom-toast.success { background: #28a745; }
.custom-toast.error { background: #dc3545; }
.custom-toast.info { background: #17a2b8; }
.custom-toast.warning { background: #ffc107; color: black; }
`;
document.head.appendChild(toastStyle);


})();