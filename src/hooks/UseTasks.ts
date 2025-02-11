import { useContext } from "react"
import { TasksContext } from "../context/TaskContext"

export const useTasks = () => {
    return useContext(TasksContext)
}