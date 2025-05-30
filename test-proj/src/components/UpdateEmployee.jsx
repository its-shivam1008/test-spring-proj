import React, { useEffect, useRef, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BiLoaderAlt } from "react-icons/bi";
import { DataTable } from '@/components/DataTable';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"


import { LoaderCircle, MoreHorizontal, Pencil, Trash } from "lucide-react"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from 'sonner';


const UpdateEmployee = () => {

  const [emp, setEmp] = useState({})
  const [editable, setEditable] = useState(false);
  const [searchValue, setSearchValue] = useState();
  const [editData, setEditData] = useState({});
  const alertDialog = useRef(null);

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

    const handleSave = async () => {
      try{
        const response = await fetch(import.meta.env.VITE_SERVER_URL+`/${emp.id}`,{
          method:"PUT",
          headers:{"Content-type":"application/json"},
          body:JSON.stringify(editData)
        });
        console.log(response)
        await fetchAllUser();
        toast("Employee updated");
        setEmp(editData);
        setEditable(false);
      }catch(err){
        toast("Some error occured", {
          description: JSON.stringify(err),
        })
      }
    }

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
      
    const handleDelete = async () => {
      try{
          const response = await fetch(import.meta.env.VITE_SERVER_URL+`/${emp.id}`,{
            method:"DELETE"
          })
          toast("Employee deleted")
          await fetchAllUser();
          setEmp({name:null});
      }catch(err){
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
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger ref={alertDialog} className='hidden'>open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this employee's data
              and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" onChange={(e) => setSearchValue(e.target.value)} value={searchValue} placeholder="Find by id, name or Desig.." />
            <Button onClick={handleFind} type="submit">Find</Button>
        </div>
        <div className='my-3'>
          {isLoading ? <div className='flex justify-center items-center w-[calc(100dvw-320px)] h-[calc(100dvh-120px)]'> <LoaderCircle/> </div> :<DataTable columns={columns} data={userArray}></DataTable> }
          {/* <DataTable columns={columns} data={dataOk}></DataTable> */}
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
              <div className='font-bold'>Designation :</div> 
              <div className="">{editable ? <Input onChange={handleChangeInput} name="designation" type="text" className='max-w-40' value={editData.designation} /> :emp.designation}</div>
            </div>
            <div className="flex gap-5">
              <div className='font-bold'>Salary :</div> 
              <div className="">{editable ? <Input onChange={handleChangeInput} name="salary" type="text" className='max-w-40' value={editData.salary} /> :emp.salary}</div>
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
              {editable ? <Button onClick={handleSave} className="cursor-pointer" >Save</Button> : <Button onClick={() => setEditable(true)} className="cursor-pointer" ><Pencil />Edit</Button>}
              <Button className="cursor-pointer" onClick={() => alertDialog.current && alertDialog.current.click()}  variant={"destructive"}><Trash />Delete</Button>
            </div>
          </div>
        </div>}
    </div>
  )
}

export default UpdateEmployee