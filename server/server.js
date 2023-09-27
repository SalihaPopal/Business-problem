const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors")
const app = express();

const { Client } = require("pg");
require("dotenv").config();

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// Middleware to parse JSON request bodies
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

const db = new Client({
  port: process.env.DB_PORT,
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DBDATABASE_NAME,
  server_url: process.env.SERVER_URL,
  ssl: true
});

db.connect(function (err){
  if (err) {
    console.error(err);
  };
  console.log("Connected to the database");
});


app.get("/Users", function (req, res) {
  return db.query("SELECT * FROM Users")
    .then((result) => {
      res.status(200).json({ Users: result.rows });
    })
    .catch((err) => {
      console.log(err);
    });
})

app.get("/Sessions", (req, res) => {
  let claimedSession;

  // Find an available session and claim it
  db.query(
    "UPDATE Sessions SET Session_Status = 'Claimed' WHERE SessionID = (SELECT SessionID FROM Sessions WHERE Session_Status = 'Available' AND (Is_Morning = true OR Is_Evening = true) LIMIT 1) RETURNING *;"
  )
    .then((result) => {
    
      if (result.rows.length > 0) {
        claimedSession = result.rows[0];
        db.query("SELECT * FROM Users");
      } else {
        return Promise.reject("No available sessions to claim.");
      }
    })
    .then((userResult) => {
      res.status(200).json({
        Users: userResult.rows,
        ClaimedSession: claimedSession,
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred." });
    });
});


app.get("/Sessions/:id", async (req, res) => {
  try {
    const sessionId = req.params.id;

    // Retrieve the session by its ID
    const sessionResult = await db.query(
      "SELECT * FROM Sessions WHERE Session_id = $1",
      [sessionId]
    );

    if (sessionResult.rows.length === 0) {
      return res.status(404).json({ error: "Session not found" });
    }

    const session = sessionResult.rows[0];

    res.status(200).json({
      Session: session,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred." });
  }
});



app.put("/claimSession/:id", async (req, res) => {
  try {
    const sessionId = req.params.id;
    const volunteerId = req.user.id; // Assuming you have user authentication

    // Find the session by ID
    const session = await db.query(Session_id);

    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    if (session.claimedBy) {
      return res.status(400).json({ error: 'Session already claimed' });
    }

    session.claimedBy = volunteerId;
    await session.save();

    res.json({ message: 'Session claimed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


exports.getAllSessions = async (req, res) => {
  try {
    const Sessions = await db.query('SELECT * FROM sessions WHERE claimed_by IS NULL');
    return res.json(Sessions);
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

