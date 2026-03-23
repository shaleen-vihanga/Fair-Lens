import os
import json
import joblib
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify

app = Flask(__name__)

# 1. Load Assets
ASSET_DIR = 'fairlens_assets'
model_path = os.path.join(ASSET_DIR, 'rf_model.pkl')
config_path = os.path.join(ASSET_DIR, 'fairlens_deploy_config.json')

model = joblib.load(model_path)
with open(config_path, 'r') as f:
    config = json.load(f)

# Extract configuration metadata
BASE_THRESH = config['best_threshold']
RL_THRESHOLDS = config['rl_thresholds']  # Format: "attr|group_code": threshold
FEATURE_COLS = config['feature_cols']
PROTECTED_ATTRS = config['protected_attrs']

def preprocess_input(data):
    """Convert JSON input to DataFrame and generate derived features."""
    df = pd.DataFrame([data])
    
    # Generate derived features if missing
    if 'age_glucose' not in df.columns:
        df['age_glucose'] = df['age'] * df['avg_glucose_level']
    if 'age_bmi' not in df.columns:
        df['age_bmi'] = df['age'] * df['bmi']
    if 'hypert_heart' not in df.columns:
        df['hypert_heart'] = df['hypertension'] * df['heart_disease']
    if 'age_hypert' not in df.columns:
        df['age_hypert'] = df['age'] * df['hypertension']
    if 'glucose_bmi' not in df.columns:
        df['glucose_bmi'] = df['avg_glucose_level'] * df['bmi']
        
    return df[FEATURE_COLS]

@app.route('/predict', methods=['POST'])
def predict():
    try:
        input_data = request.get_json()
        if not input_data:
            return jsonify({'error': 'No input data provided'}), 400

        # Preprocess and get probability
        X = preprocess_input(input_data)
        proba = float(model.predict_proba(X)[0, 1])

        # 2. Implement 'Strictest Wins' Logic
        # Start with the base threshold
        final_threshold = BASE_THRESH

        # Check each protected attribute to find the minimum (strictest) threshold
        for attr in PROTECTED_ATTRS:
            if attr in input_data:
                group_val = input_data[attr]
                key = f"{attr}|{group_val}"
                
                # If this specific group has an RL-learned threshold, consider it
                if key in RL_THRESHOLDS:
                    group_threshold = RL_THRESHOLDS[key]
                    final_threshold = min(final_threshold, group_threshold)

        # 3. Final Prediction
        prediction = 1 if proba >= final_threshold else 0

        return jsonify({
            'stroke_probability': round(proba, 4),
            'applied_threshold': round(final_threshold, 4),
            'prediction': prediction,
            'status': 'success'
        })

    except Exception as e:
        return jsonify({'error': str(e), 'status': 'error'}), 500

if __name__ == '__main__':
    # In production, use a WSGI server like Gunicorn
    app.run(host='0.0.0.0', port=5000)
