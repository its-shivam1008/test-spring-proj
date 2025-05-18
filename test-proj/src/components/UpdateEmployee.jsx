import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BiLoaderAlt } from "react-icons/bi";
import { DataTable } from '@/components/DataTable';

import { MoreHorizontal, Pencil, Trash } from "lucide-react"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


const UpdateEmployee = () => {

  const [emp, setEmp] = useState({})
  const [editable, setEditable] = useState(false);
  const [editData, setEditData] = useState({});

  const handleClickOnRow = (empData) => {
    setEmp(empData);
    setEditData(empData);
  }

  const handleChangeInput = (e) => {
    const {name, value} = e.target;
    setEditData((prv) => ({
      ...prv,
      [name]:value
    }))
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
    <div>
      {/* {editable ? <Input type="text" className='max-w-40' value={emp.name} /> :emp.name} */}
      {/* 
        <div className="flex justify-between">
          {editable ? <Button onClick={() => setEditable(false)} className="cursor-pointer" >Save</Button> : <Button onClick={() => setEditable(true)} className="cursor-pointer" ><Pencil />Edit</Button>}
          <Button className="cursor-pointer" variant={"destructive"}><Trash />Delete</Button>
        </div>
      */}
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Find by id or name" />
            <Button type="submit">Find</Button>
        </div>
        <div className='my-3'>
          <DataTable columns={columns} data={dataOk}></DataTable> 
        </div>
        {emp.name && <div className='w-fit h-fit p-5 rounded-[8px] shadow-xl transition-colors duration-200 hover:border-blue-400 border-2'>
          <div className='text-md space-y-1'>
            <div className="flex gap-5">
              <div className='font-bold'>Employee id :</div> 
              <div className="">{emp.id}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>Name :</div> 
              <div className="">{editable ? <Input onChange={handleChangeInput} name="name" type="text" className='max-w-40' value={editData.name} /> :emp.name}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>Date of Birth :</div> 
              <div className="">{editable ? <Input onChange={handleChangeInput} name="dob" type="date" className='max-w-40' value={editData.dob} /> :emp.dob}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>Age :</div> 
              <div className="">{editable ? <Input onChange={handleChangeInput} name="age" type="text" className='max-w-40' value={editData.age} /> :emp.age}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>Date of joining :</div> 
              <div className="">{editable ? <Input onChange={handleChangeInput} name="doj" type="date" className='max-w-40' value={editData.doj} /> :emp.doj}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>Mobile :</div> 
              <div className="">{editable ? <Input onChange={handleChangeInput} name="mobile" type="text" className='max-w-40' value={editData.mobile} /> :emp.mobile}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>Address :</div> 
              <div className="">{editable ? <Input onChange={handleChangeInput} name="address" type="text" className='max-w-40' value={editData.address} /> :emp.address}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>City :</div> 
              <div className="">{editable ? <Input onChange={handleChangeInput} name="city" type="text" className='max-w-40' value={editData.city} /> :emp.city}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>State :</div> 
              <div className="">{editable ? <Input onChange={handleChangeInput} name="state" type="text" className='max-w-40' value={editData.state} /> :emp.state}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>Country :</div> 
              <div className="">{emp.country}</div>
            </div>
            <div className="flex justify-between">
              {editable ? <Button onClick={() => setEditable(false)} className="cursor-pointer" >Save</Button> : <Button onClick={() => setEditable(true)} className="cursor-pointer" ><Pencil />Edit</Button>}
              <Button className="cursor-pointer" variant={"destructive"}><Trash />Delete</Button>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default UpdateEmployee