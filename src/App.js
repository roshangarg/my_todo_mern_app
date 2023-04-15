import {  Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import Layout from './Layout/Layout';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';



// const router = createBrowserRouter(
//   createRoutesFromElements(
  
//     <Route>
      
//       <Route  path='/login' element={<Login/>}/>
//       <Route path='/signup' element={<Signup/>}/>
  
//     <Route path='/' element={<Layout/>}>
//         <Route index element={<Home/>}/>
//     </Route>
//   </Route>
    
//   )
// )

function App() {
  const {user} = useAuthContext()
  console.log(user)
  return (
<BrowserRouter>
     <Routes>
     <Route  path='/login' element={!user ? <Login/> : <Navigate to='/'/> }/>
     <Route path='/signup' element={!user ? <Signup/>   : <Navigate to='/'/> }/>
      <Route path='/' element={user ? <Layout/> : <Navigate to='/login'/>}>
         <Route index element={<Home/>}/>
     </Route>
     </Routes>
</BrowserRouter>
   
  );
}

export default App;
