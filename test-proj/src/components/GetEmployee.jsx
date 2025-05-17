import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BiLoaderAlt } from "react-icons/bi";
import { DataTable } from '@/components/DataTable';

import { MoreHorizontal } from "lucide-react"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const GetEmployee = () => {

  const [emp, setEmp] = useState({})

  const handleClickOnRow = (empData) => {
    setEmp(empData)
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
  
    const dataOk = [ 
      {
        id:"lol1234",
        name: "Sumitra Mahajan",
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
    <div>
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Find by id or name" />
            <Button type="submit">Find</Button>
        </div>
        <div className='my-3'>
          <DataTable columns={columns} data={dataOk}></DataTable> 
        </div>
        {emp.name && <div className='w-fit h-fit p-5 rounded-[8px] shadow-xl border-2'>
          <div className='text-md'>
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