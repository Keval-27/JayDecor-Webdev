import pandas as pd
import joblib
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier

# Load generated data (replace with your dataset if needed)
df = pd.read_csv(r"C:\Users\jaysi\Desktop\JayDecor WebDev\server\src\DataSets\style_dataset.csv")

# Encode categorical columns
label_encoders = {}
X = df.drop("style", axis=1)
y = df["style"]

for column in X.columns:
    le = LabelEncoder()
    X[column] = le.fit_transform(X[column])
    label_encoders[column] = le

# Encode target
style_encoder = LabelEncoder()
y = style_encoder.fit_transform(y)

# Train model
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X, y)

# Save model and encoders
joblib.dump(clf, "Model/style_model.pkl")
joblib.dump(label_encoders, "Model/encoders.pkl")
joblib.dump(style_encoder, "Model/style_encoder.pkl")

print("Model trained and saved successfully.")
