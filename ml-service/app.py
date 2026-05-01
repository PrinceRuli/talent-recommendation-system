from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model
model = joblib.load('talent_model.pkl')

# 12 fitur dalam urutan yang sama seperti saat training
feature_names = ['Fisik','Tim','SeniVisual','Musik','Memasak','BelaDiri',
                 'Logika','Bahasa','Sains','Desain','Teknologi','Mekanik']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        # Ambil nilai untuk setiap fitur, default 0 jika tidak ada
        features = [data.get(f, 0) for f in feature_names]
        features = np.array(features).reshape(1, -1)
        
        prediction = model.predict(features)[0]
        proba = model.predict_proba(features)[0]
        scores = {model.classes_[i]: round(proba[i], 4) for i in range(len(model.classes_))}
        
        return jsonify({
            'recommendedTalent': prediction,
            'scores': scores
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(port=5001, debug=True)