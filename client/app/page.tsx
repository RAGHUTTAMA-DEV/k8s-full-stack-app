"use client";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
export default function Home() {
  const [users, setUsers] = React.useState<Array<{id:number;name:string}>>([]);
  const [error,setError] =React.useState<string |null>(null);
  const [loading,setLoading] =React.useState<boolean>(false);
  const [name,setName] =React.useState<string>("");
  useEffect(()=>{
   fetchUsers();
  },[]);

  const fetchUsers = async ()=>{
    try{
      setLoading(true);
      const response =await axios.get("/users");
      setUsers(response.data);
      setLoading(false);
      
    }catch(err){
      console.error("Error fetching users:", err);
      setError("Failed to fetch users");
      setLoading(false);
    }
  }

  const addUser = async ()=>{
    try{
      setLoading(true);
      const response = await axios.post("/users",{
        name: name
      });
      setUsers([...users,response.data]);
      setLoading(false);
 
    }catch(err){
      console.error("Error adding user:", err);
      setError("Failed to add user");
      setLoading(false);
    }
  }
  return (
<div className="w-full h-full bg-blue-400">
  <h1>Heloo this is shiitty frtend for shitty backend</h1>
  <input type="text" placeholder="Enter name" className="p-2 m-2" onChange={(e) => setName(e.target.value)} value={name} />
  <button className="p-2 m-2 bg-green-500 text-white" onClick={addUser}>Add User</button>
  {loading && <p>Loading...</p>}
  {error && <p className="text-red-500">{error}</p>}
  <ul>
    {users.map((user,index) => (
      <li key={index}>{user.name}</li>
    ))}
  </ul>
</div> 

);
}
