"use client";
import { useState } from "react";
import { Category } from "../../sanity.types";
import { useRouter } from "next/navigation";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CategorySelectorProps {
  categories: Category[];
}

export function CategorySelectorComponent({ categories }: CategorySelectorProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>("");
  const router = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="  w-full max-w-xs flex items-center justify-between rounded-lg border border-gray-300 bg-gradient-to-r from-purple-700 to-black
             text-white px-4 py-2 text-sm font-bold shadow-md transition-all hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 hover:text-gray-100"
        >
          {value
            ? categories.find((category) => category._id === value)?.title
            : "Filter by Category"}
          <ChevronsUpDown className="ml-2 h-5 w-5 opacity-70  " />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        className="z-10 w-[250px]  bg-white border border-gray-300 rounded-lg shadow-lg transition-transform duration-300 ease-in-out"
      >
        <Command>
          <CommandInput
            placeholder="Search categories..."
            className="w-full px-3 py-2 border-b text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <CommandList className="max-h-60 overflow-y-auto">
            <CommandEmpty className="p-4 text-center text-gray-500">
              No category found.
            </CommandEmpty>
            <CommandGroup>
              {categories.map((category) => (
                <CommandItem
                  key={category._id}
                  value={category.title}
                  className="flex items-center justify-between px-4 py-2 text-sm text-gray-800 cursor-pointer hover:bg-gray-100 transition-colors"
                  onSelect={() => {
                    setValue(value === category._id ? "" : category._id);
                    router.push(`/categories/${category.slug?.current}`);
                    setOpen(false);
                  }}
                >
                  <span>{category.title}</span>
                  <Check
                    className={cn(
                      "h-4 w-4 text-blue-500",
                      value === category._id ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
