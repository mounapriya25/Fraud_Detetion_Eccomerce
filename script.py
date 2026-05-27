# train_notebook_runner.py
import argparse
import os
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import confusion_matrix, classification_report
import joblib

# 1️⃣ Parse hyperparameters
parser = argparse.ArgumentParser()
parser.add_argument("--n_estimators", type=int, default=100)
parser.add_argument("--random_state", type=int, default=42)
args = parser.parse_args()

'''# 2️⃣ Read input channels
train_dir = os.environ.get("SM_CHANNEL_TRAIN", "/opt/ml/input/data")
test_dir  = os.environ.get("SM_CHANNEL_TEST", "/opt/ml/input/data")

train_path = os.path.join(train_dir, "train_preprocessed.csv")
test_path  = os.path.join(test_dir, "test_preprocessed.csv")'''

train_dir = os.environ["SM_CHANNEL_TRAIN"]
test_dir  = os.environ["SM_CHANNEL_TEST"]

train_path = os.path.join(train_dir, "train_preprocessed.csv")
test_path  = os.path.join(test_dir, "test_preprocessed.csv")


train_df = pd.read_csv(train_path)
test_df  = pd.read_csv(test_path)

# 3️⃣ Split features and target
X_train = train_df.drop("Is.Fraudulent", axis=1)
y_train = train_df["Is.Fraudulent"]

X_test = test_df.drop("Is.Fraudulent", axis=1)
y_test = test_df["Is.Fraudulent"]

# 4️⃣ Train RandomForest
model = RandomForestClassifier(
    n_estimators=args.n_estimators,
    random_state=args.random_state,
    n_jobs=-1
)
model.fit(X_train, y_train)

# 5️⃣ Evaluate
y_pred = model.predict(X_test)
print("Confusion Matrix:")
print(confusion_matrix(y_test, y_pred))
print("\nClassification Report:")
print(classification_report(y_test, y_pred, digits=4))

# 6️⃣ Save model to SageMaker model directory
model_dir = os.environ.get("SM_MODEL_DIR", "/opt/ml/model")
joblib.dump(model, os.path.join(model_dir, "rf_model.joblib"))
