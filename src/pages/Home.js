import { Container, Grid  } from "@mui/material";
import React, { useEffect, } from "react";

import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import {useAuthContext}from "../hooks/useAuthContext"

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const {user} = useAuthContext()
  
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        method: "GET",
        headers:{
          'Authorization':`Bearer ${user.token}`
        }
      });

      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: data });
      }
    };
    if(user){
      fetchWorkouts();
    }
    
  }, [dispatch , user]);

  return (
    <div style={{ }}>
         <Container>

         
        <Grid  container spacing={2}>
          <Grid item md={8} sm={12}>
            {workouts &&
              workouts.map((workout) => (
                <WorkoutDetails key={workout._id} workout={workout} />
              ))}
          </Grid>
          <Grid item md={4} sm={12}>
            <WorkoutForm />
          </Grid>
        </Grid>
        </Container>
      
    </div>
  );
};

export default Home;
