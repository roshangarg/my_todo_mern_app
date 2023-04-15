import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutContext } from "../hooks/useWorkoutContext";






export default function WorkoutForm() {
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const {user} = useAuthContext()
  // const [emptyFields , setEmptyFields ] = useState([])

  const {dispatch} = useWorkoutContext()
//   const classes = useStyles()
  

  const handlesubmit = async (e) => {
    e.preventDefault();
    if(!user){
      setError("You must be logged in ")
      return
    }
    const workout = { title, load, reps };

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        'Authorization':`Bearer ${user.token}`
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      // setEmptyFields(json.emptyList)
    }
    if (response.ok) {
      setError(null);
      setTitle("");
      setLoad("");
      setReps("");
      // setEmptyFields([])
      dispatch({type: "CREATE_WORKOUT" , payload: json})
    }
  };
  return (
    <div style={{ }}>
      <div
        style={{
          marginTop: "1rem",
          textAlign: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            variant="h6"
            style={{ color: "#1aac83", fontWeight: "900" }}
          >
            {" "}
            Add a new workout{" "}
          </Typography>
        </Box>
        <form onSubmit={handlesubmit}>
          <TextField
            id="outlined-basic"
            label="Title"
           style={{ marginTop:"1rem"}}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="outlined"
            fullWidth
            
            required

          />
          <TextField
            id="outlined-basic"
            label="Load"
            style={{ marginTop:"1rem"}}
            value={load}
            onChange={(e) => setLoad(e.target.value)}
            variant="outlined"
            fullWidth
            required
          />
          <TextField
            id="outlined-basic"
            label="Reps"
            style={{ marginTop:"1rem"}}
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            variant="outlined"
            fullWidth
            
            required
          />
          <Button
            type="submit"
            style={{ marginTop: "1rem", background: "#1aac83" }}
            variant="contained"
          >
            Add a new Workout
          </Button>
        </form>
        {error && (
          <div
            style={{
              marginTop: "2rem",
              border: "1px solid red ",
              padding: "1rem",
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}