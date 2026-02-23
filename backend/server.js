import 'dotenv/config';
import express from "express";
import axios from "axios";
import cors from "cors";
import bcrypt from "bcrypt";

const app = express();
app.use(cors()); // allow frontend requests
app.use(express.json());

const LAMBDA_URL=process.env.LAMBDA_URL
// Call SageMaker / Lambda endpoint

app.post("/", async (req, res) => {
  try {
    const data = { ...req.body };

    // 🔥 Convert ISO date → days
    const createdDate = new Date(data.AccountAgeDays);
    const today = new Date();

    const diffTime = today - createdDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Replace ISO string with number
    data.AccountAgeDays = diffDays;

    console.log("Sending to Lambda:", data);

    const response = await axios.post(
      "https://uae103szo3.execute-api.ap-southeast-2.amazonaws.com/predict",
      data
    );

    res.json(response.data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to call Lambda" });
  }
});
app.get("/transactions", async (req, res) => {
  try {
    const response = await axios.get(
      "https://eyy5j3rnsi.execute-api.ap-southeast-2.amazonaws.com/getdata"
    );
    console.log("Full response:", response.data);

    // Check if body exists, else use data directly
    let transactions;

    if (response.data.body) {
      transactions = JSON.parse(response.data.body); // normal Lambda response
    } else {
      transactions = response.data; // fallback in case body is missing
    }

    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});
app.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const updatedBody = {
      ...req.body,
      AccountAgeDays:new Date().toISOString()
    };
    

    const response = await axios.post(
      'https://rks0fjhbs6.execute-api.ap-southeast-2.amazonaws.com/signin',updatedBody);
    console.log(response)
    res.status(200).json(response.data);

  } catch (error) {
     console.log(error.response)
    res.status(error.response?.status || 500).json(
      error.response?.data || { error: "Something went wrong" }
    );
  }
});

// =========================
// LOGIN
// =========================
app.post("/login", async (req, res) => {
  try {
    console.log("Incoming from frontend:", req.body);

    const response = await axios.post(
      "https://rks0fjhbs6.execute-api.ap-southeast-2.amazonaws.com/login",
      req.body
    );

    console.log("Lambda responded:", response.data);

    res.status(200).json(response.data);

  } catch (error) {
    console.log("Lambda ERROR:", error.response?.data || error.message);

    res.status(error.response?.status || 500).json(
      error.response?.data || { error: "Something went wrong" }
    );
  }
});

// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
