# train.py

import os
import argparse
import pandas as pd
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix

# SageMaker directories
TRAIN_DIR = "/opt/ml/input/data/train"
TEST_DIR = "/opt/ml/input/data/test"
MODEL_DIR = "/opt/ml/model"

def model_fn(model_dir):
    """Load model for inference"""
    return joblib.load(os.path.join(model_dir, "model.joblib"))

if __name__ == "__main__":

    parser = argparse.ArgumentParser()

    parser.add_argument("--n_estimators", type=int, default=100)
    parser.add_argument("--random_state", type=int, default=42)

    args = parser.parse_args()

    # Load training data
    train_path = os.path.join(TRAIN_DIR, "train_preprocessed.csv")
    test_path = os.path.join(TEST_DIR, "test_preprocessed.csv")

    train_df = pd.read_csv(train_path)
    test_df = pd.read_csv(test_path)

    X_train = train_df.drop("Is.Fraudulent", axis=1)
    y_train = train_df["Is.Fraudulent"]

    X_test = test_df.drop("Is.Fraudulent", axis=1)
    y_test = test_df["Is.Fraudulent"]

    # Train model
    model = RandomForestClassifier(
        n_estimators=args.n_estimators,
        random_state=args.random_state,
        n_jobs=-1
    )

    model.fit(X_train, y_train)

    # Evaluate
    y_pred = model.predict(X_test)

    print("Confusion Matrix:")
    print(confusion_matrix(y_test, y_pred))

    print("\nClassification Report:")
    print(classification_report(y_test, y_pred))

    # Save model
    joblib.dump(model, os.path.join(MODEL_DIR, "model.joblib"))
