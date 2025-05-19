import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BiLoaderAlt } from "react-icons/bi";
import { DataTable } from '@/components/DataTable';

import { LoaderCircle, MoreHorizontal, Pencil } from "lucide-react"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from 'sonner';


const GetEmployee = () => {

  const [emp, setEmp] = useState({})

  const handleClickOnRow = (empData) => {
    setEmp(empData)
  }

  const [searchValue, setSearchValue] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [userArray, setUserArray] = useState([{name:"", age:"", doj:"", dob:"", mobile:"", address:"", city:"", state:"", country:""}]);
  
  useEffect(() => {
    fetchAllUser();
  }, [])
  const fetchAllUser = async () => {
    try{
      setIsLoading(true);
      const response =await fetch(import.meta.env.VITE_SERVER_URL)
      const result = await  response.json();
      setUserArray(() =>(
        [
          ...result
        ]
      ))
      setIsLoading(false);
    }catch(err){
      setIsLoading(false);
      toast("Some error occured", {
        description: JSON.stringify(err),
      })
    }
  }

  const columns = [
      {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            const name = row.getValue('name')
      
            return <div className="text-left font-medium underline text-blue-500 cursor-pointer" onClick={() => handleClickOnRow(row.original)}>{name}</div>
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
        cell: ({ row }) => {
          const addr = row.getValue('address')
    
          return <div>{addr.slice(0,15)}...</div>
        }
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
      }
    ]

  const handleFind = async () => {
    try{
      setIsLoading(true);
      const response =await fetch(import.meta.env.VITE_SERVER_URL+`/search/${searchValue}`)
      const result = await  response.json();
      setUserArray(() =>(
        [...result]
      ))
      toast(`${userArray.length} employees found`);
      setIsLoading(false);
    }catch(err){
      setIsLoading(false);
      toast("Some error occured", {
        description: JSON.stringify(err),
      })
    }
  }
  
  return (
    <div>
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} placeholder="Find by id, name or Desig.." />
            <Button onClick={handleFind} type="submit">Find</Button>
        </div>
        <div className='my-3'>
           {isLoading ? <div className='flex justify-center items-center w-[calc(100dvw-320px)] h-[calc(100dvh-120px)]'> <LoaderCircle/> </div> :<DataTable columns={columns} data={userArray}></DataTable> }
           {/* <DataTable columns={columns} data={dataOk}></DataTable> */}
        </div>
        {emp.name && <div className='w-fit h-fit p-5 rounded-[8px] shadow-xl transition-colors duration-200 hover:border-blue-400 border-2'>
          <div className='text-md'>
            <div className="flex gap-5">
              <div className='font-bold'>Employee id :</div> 
              <div className="">{emp.id}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>Name :</div> 
              <div className="">{emp.name}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>Date of Birth :</div> 
              <div className="">{emp.dob}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>Age :</div> 
              <div className="">{emp.age}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>Date of joining :</div> 
              <div className="">{emp.doj}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>Mobile :</div> 
              <div className="">{emp.mobile}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>Address :</div> 
              <div className="">{emp.address}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>City :</div> 
              <div className="">{emp.city}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>State :</div> 
              <div className="">{emp.state}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>Country :</div> 
              <div className="">{emp.country}</div>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default GetEmployee