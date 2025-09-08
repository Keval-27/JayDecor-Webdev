from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd  # import pandas for DataFrame

app = Flask(__name__)
CORS(app)

model = joblib.load("../ML_Model/Model/style_model.pkl")
label_encoders = joblib.load("../ML_Model/Model/encoders.pkl")
style_encoder = joblib.load("../ML_Model/Model/style_encoder.pkl")

feature_names = ["color", "furniture", "vibe", "space", "material"]

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    print("Received data:", data)

    try:
        features = []
        for feature in feature_names:
            value = data.get(feature)
            if value not in label_encoders[feature].classes_:
                return jsonify({"error": f"Invalid value '{value}' for feature '{feature}'"}), 400
            encoded_value = label_encoders[feature].transform([value])[0]
            features.append(encoded_value)

        # Create DataFrame with single row and named columns
        df = pd.DataFrame([features], columns=feature_names)

        prediction_encoded = model.predict(df)[0]
        predicted_style = style_encoder.inverse_transform([prediction_encoded])[0]

        return jsonify({"style": predicted_style})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
