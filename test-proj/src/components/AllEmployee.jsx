import React from 'react';
import { BiLoaderAlt } from "react-icons/bi";
import { Button } from '@/components/ui/button';
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

const AllEmployee = () => {
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
    <div className=''>

        <DataTable columns={columns} data={dataOk}></DataTable> 
    </div>
  )
}

export default AllEmployee