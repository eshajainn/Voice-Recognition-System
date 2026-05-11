from flask import Flask, render_template, request, jsonify
import speech_recognition as sr
import os

app = Flask(__name__)

UPLOAD_FOLDER = "uploads"

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route("/")
def index():
    return render_template("index.html")


# SPEECH TO TEXT
@app.route("/transcribe", methods=["POST"])
def transcribe():

    file = request.files["audio"]
    language = request.form.get("language")

    filepath = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(filepath)

    recognizer = sr.Recognizer()

    with sr.AudioFile(filepath) as source:
        audio = recognizer.record(source)

    try:
        text = recognizer.recognize_google(audio, language=language)
    except:
        text = "Could not understand audio"

    return jsonify({"text": text})


if __name__ == "__main__":
    app.run(debug=True)