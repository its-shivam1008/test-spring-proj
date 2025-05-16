import React, { useEffect, useState } from 'react'
import "./App.css";
import { BiLoaderAlt } from "react-icons/bi";
import { Button } from './components/ui/button';
import { DataTable } from './components/DataTable';

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
  ]

  const dataOk = [ 
    {
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
    <div className='container'>
      <main >
        <div className='mainDiv'>

          <div className='box'>
            
            <form action={handelSubmit}>
              <div className='flex justify-between'>
              <Button variant="destructive">Button</Button>
              <button type="submit" >Add</button>
              <button type="button" onClick={handleEditUser}>Edit</button>
              <button type="button" onClick={handleFindUser}>Find</button>
              <button type="button" onClick={handleDeleteUser}>Delete</button>
              <button type="button" onClick={handleSaveUser}>Save</button>
              </div>
              <div>
                <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="name">Name : </label>
                <input type="text" name="name" id="name" className='p-2 h-[20px] w-40 border-2'  disabled={isLock} onChange={handleChannge} value={changeValue.name}/>
              </div>
              <div className="flex justify-between">
              <div>
                <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="dob">Date of birth : </label>
                <input type="date" name="dob" id="dob" className='p-2 h-[20px] w-30 border-2' disabled={isLock} onChange={handleChannge} value={changeValue.dob}/>
              </div>
              <div>
                <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="age">Age : </label>
                <input type="number" name="age" id="age" disabled={true} className='p-2 h-[20px] w-30 border-2'  value={changeValue.age}/>
              </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="doj">Date of joining : </label>
                  <input type="date" name="doj" id="doj" className='p-2 h-[20px] w-30 border-2' disabled={isLock} onChange={handleChannge} value={changeValue.doj}/>
                </div>
                <div>
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="mobile">Mobile : </label>
                  <input type="text" name="mobile" id="mobile" className='p-2 h-[20px] w-30 border-2' maxLength={10} disabled={isLock} onChange={handleChannge} value={changeValue.mobile}/>
                </div>
              </div>
              <div>
                <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="address">Address : </label>
                <input type="text" name="address" id="address" className='p-2 border-2' maxLength={100} disabled={isLock} onChange={handleChannge} value={changeValue.address}/>
              </div>
              <div>
                <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="city">City : </label>
                <select onChange={handleChannge} value={changeValue.city} name="city" id="city" disabled={isLock}>
                  <option value="">Select a city</option>
                  <option onChange={handleChannge} onClick={() => setIsLoadingPlace(true)} value="Kanpur">Kanpur</option>
                  <option onChange={handleChannge} onClick={() => setIsLoadingPlace(true)} value="Agra">Agra</option>
                  <option onChange={handleChannge} onClick={() => setIsLoadingPlace(true)} value="Surat">Surat</option>
                  <option onChange={handleChannge} onClick={() => setIsLoadingPlace(true)} value="Jhansi">Jhansi</option>
                </select>
                {/* <input type="text" name="city" id="city" className='p-2 h-[20px] w-30 border-2' disabled={isLock} onChange={handleChannge} value={changeValue.city}/> */}
              </div>
              <div className='flex justify-between'>
                <div>
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="state">State : </label>
                  {isLoadingPlace ? <BiLoaderAlt /> : <input type="text" name="state" id="state" className='p-2 h-[20px] w-30 border-2' disabled={isLock} onChange={handleChannge} value={changeValue.state}/>}
                </div>
                <div>
                  <label className={`${isLock ? "text-gray-400" : "text-black"}`} htmlFor="state">Country : </label>
                  <input type="text" name="state" id="state" className='p-2 h-[20px] w-30 border-2' value={"India"}/>
                </div>
              </div>
            </form>
          </div>
         
        </div>
        <hr />
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
        <div className="w-[100dvw] mx-auto">
          <DataTable columns={columns} data={dataOk}></DataTable> 
        </div>
      </main>
    </div>
  )
}

export default App