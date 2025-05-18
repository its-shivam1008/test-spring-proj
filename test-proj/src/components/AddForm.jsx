import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';

const AddForm = () => {

    const [changeValue, setChangeValue] = useState({name:"", age:"", doj:"", dob:"", mobile:"", address:"", city:"", state:"", country:"", designation:"", salary:""});
    const [isLoading, setIsLoading] = useState(false);

    const [isLoadingPlace, setIsLoadingPlace] = useState(false);
    const [isLock, setIsLock] = useState(false)

    const handleFindUser = async () => {
        try{
        const response = await fetch(SERVER_URL+`/${changeValue.name}/${changeValue.dob}`);
        const result = await response.json();
        console.log(result);
        setChangeValue(() =>  ({
            ...result
        }));
        setIsLock(true)
        }catch(err){
        alert("some error occured while fetching this employee user"+JSON.stringify(err));
        }
    }

    const handleSaveUser = async () => {
        try{
          const response = await fetch(SERVER_URL+`/${changeValue.name}/${changeValue.dob}`, {
            method:"PUT",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(changeValue)
          });
          await fetchAllUser();
          setChangeValue({name:"", age:"", doj:"", dob:"", mobile:"", address:"", city:"", state:"", country:""})
        }catch(err){
          alert("some error occured while UPDATING user"+JSON.stringify(err));
        }
      }
    
    const handleDeleteUser = async () => {
    try{
        const response = await fetch(SERVER_URL+`/${changeValue.name}/${changeValue.dob}`,{
        method:"DELETE"
        })
        await fetchAllUser();
    }catch(err){
        alert("some error occured while DELETING user"+JSON.stringify(err));
    }
    }

    const  handleEditUser = () => {
    setIsLock(false);
    }

    const handleChannge = (event) => {
        const {name, value} = event.target
        if(changeValue.city == "Kanpur" || changeValue.city == "Agra"){
          
          setChangeValue((prev) => (
            {
              ...prev,
              [name]:value,
              country:"India",
              age:(new Date().getFullYear() - new Date(changeValue.dob).getFullYear()),
              state:"Uttar Pradesh"
            }
          ))
          setIsLoadingPlace(false)  
          // console.log(changeValue)
        }else
        if(changeValue.city == "Surat"){
          // setIsLoadingPlace(true)
          setChangeValue((prev) => (
            {
              ...prev,
              [name]:value,
              country:"India",
              age:(new Date().getFullYear() - new Date(changeValue.dob).getFullYear()),
              state:"Gujarat"
            }
          ))
          setIsLoadingPlace(false)
        }else
        if(changeValue.city == "Jhansi"){
          // setIsLoadingPlace(true);
          setChangeValue((prev) => (
            {
              ...prev,
              [name]:value,
              country:"India",
              age:(new Date().getFullYear() - new Date(changeValue.dob).getFullYear()),
              state:"Madhya Pradesh"
            }
          ))
          setIsLoadingPlace(false)
        }else{
          setChangeValue((prev) => (
            {
              ...prev,
              [name]:value,
              country:"India",
              age:(new Date().getFullYear() - new Date(changeValue.dob).getFullYear()),
            }
          ))
    
        }
        
      }

      const SERVER_URL = 'http://localhost:8080/user'
    
      const handelSubmit = async (event) => {
        event.preventDefault;
        try{
          console.log(changeValue)
          alert(JSON.stringify(changeValue));
          const response =await fetch(SERVER_URL, {
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(changeValue)
          })
          const result = await  response.json();
          console.log(result)
          alert(JSON.stringify(result))
        }catch(err){
          setIsLoading(false);
          alert("some error occured while creating NEW user"+JSON.stringify(err));
        }
      }

  return (
    <div>
        <form action={handelSubmit} className='space-y-4'>
                <div className="space-x-4">
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="name">Name </label>
                  <input type="text" name="name" id="name" className='w-50 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500'  disabled={isLock} onChange={handleChannge} value={changeValue.name} placeholder='Sachin'/>
                </div>
                <div className="space-x-4">
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="name">Designation </label>
                  <input type="text" name="designation" id="designation" className='w-50 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500'  disabled={isLock} onChange={handleChannge} value={changeValue.designation} placeholder='CTO'/>
                </div>
                <div className="space-x-4">
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="name">Salary </label>
                  <input type="text" name="salary" id="salary" className='w-50 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500'  disabled={isLock} onChange={handleChannge} value={changeValue.salary} placeholder='205020'/>
                </div>
                <div className="space-x-4">
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="dob">Date of birth </label>
                  <input type="date" name="dob" id="dob" className='w-50 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500' disabled={isLock} onChange={handleChannge} value={changeValue.dob}/>
                </div>
                <div className="space-x-4">
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="age">Age </label>
                  <input type="number" name="age" id="age" disabled={true} className='w-12 pl-3 py-2 text-center rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500'  value={changeValue.age}/>
                </div>
                  <div className="space-x-4">
                    <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="doj">Date of joining </label>
                    <input type="date" name="doj" id="doj" className='w-50 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500' disabled={isLock} onChange={handleChannge} value={changeValue.doj}/>
                  </div>
                  <div className="space-x-4">
                    <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="mobile">Mobile </label>
                    <input type="text" name="mobile" id="mobile" className='w-50 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500' maxLength={10} disabled={isLock} onChange={handleChannge} value={changeValue.mobile}/>
                  </div>
                <div className="space-x-4">
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="address">Address </label>
                  <input type="text" name="address" id="address" className='w-50 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500' maxLength={100} disabled={isLock} onChange={handleChannge} value={changeValue.address}/>
                </div>
                <div className="space-x-4">
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="city">City </label>
                  <select onChange={handleChannge} value={changeValue.city} name="city" id="city" disabled={isLock} className='w-fit p-2  text-gray-600 text-center rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500'>
                    <option value="">Select a city</option>
                    <option onChange={handleChannge} onClick={() => setIsLoadingPlace(true)} value="Kanpur">Kanpur</option>
                    <option onChange={handleChannge} onClick={() => setIsLoadingPlace(true)} value="Agra">Agra</option>
                    <option onChange={handleChannge} onClick={() => setIsLoadingPlace(true)} value="Surat">Surat</option>
                    <option onChange={handleChannge} onClick={() => setIsLoadingPlace(true)} value="Jhansi">Jhansi</option>
                  </select>
                  {/* <input type="text" name="city" id="city" className='w-50 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500' disabled={isLock} onChange={handleChannge} value={changeValue.city}/> */}
                </div>
                  <div className="space-x-4">
                    <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="state">State </label>
                    {isLoadingPlace ? <BiLoaderAlt /> : <input type="text" name="state" id="state" className='w-50 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-amber-500 placeholder:text-gray-500' disabled={isLock} onChange={handleChannge} value={changeValue.state}/>}
                  </div>
                  <div className="space-x-4">
                    <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="state">Country </label>
                    <input type="text" name="state" id="state" className='w-50 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-amber-500 placeholder:text-gray-500' value={"India"}/>
                  </div>
                <Button className='hover:bg-gray-100/50 cursor-pointer transition-colors duration-200 hover:border-black border shadow-lg shadow-orange-200 border-transparent hover:text-black' type="submit" >Add Employee</Button>
              
              <div className='hidden'>
                {/* <Button className='hover:bg-gray-100/50 cursor-pointer transition-colors duration-200 hover:border-black border shadow-lg shadow-orange-200 border-transparent hover:text-black' type="button" variant="secondary" onClick={handleEditUser}>Edit</Button>
                <Button className='hover:bg-gray-100/50 cursor-pointer transition-colors duration-200 hover:border-black border shadow-lg shadow-orange-200 border-transparent hover:text-black' type="button" variant="secondary" onClick={handleFindUser}>Find</Button>
                <Button className='hover:bg-gray-100/50 cursor-pointer transition-colors duration-200 hover:border-red-500 border shadow-lg shadow-orange-200 border-transparent hover:text-red-500' variant={'destructive'} type="button" onClick={handleDeleteUser}>Delete</Button>
                <Button className='hover:bg-gray-100/50 cursor-pointer transition-colors duration-200 hover:border-black border shadow-lg shadow-orange-200 border-transparent hover:text-black' type="button" onClick={handleSaveUser}>Save</Button> */}
              </div>  
            </form>
    </div>
  )
}

export default AddForm