"use client"
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { FilePenLine } from 'lucide-react'
import { Trash } from 'lucide-react'



export default function List({ school }: { school: any }) {

  const editData = (e:any) => {
    console.log(e.target.id)
  }

  const deleteData = () => {
    console.log('delete')
  }
  
  return (
    <div className='flex justify-between p-6 md:p-[2rem] rounded-md border m-3' id={school.id} onClick={editData}>
      <Table >
        <TableHeader>
          <TableRow className='grid grid-flow-col grid-cols-9 text-center'>
            <TableHead className='col-span-2 m-2'>Logo</TableHead>
            <TableHead className='col-span-2 m-2'>Name</TableHead>
            <TableHead className='col-span-1 m-2'>Subject</TableHead>
            <TableHead className='col-span-1 m-2'>Teachers</TableHead>
            <TableHead className='col-span-1 m-2' >Section</TableHead>
            <TableHead className='col-span-2 m-2'>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className='grid grid-flow-col grid-cols-9 text-left'>
            <TableCell className='col-span-2 m-2' >
              <Image
                src={school.logo}
                alt='school logo'
                className='w-16 h-16 rounded-full object-cover border'
                width={1080}
                height={1080}
              />
            </TableCell>
            <TableCell className='col-span-2 m-2'>{school.name}</TableCell>
            <TableCell className='col-span-1 m-2'>{school.subjects.length}</TableCell>
            <TableCell className='col-span-1 m-2'>{school.teachers.length}</TableCell>
            <TableCell className='col-span-1 m-2'>
              {school.sections.length}
            </TableCell>
            <TableCell className='col-span-2 m-2'>
              <Button size='icon' className='mr-1' onClick={editData}><FilePenLine /></Button>
              <Button size='icon' onClick={deleteData}><Trash /></Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}
