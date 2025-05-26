from flask import Flask, render_template, request, jsonify
import whisper
import os

app = Flask(__name__)
model = whisper.load_model("tiny")  # Sử dụng model nhỏ để nhanh hơn

# Đảm bảo thư mục lưu file tạm
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/transcribe", methods=["POST"])
def transcribe():
    if "audio" not in request.files:
        return jsonify({"error": "No audio file provided"}), 400
    
    audio = request.files["audio"]
    filename = os.path.join(app.config['UPLOAD_FOLDER'], audio.filename)
    audio.save(filename)

    # Nếu là audio (MP3, WAV, FLAC...) thì dùng Whisper để transcribe
    if filename.endswith(('mp3', 'wav', 'flac')):
        result = model.transcribe(filename, language='vi')  # Thêm tham số language='vi' để nhận diện tiếng Việt
    else:
        # Xử lý video (chỉ có thể lấy âm thanh từ video)
        result = model.transcribe(filename, language='vi')  # Thêm tham số language='vi' để nhận diện tiếng Việt

    os.remove(filename)  # Xoá file sau khi xử lý

    return jsonify({
        "text": result["text"],
        "language": result["language"]
    })

if __name__ == "__main__":
    app.run(debug=False, port=5001)
