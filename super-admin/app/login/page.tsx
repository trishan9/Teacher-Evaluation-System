"use client"
import LoginForm from "../_components/LoginForm"
import useGetLocalStorage from "@/components/hooks/useGetLocalStorage"

const admin:object = {
    username:'admin',
    password:'secret123'
}

export default function Login() {
    Object.freeze(admin)
    const login = useGetLocalStorage()
    console.log(login)
  return (
    <div className="h-[50vh] flex justify-center items-center font-primary">
         <LoginForm admin={admin} />  
    </div>
  )
}
