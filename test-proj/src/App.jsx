import React, { useEffect, useState } from 'react'
import "./App.css";
import { BiLoaderAlt } from "react-icons/bi";
import { Button } from './components/ui/button';
import { DataTable } from './components/DataTable';

import { MoreHorizontal } from "lucide-react"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const App = () => {

  const SERVER_URL = 'http://localhost:8080/user'
  
  const [changeValue, setChangeValue] = useState({name:"", age:"", doj:"", dob:"", mobile:"", address:"", city:"", state:"", country:""});
  useEffect(() => {
    fetchAllUser();
  }, [])



  const [userArray, setUserArray] = useState([{name:"", age:"", doj:"", dob:"", mobile:"", address:"", city:"", state:"", country:""}]);

  const [isLoading, setIsLoading] = useState(false);

  const [isLoadingPlace, setIsLoadingPlace] = useState(false);


  const [isLock, setIsLock] = useState(false)

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

  const handelSubmit = async (event) => {
    event.preventDefault;
    try{
      console.log(changeValue)
      const response =await fetch(SERVER_URL, {
        method:"POST",
        headers:{"Content-type":"application/json"},
        body:JSON.stringify(changeValue)
      })
      const result = await  response.json();
      await fetchAllUser();
    }catch(err){
      setIsLoading(false);
      alert("some error occured while creating NEW user"+JSON.stringify(err));
    }
  }

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

  const  handleEditUser = () => {
    setIsLock(false);
  }

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
    cell: ({ row }) => {
        const name = row.getValue('name')
  
        return <div className="text-left font-medium">{name}</div>
      }
    },
    {
      accessorKey: "dob",
      header: "Date of Birth",
    },
    {
      accessorKey: "age",
      header: "Age",
    },
    {
      accessorKey: "doj",
      header: "Date of Joining",
    },
    {
      accessorKey: "mobile",
      header: "Mobile",
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "city",
      header: "City",
    },
    {
      accessorKey: "state",
      header: "State",
    },
    {
      accessorKey: "country",
      header: "Country",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const emp = row.original
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(emp.id)
                  alert(emp.id)
                }}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const dataOk = [ 
    {
      id:"lol1234",
      name: "Shivam Shukla",
      age: 21,
      dob: "4-12-2003",
      doj: "21-05-2025",
      mobile:"7985218893",
      address:"19/71, RamNarayan Bazaar",
      city:"Kanpur",
      state:"Uttar Pradesh",
      country:"India",
    }, 
    {
      id:"lol1234",
      name: "Shivam Shukla",
      age: 21,
      dob: "4-12-2003",
      doj: "21-05-2025",
      mobile:"7985218893",
      address:"19/71, RamNarayan Bazaar",
      city:"Kanpur",
      state:"Uttar Pradesh",
      country:"India",
    }, 
  ]
  return (
    <div className='container mx-auto'>
      <main >
        <div className='mainDiv'>

          <div className='box'>
            
            <form action={handelSubmit} className='flex justify-center'>
              <div className='space-y-4'>
                <div className='flex justify-around py-3'>
                <Button className='hover:bg-gray-100/50 cursor-pointer transition-colors duration-200 hover:border-black border shadow-lg shadow-orange-200 border-transparent hover:text-black' type="submit" >Add</Button>
                <Button className='hover:bg-gray-100/50 cursor-pointer transition-colors duration-200 hover:border-black border shadow-lg shadow-orange-200 border-transparent hover:text-black' type="button" variant="secondary" onClick={handleEditUser}>Edit</Button>
                <Button className='hover:bg-gray-100/50 cursor-pointer transition-colors duration-200 hover:border-black border shadow-lg shadow-orange-200 border-transparent hover:text-black' type="button" variant="secondary" onClick={handleFindUser}>Find</Button>
                <Button className='hover:bg-gray-100/50 cursor-pointer transition-colors duration-200 hover:border-red-500 border shadow-lg shadow-orange-200 border-transparent hover:text-red-500' variant={'destructive'} type="button" onClick={handleDeleteUser}>Delete</Button>
                <Button className='hover:bg-gray-100/50 cursor-pointer transition-colors duration-200 hover:border-black border shadow-lg shadow-orange-200 border-transparent hover:text-black' type="button" onClick={handleSaveUser}>Save</Button>
                </div>
                <div>
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="name">Name : </label>
                  <input type="text" name="name" id="name" className='w-55 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500'  disabled={isLock} onChange={handleChannge} value={changeValue.name} placeholder='Sachin'/>
                </div>
                <div className="flex justify-between">
                <div>
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="dob">Date of birth : </label>
                  <input type="date" name="dob" id="dob" className='w-55 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500' disabled={isLock} onChange={handleChannge} value={changeValue.dob}/>
                </div>
                <div>
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="age">Age : </label>
                  <input type="number" name="age" id="age" disabled={true} className='w-12 pl-3 py-2 text-center rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500'  value={changeValue.age}/>
                </div>
                </div>
                <div className="flex justify-between gap-2">
                  <div>
                    <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="doj">Date of joining : </label>
                    <input type="date" name="doj" id="doj" className='w-55 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500' disabled={isLock} onChange={handleChannge} value={changeValue.doj}/>
                  </div>
                  <div>
                    <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="mobile">Mobile : </label>
                    <input type="text" name="mobile" id="mobile" className='w-55 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500' maxLength={10} disabled={isLock} onChange={handleChannge} value={changeValue.mobile}/>
                  </div>
                </div>
                <div>
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="address">Address : </label>
                  <input type="text" name="address" id="address" className='w-55 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500' maxLength={100} disabled={isLock} onChange={handleChannge} value={changeValue.address}/>
                </div>
                <div>
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="city">City : </label>
                  <select onChange={handleChannge} value={changeValue.city} name="city" id="city" disabled={isLock} className='w-fit p-2  text-gray-600 text-center rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500'>
                    <option value="">Select a city</option>
                    <option onChange={handleChannge} onClick={() => setIsLoadingPlace(true)} value="Kanpur">Kanpur</option>
                    <option onChange={handleChannge} onClick={() => setIsLoadingPlace(true)} value="Agra">Agra</option>
                    <option onChange={handleChannge} onClick={() => setIsLoadingPlace(true)} value="Surat">Surat</option>
                    <option onChange={handleChannge} onClick={() => setIsLoadingPlace(true)} value="Jhansi">Jhansi</option>
                  </select>
                  {/* <input type="text" name="city" id="city" className='w-55 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-black placeholder:text-gray-500' disabled={isLock} onChange={handleChannge} value={changeValue.city}/> */}
                </div>
                <div className='flex justify-between'>
                  <div>
                    <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="state">State : </label>
                    {isLoadingPlace ? <BiLoaderAlt /> : <input type="text" name="state" id="state" className='w-55 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-amber-500 placeholder:text-gray-500' disabled={isLock} onChange={handleChannge} value={changeValue.state}/>}
                  </div>
                  <div>
                    <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="state">Country : </label>
                    <input type="text" name="state" id="state" className='w-55 p-2 rounded-[6px] outline-gray-400 outline-[2px] focus:outline-amber-500 placeholder:text-gray-500' value={"India"}/>
                  </div>
                </div>
              </div>
            </form>
          </div>
         
        </div>
        <hr className='my-4' />
        {/* {
          !isLoading ? <table border={2}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Date of Birth</th>
              <th>Date of joining</th>
              <th>Address</th>
              <th>Age</th>
              <th>Mobile</th>
              <th>City</th>
              <th>State</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {
              userArray.map((elem, index)=>{
                return <tr key={index}>
                <td>{elem.id}</td>
                <td>{elem.name}</td>
                <td>{elem.dob}</td>
                <td>{elem.doj}</td>
                <td>{elem.address}</td>
                <td>{elem.age}</td>
                <td>{elem.mobile}</td>
                <td>{elem.city}</td>
                <td>{elem.state}</td>
                <td>{elem.country}</td>
              </tr>
              })
            }
          </tbody>
        </table> : <BiLoaderAlt />
        } */}
        <DataTable columns={columns} data={dataOk}></DataTable> 
      </main>
    </div>
  )
}

export default App