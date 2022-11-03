from flask import Flask
app = Flask(__name__)

@app.route('/', methods=["GET"])
def first_call():
  print("nan")
  return "bruh"
  