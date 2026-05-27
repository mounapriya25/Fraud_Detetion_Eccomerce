
import json
import boto3
import uuid
from datetime import datetime

dynamodb = boto3.client('dynamodb')
runtime = boto3.client('sagemaker-runtime')

ENDPOINT_NAME = "rf-custom-sklearn-2026-02-14-03-36-03-278"
USER_TABLE = "UserData"
TRANSACTION_TABLE = "Transactions"


def lambda_handler(event, context):
    try:
        body = json.loads(event['body']) if 'body' in event else event

        userid = body['userid']

        # ===============================
        # 🔹 USER DATA FROM FRONTEND
        # ===============================

        customer_age = float(body['CustomerAge'])
        sex_m = float(body['sex_M'])

        # ✅ Already converted to days by Node backend
        account_age_days = float(body['AccountAgeDays'])

        previous_avg = float(body.get('avg_transaction_amount', 0))
        previous_fraud_count = int(body.get('previous_fraud_count', 0))

        # ===============================
        # 🔹 TRANSACTION DATA
        # ===============================

        Transaction_Amount = float(body['Transaction.Amount'])
        Transaction_Hour = int(body['Transaction.Hour'])
        Quantity = int(body['Quantity'])
        Address_Match = int(body['Address.Match'])
        Trans_Year = int(body['Trans_Year'])
        Trans_Month = int(body['Trans_Month'])
        Trans_Day = int(body['Trans_Day'])
        Trans_DayOfWeek = int(body['Trans_DayOfWeek'])

        # ===============================
        # 🔹 ONE HOT ENCODING
        # ===============================

        source_Direct = body['source'] == "Direct"
        source_SEO = body['source'] == "SEO"

        browser_FireFox = body['browser'] == "FireFox"
        browser_IE = body['browser'] == "IE"
        browser_Opera = body['browser'] == "Opera"
        browser_Safari = body['browser'] == "Safari"

        payment_bank = body['Payment.Method'] == "bank transfer"
        payment_credit = body['Payment.Method'] == "credit card"
        payment_debit = body['Payment.Method'] == "debit card"

        product_electronics = body['Product.Category'] == "electronics"
        product_health = body['Product.Category'] == "health & beauty"
        product_home = body['Product.Category'] == "home & garden"
        product_toys = body['Product.Category'] == "toys & games"

        device_mobile = body['Device.Used'] == "mobile"
        device_tablet = body['Device.Used'] == "tablet"

        # ===============================
        # 🔹 MODEL INPUT
        # ===============================

        model_input = [
            Transaction_Amount,
            customer_age,
            account_age_days,
            Transaction_Hour,
            Quantity,
            Address_Match,
            Trans_Year,
            Trans_Month,
            Trans_Day,
            Trans_DayOfWeek,
            source_Direct,
            source_SEO,
            browser_FireFox,
            browser_IE,
            browser_Opera,
            browser_Safari,
            sex_m,
            payment_bank,
            payment_credit,
            payment_debit,
            product_electronics,
            product_health,
            product_home,
            product_toys,
            device_mobile,
            device_tablet
        ]

        # ===============================
        # 🔹 CALL SAGEMAKER
        # ===============================

        sm_response = runtime.invoke_endpoint(
            EndpointName=ENDPOINT_NAME,
            ContentType='application/json',
            Body=json.dumps([model_input])
        )

        result = json.loads(sm_response['Body'].read().decode())
        prediction = int(result[0])

        # ===============================
        # 🔹 UPDATE USER STATS
        # ===============================

        new_avg = (previous_avg + Transaction_Amount) / 2
        new_fraud_count = previous_fraud_count + 1 if prediction == 1 else previous_fraud_count

        dynamodb.update_item(
            TableName=USER_TABLE,
            Key={'userid': {'S': userid}},
            UpdateExpression="""
                SET avg_transaction_amount = :avg,
                    previous_fraud_count = :fraud,
                    AccountAgeDays = :age
            """,
            ExpressionAttributeValues={
                ':avg': {'N': str(new_avg)},
                ':fraud': {'N': str(new_fraud_count)},
                ':age': {'N': str(account_age_days)}
            }
        )

        # ===============================
        # 🔹 STORE TRANSACTION
        # ===============================

        transaction_id = str(uuid.uuid4())

        dynamodb.put_item(
            TableName=TRANSACTION_TABLE,
            Item={
                'Transactions': {'S': transaction_id},
                'UserId': {'S': userid},
                'Amount': {'N': str(Transaction_Amount)},
                'Quantity': {'N': str(Quantity)},
                'TransactionDate': {'S': datetime.utcnow().isoformat()},
                'PaymentMethod': {'S': body['Payment.Method']},
                'ProductCategory': {'S': body['Product.Category']},
                'Browser': {'S': body['browser']},
                'DeviceUsed': {'S': body['Device.Used']},
                'Source': {'S': body['source']},
                'Fraud': {'N': str(prediction)},
                'TransactionStatus': {'S': "Flagged" if prediction == 1 else "Safe"}
            }
        )

        return {
            "statusCode": 200,
            "body": json.dumps({
                "prediction": prediction,
                "message": "Fraud detected" if prediction == 1 else "Transaction safe",
                "transaction_id": transaction_id
            })
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
