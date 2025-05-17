import React, { useEffect, useState } from 'react'
import "./App.css";
import Dashboard from './components/Dashboard';
// import { Outlet } from 'react-router-dom';

const App = () => {

  const SERVER_URL = 'http://localhost:8080/user'
  
  
  useEffect(() => {
    fetchAllUser();
  }, [])



  const [userArray, setUserArray] = useState([{name:"", age:"", doj:"", dob:"", mobile:"", address:"", city:"", state:"", country:""}]);

 

  const fetchAllUser = async () => {
    try{
      setIsLoading(true);
      const response =await fetch(SERVER_URL)
      const result = await  response.json();
      setUserArray(() =>(
        [
          ...result
        ]
      ))
      setIsLoading(false);
    }catch(err){
      setIsLoading(false);
      alert("some error occured while creating NEW user"+JSON.stringify(err));
    }
  }
 
  return (
    <>
      <Dashboard></Dashboard>
    </>
    // <div className='container mx-auto'>
    //   <main >
    //     <div className='mainDiv'>

    //       <div className='box'>
            
            
    //       </div>
         
    //     </div>
    //     <hr className='my-4' />
    //     {/* {
    //       !isLoading ? <table border={2}>
    //       <thead>
    //         <tr>
    //           <th>Id</th>
    //           <th>Name</th>
    //           <th>Date of Birth</th>
    //           <th>Date of joining</th>
    //           <th>Address</th>
    //           <th>Age</th>
    //           <th>Mobile</th>
    //           <th>City</th>
    //           <th>State</th>
    //           <th>Country</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {
    //           userArray.map((elem, index)=>{
    //             return <tr key={index}>
    //             <td>{elem.id}</td>
    //             <td>{elem.name}</td>
    //             <td>{elem.dob}</td>
    //             <td>{elem.doj}</td>
    //             <td>{elem.address}</td>
    //             <td>{elem.age}</td>
    //             <td>{elem.mobile}</td>
    //             <td>{elem.city}</td>
    //             <td>{elem.state}</td>
    //             <td>{elem.country}</td>
    //           </tr>
    //           })
    //         }
    //       </tbody>
    //     </table> : <BiLoaderAlt />
    //     } */}
        
    //   </main>
    // </div>
  )
}

export default App