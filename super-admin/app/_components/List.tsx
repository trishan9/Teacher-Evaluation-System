"use client";

import Link from "next/link";
import Image from "next/image";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function List({ school }: { school: any }) {
  const deleteData = (id: string) => {
    console.log(id);
  };

  return (
    <div className="flex justify-between p-6 md:p-[2rem] rounded-md border m-3">
      <Table className="min-w-full max-w-full">
        <TableHeader>
          <TableRow className="grid grid-flow-col grid-cols-6 text-center justify-center items-center">
            <TableHead className="col-span-1 m-2">Institution Logo</TableHead>
            <TableHead className="col-span-1 m-2">Institution Name</TableHead>
            <TableHead className="col-span-1 m-2">Total Subjects</TableHead>
            <TableHead className="col-span-1 m-2">Total Teachers</TableHead>
            <TableHead className="col-span-1 m-2">Total Classes</TableHead>
            <TableHead className="col-span-1 m-2">Total Sections</TableHead>
            <TableHead className="m-2 col-span-1">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow className="grid grid-flow-col grid-cols-6 text-left justify-center items-center">
            <TableCell className="col-span-1 m-2">
              <Image
                src={school.logo}
                alt="school logo"
                className="w-14 h-14 rounded-full object-cover border"
                width={1080}
                height={1080}
              />
            </TableCell>

            <TableCell className="col-span-1 m-2">{school.name}</TableCell>

            <TableCell className="col-span-1 m-2">
              {school.subjects.length}
            </TableCell>

            <TableCell className="col-span-1 m-2">
              {school.teachers.length}
            </TableCell>

            <TableCell className="col-span-1 m-2">
              {school.classes.length}
            </TableCell>

            <TableCell className="col-span-1 m-2">
              {school.sections.length}
            </TableCell>

            <TableCell className="col-span-1 m-2 flex gap-2 items-center justify-start">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="w-8 h-4 p-0">
                    <span className="sr-only">Open menu</span>

                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="font-primary">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>

                  <DropdownMenuSeparator />

                  <Link href={`/manage-school/${school.id}`}>
                    <DropdownMenuItem className="cursor-pointer">
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => deleteData(school.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
