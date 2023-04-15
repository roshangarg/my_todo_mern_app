
import { createContext , useReducer  , useEffect} from 'react'

export const AuthContext  = createContext()

const authReducer = (state , action ) => {
    switch(action.type){
        case "LOGIN" :
            return { user : action.payload}
        case "LOGOUT":
            return null
        default :
            return state
    }
}

export const AuthContectProvider = ({children}) => {
 const [state , dispatch] = useReducer(authReducer , {
    user: null 
 })

 useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if(user){
        dispatch({type:'LOGIN' , payload:user})
    }
 
  
   
 }, [])
 
 console.log("Auth " , state )

 return (
    <AuthContext.Provider value={{...state , dispatch}} >
        {children}
    </AuthContext.Provider>
 )
}

