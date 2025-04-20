#!/bin/bash

count=0

echo "===== BẮT ĐẦU KIỂM TRA CÁC FILE C++ TRONG THƯ MỤC ====="

for file in *.cpp; do
    name=$(basename "$file" .cpp)
    echo "-----------------------------------------"
    echo "🔨 Biên dịch file: $file"

    g++ "$file" -o "$name"
    
    if [ $? -ne 0 ]; then
        echo "❌ Biên dịch thất bại cho $file!"
        continue
    fi

    echo "🚀 Chạy chương trình: $name"
    ./"$name" < input.txt > output_thucte.txt

    echo "📜 So sánh output với chuẩn mẫu..."
    
    diff expected_output.txt output_thucte.txt > ketqua_diff.txt

    if [ $? -eq 0 ]; then
        echo "✅ $file — Kết quả chính xác!"
    else
        echo "❌ $file — Kết quả KHÔNG khớp!"
        echo "📌 Chi tiết khác biệt:"
        cat ketqua_diff.txt
    fi

    ((count++))
done

echo "========================================="
echo "🎯 Đã kiểm tra xong $count file C++."
echo "Ấn Ctrl + C để kết thúc nếu muốn dừng sớm."
