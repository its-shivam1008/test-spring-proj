import React, { useEffect, useState } from 'react';
import { BiLoaderAlt } from "react-icons/bi";
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/DataTable';

import { LoaderCircle, MoreHorizontal } from "lucide-react"
 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from 'sonner';

const AllEmployee = () => {

    
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
      
            return <div className="text-left font-medium">{name}</div>
          }
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
                      toast("Employee id copied")
                    }}
                  >
                    Copy employee ID
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )
          },
        },
      ]
  return (
    <div>
      {isLoading ? <div className='flex justify-center items-center w-[calc(100dvw-320px)] h-[calc(100dvh-120px)]'> <LoaderCircle/> </div> :<DataTable columns={columns} data={userArray}></DataTable> }
      {/* <DataTable columns={columns} data={dataOk}></DataTable> */}
    </div>
  )
}

export default AllEmployee