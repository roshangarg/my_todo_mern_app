import React, { useState } from 'react'
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Signup = () => {
    const [email , setEmail ] = useState('')
    const [password , setPassword] = useState('')
    const [error , setError ] = useState(null)
    const [isLoading , setIsLoading ] = useState(null)
    const {dispatch} = useAuthContext()
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        const response  = await fetch('/api/user/signup' , {
          method:'POST',
          headers:{
            'Content-Type' :'application/json'
            
        },
          body:JSON.stringify({email , password}),
          
        })

        const json = await response.json()

        if(!response.ok){
          setError(json.error)
          setIsLoading(false)

        }
        if(response.ok){
          // save the user to local storage 
          localStorage.setItem('user',JSON.stringify(json))
          dispatch({type:"LOGIN", payload:json})
          setIsLoading(false)
          setError(null)

        }
        
    }
  return (
    <div style={{ display:'flex',position:"relative",  width:'100%',alignContent:'center' , alignItems:"center" ,justifyContent:"center", height:'100vh'  }}>
       <Card style={{padding:"2rem" , borderRadius:"1rem" }} elevation={0}>
       <Typography variant='h5' style={{fontWeight:'900' ,  textAlign:'center' ,color:'#1aac83' }}>
          Signup 
        </Typography>
        <br />
        <form onSubmit={handleSubmit}>
        <TextField fullWidth label="Email" value={email} onChange={(e) => setEmail(e.target.value)} id="outlined-basic" type='email'   variant="outlined" /> <br /><br />
        <TextField fullWidth id="outlined-basic" type='password' label="Password" value={password} onChange={(e) => setPassword(e.target.value)}  variant="outlined" /><br /><br />
        <Button disabled={isLoading} disableElevation type='submit' style={{background:"#1aac83" , width:"100%" , }} variant="contained"  >
            Sign up 
        </Button>
        </form>
        <br />

        <Typography variant='h6' style={{color:"#1aac83" ,fontWeight:"900",  fontSize:'1rem'}} >
            Already have an account ?  <NavLink to='/login'>Login </NavLink>
        </Typography>
        <br />
        {error && <Typography variant='h6' color="error" width='100%' textAlign='center' fontWeight='900' marginTop='1rem'>{error}</Typography>}
        </Card>       
    </div>
  )
}

export default Signup