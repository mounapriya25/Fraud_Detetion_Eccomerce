
import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors()); // allow frontend requests
app.use(express.json());


// Call SageMaker / Lambda endpoint
app.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const response = await axios.post(
      "https://uae103szo3.execute-api.ap-southeast-2.amazonaws.com/predict",
      req.body
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


// Start server
app.listen(5000, () => console.log("Server running on port 5000"));
