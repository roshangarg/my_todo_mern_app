import { Box, Card, CardContent, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({workout}) => {
  const {  dispatch } = useWorkoutContext()
  const {user} = useAuthContext()
  const handleDelete = async (id) => {
    if(!user){
      return 
    }
    const response = await fetch('/api/workouts/'+ id, {
      method:'DELETE',
      headers:{
        'Authorization':`Bearer ${user.token}`
      }
    }) 

    if(response.ok) {
      dispatch({type:'DELETE_WORKOUT' , payload: workout })
    }

  }
  return (
    <div>
      <Box style={{width:'100%'}}>
        <Card style={{ margin: "1rem" }}>
          <CardHeader
            action={
              <IconButton onClick={() => handleDelete(workout._id)}  aria-label="Delete">
                <DeleteIcon style={{color:'#1aac83'}} />
              </IconButton>
            }
            title={workout.title}
            
            style={{color:'#1aac83'}}
          />
          <CardContent>
            <Typography variant="body1">
              <strong>Load (kg) :</strong> 
              {workout.load}
            </Typography>
            <Typography variant="body1">
              <strong>Reps :</strong> 
              {workout.reps}
            </Typography>
            <Typography variant="body1">
              <strong>Created At :</strong> 
              {workout.createdAt}
            </Typography>
          </CardContent>
       
        </Card>
      </Box>
    </div>
  );
};

export default WorkoutDetails;