
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuthContext } from '../hooks/useAuthContext';
import { useWorkoutContext } from '../hooks/useWorkoutContext';



const Navbar = () => {
  const { user , dispatch } = useAuthContext()
  const { dispatch :workoutDispatch} = useWorkoutContext()
  const handleLogout =() => {
    localStorage.removeItem('user')
    dispatch({type:'LOGOUT'})
    workoutDispatch({type:'SET_WORKOUTS' , payload:null})
  }
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar elevation={0} position="static">
          <Toolbar
            style={{ padding: "0.5rem 0.5rem", background: "white" }}
            variant="dense"
          >
            <Typography variant="h6" style={{ color: "green" ,fontWeight:'900' , fontSize:13 }} component="div" sx={{ flexGrow: 1 }}>
              Workout Buddy
            </Typography>
            {user && <Typography style={{color:'green' ,  marginRight:"0.5rem", fontWeight:"900"}} >{user.email}</Typography>}
            
            <Button style={{color:'green' ,  borderColor:'green' , fontWeight:"900"}} variant='outlined' onClick ={handleLogout}>Logout </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Navbar;
