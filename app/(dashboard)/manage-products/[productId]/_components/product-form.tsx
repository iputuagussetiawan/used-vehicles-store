"use client"

import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { Checkbox } from "@/components/ui/checkbox"


const formSchema = z.object({
    productName: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    productDescription: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }).max(160, {
        message: "Description must not be longer than 30 characters.",
    }),
    language: z.string({
        required_error: "Please select product category",
    }),
    items: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one item.",
    }),
})

const fruits = [
  {
    value: "citrus",
    label: "Citrus Fruits",
  },
  {
    value: "berries",
    label: "Berries",
  },
  {
    value: "tropical",
    label: "Tropical Fruits",
  },
  {
    value: "stoneFruits",
    label: "Stone Fruits",
  },
  {
    value: "melons",
    label: "Melons",
  },
  {
    value: "orchardFruits",
    label: "Orchard Fruits",
  },
]


const fruitsCategories = [
    {
      id: "citrus",
      label: "Citrus Fruits",
    },
    {
      id: "berries",
      label: "Berries",
    },
    {
      id: "tropical",
      label: "Tropical Fruits",
    },
    {
      id: "stoneFruits",
      label: "Stone Fruits",
    },
    {
      id: "melons",
      label: "Melons",
    },
    {
      id: "orchardFruits",
      label: "Orchard Fruits",
    },
  ]



const ProductsForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            productName: "",
            items: ["melons", "orchardFruits"],
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <div>
            <h1>Product Form</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="productName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Product Name" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your product display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="productDescription"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Product Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about your product"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    This is your product description.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                            control={form.control}
                            name="language"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Language</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            "w-[400px] justify-between",
                                            !field.value && "text-muted-foreground"
                                        )}
                                        >
                                        {field.value
                                            ? fruits.find(
                                                (fruit) => fruit.value === field.value
                                            )?.label
                                            : "Select Product Category"}
                                        <ChevronsUpDown className="opacity-50" />
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[400px] p-0">
                                    <Command>
                                        <CommandInput
                                        placeholder="Search framework..."
                                        className="h-9"
                                        />
                                        <CommandList>
                                        <CommandEmpty>No framework found.</CommandEmpty>
                                        <CommandGroup>
                                            {fruits.map((fruit) => (
                                            <CommandItem
                                                value={fruit.label}
                                                key={fruit.value}
                                                onSelect={() => {
                                                form.setValue("language", fruit.value)
                                                }}
                                            >
                                                {fruit.label}
                                                <Check
                                                className={cn(
                                                    "ml-auto",
                                                    fruit.value === field.value
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                                )}
                                                />
                                            </CommandItem>
                                            ))}
                                        </CommandGroup>
                                        </CommandList>
                                    </Command>
                                    </PopoverContent>
                                </Popover>
                                <FormDescription>
                                    This is the language that will be used in the dashboard.
                                </FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                        control={form.control}
                        name="items"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel className="text-base">Sidebar</FormLabel>
                              <FormDescription>
                                Select the items you want to display in the sidebar.
                              </FormDescription>
                            </div>
                            {fruitsCategories.map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="items"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...field.value, item.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="text-sm font-normal">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    )
}

export default ProductsForm