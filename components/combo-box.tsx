"use client";
import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { Check, ChevronsUpDown } from 'lucide-react';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from './ui/command';
import { cn } from '@/lib/utils';

interface ComboBoxItem {
  value: string
  label: string
}

interface ComboBoxProps {
  items: ComboBoxItem[],
  placeholder?: string,
  onSelect: (value: string) => void
  selectedValue?: string
  width?: string
}
const ComboBox = ({items, placeholder="Select an item", onSelect, selectedValue="", width="275px"}: ComboBoxProps) => {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  const currentValue=value? items?.find(item => item.value === value)?.label : placeholder
  return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size={"sm"}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`w-[${width}] justify-between`}
          >
            {currentValue}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`w-[${width}] p-0`}>
          <Command>
            <CommandList>
              <CommandInput placeholder="Search Here..." />
              <CommandEmpty>No Item found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                      onSelect(currentValue === value ? "" : currentValue)
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
    </Popover>
  )
}

export default ComboBox