import { useContext } from "react"
import { WorkoutsContext } from "../context/workoutContext"

export const useWorkoutContext = () => {
 const context = useContext(WorkoutsContext)

 if(!context) {
    throw Error('useWorkoutContext must be inside an WorkoutsContextProvider')
 }

 return context
}