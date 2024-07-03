"use client"
import React, { useState, useEffect } from 'react';
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { category } from '@/app/utils/category';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const CategoryList = () => {
  const [categoryList, setCategoryList] = useState([]);
  const pathname = usePathname();
  const categories = pathname.split('/')[2];

  useEffect(() => {
    console.log('====================================');
    console.log(categories);
    console.log('====================================');
  }, [categories]);

  return (
    <div className='h-screen mt-5 flex flex-row'>
      <Command>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList className='overflow-visible'>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {category && category.map((item, index) => (
              <CommandItem key={index} >
                <Link href={'/search/' + item.description} className={`p-2 flex gap-2 text-[14px] text-black items-center rounded-md cursor-pointer w-full ${categories === item.description ? 'bg-blue-100' : ''}`}>
                  <Image src={item.icon} alt={item.altText} width={20} height={40} />
                  <label>{item.description}</label>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
        </CommandList>
      </Command>
    </div>
  );
};

export default CategoryList;
