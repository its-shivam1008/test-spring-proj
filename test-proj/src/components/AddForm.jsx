import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { toast } from "sonner"

const AddForm = () => {

    const [changeValue, setChangeValue] = useState({name:"", age:"", doj:"", dob:"", mobile:"", address:"", city:"", state:"", country:"", designation:"", salary:""});
    const [errorSalary, setErrorSalary] = useState(null);
    const [errorMobile, setErrorMobile] = useState(null);

    const [isLoadingPlace, setIsLoadingPlace] = useState(false);

    // useEffect(() => {
    //   console.log(changeValue);
    // }, [])


    const [isLock, setIsLock] = useState(false);

    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    const handleChannge = (event) => {
        const {name, value} = event.target
        setChangeValue((prev) => {
          let stateOfCity = "";
          let ageOfEmployee = "";
          let salaryOfEmployee = "";
          let mobileOfEmployee = "";
          if(name=="salary"){
            if(/^\d*$/.test(value) && value.length <= 7){
              salaryOfEmployee = value
              setErrorSalary(null);
            }
            else{
              setErrorSalary("Field can only contains numbers and be up to 7 digits")
            }
          }
          
          if(name=="mobile"){
            if(/^\d*$/.test(value) && value.length <= 10){
              mobileOfEmployee = value
              setErrorMobile(null);
            }
            else{
              setErrorMobile("Field can only contains numbers and be up to 10 digits")
            }
          }

          if(name == "dob"){
            ageOfEmployee = (new Date().getFullYear() - new Date(value).getFullYear());
          }

          if(name == "city" && (value=="Kanpur" || value=="Agra")){
            stateOfCity = "Uttar Pradesh"
          }else if(name == "city" && value == "Surat"){
            stateOfCity = "Gujarat"
          }else if(name == "city" && value == "Jhansi"){
            stateOfCity = "Madhaya Pradesh"
          }
            return {
              ...prev,
              [name]:value,
              country:"India",
              ...(salaryOfEmployee && {salary:salaryOfEmployee}),
              ...(mobileOfEmployee && {mobile:mobileOfEmployee}),
              ...(ageOfEmployee && {age:ageOfEmployee}),
              ...(stateOfCity && {state:stateOfCity})
            }
          
        })
      }
    
      const handelSubmit = async (event) => {
        event.preventDefault;
        console.log(changeValue);
        try{
          const response =await fetch(SERVER_URL, {
            method:"POST",
            headers:{"Content-type":"application/json"},
            body:JSON.stringify(changeValue)
          })
          const result = await  response.json();
          toast("Employee added", {
            description: "The employee has been added you can check it ",
          })
        }catch(err){
          setIsLoading(false);
          toast("Some error occured", {
            description: JSON.stringify(err),
          })
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
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="salary">Salary </label>
                  <input type="text" name="salary" id="salary" className='w-50 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500' maxLength={7} disabled={isLock} onChange={handleChannge} value={changeValue.salary} placeholder='205020'/>
                  {
                    errorSalary && <div className="text-red-500 text-md font-bold">{errorSalary}</div>
                  }
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
                    {
                      errorMobile && <div className="text-red-500 text-md font-bold">{errorMobile}</div>
                    }
                  </div>
                <div className="space-x-4">
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="address">Address </label>
                  <input type="text" name="address" id="address" className='w-50 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500' maxLength={100} disabled={isLock} onChange={handleChannge} value={changeValue.address}/>
                </div>
                <div className="space-x-4">
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="city">City </label>
                  <select onChange={handleChannge} value={changeValue.city} name="city" id="city" disabled={isLock} className='w-fit p-2  text-gray-600 text-center rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500'>
                    <option value="">Select a city</option>
                    <option onChange={handleChannge} value="Kanpur">Kanpur</option>
                    <option onChange={handleChannge} value="Agra">Agra</option>
                    <option onChange={handleChannge} value="Surat">Surat</option>
                    <option onChange={handleChannge} value="Jhansi">Jhansi</option>
                  </select>
                </div>
                  <div className="space-x-4">
                    <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="state">State </label>
                    {isLoadingPlace ? <BiLoaderAlt /> : <input type="text" name="state" id="state" className='w-50 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-amber-500 placeholder:text-gray-500' disabled={isLock} onChange={handleChannge} value={changeValue.state}/>}
                  </div>
                  <div className="space-x-4">
                    <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="country">Country </label>
                    <input type="text" name="country" id="country" className='w-50 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-amber-500 placeholder:text-gray-500' value={"India"}/>
                  </div>
                <Button className='hover:bg-gray-100/50 cursor-pointer transition-colors duration-200 hover:border-black border shadow-lg shadow-orange-200 border-transparent hover:text-black' type="submit" >Add Employee</Button>
            </form>
    </div>
  )
}

export default AddForm