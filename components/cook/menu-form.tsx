"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createClient } from "@/utils/supabase/client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface MenuFormProps {
  initialData?: MenuItem;
  onSuccess: () => void;
  isEditing?: boolean;
}

const DAY_MAPPING: Record<string, string> = {
  "1": "Monday",
  "2": "Tuesday",
  "3": "Wednesday",
  "4": "Thursday",
  "5": "Friday",
  "6": "Saturday",
  "7": "Sunday",
};

interface MenuItem {
  id?: string;
  cook_id: string;
  item_name: string;
  description: string;
  price: number;
  meal_type: "breakfast" | "lunch" | "dinner";
  dietary_type: "veg" | "non-veg" | "vegan";
  day_of_week: string;
}

const formSchema = z.object({
  name: z.string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .refine((val) => val.trim().length >= 2, {
      message: "Name cannot be empty or contain only spaces.",
    }),
  description: z.string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .refine((val) => val.trim().length >= 10, {
      message: "Description cannot be empty or contain only spaces.",
    }),
  price: z.string()
    .regex(/^\d+(\.\d{1,2})?$/, {
      message: "Please enter a valid price.",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Price must be greater than zero.",
    }),
  mealType: z.enum(["breakfast", "lunch", "dinner"]),
  dietaryType: z.enum(["veg", "non-veg", "vegan"]),
  dayOfWeek: z.string(),
});

type FormData = z.infer<typeof formSchema>;

export function MenuForm({ initialData, onSuccess, isEditing }: MenuFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.item_name || "",
      description: initialData?.description || "",
      price: initialData?.price?.toString() || "",
      mealType: (initialData?.meal_type as "breakfast" | "lunch" | "dinner") || "lunch",
      dietaryType: (initialData?.dietary_type as "veg" | "non-veg" | "vegan") || "veg",
      dayOfWeek: Object.keys(DAY_MAPPING).find(key => DAY_MAPPING[key as keyof typeof DAY_MAPPING] === initialData?.day_of_week) || "1",
    },
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true);

    try {
      // Additional client-side validation
      const price = parseFloat(values.price);
      if (price <= 0) {
        throw new Error("Price must be greater than zero");
      }

      if (values.name.trim().length < 2) {
        throw new Error("Item name cannot be empty");
      }

      if (values.description.trim().length < 10) {
        throw new Error("Description must be at least 10 characters long");
      }

      const supabase = createClient();
      if (isEditing && initialData) {
        const { error } = await supabase
          .from("dabba_menu")
          .update({
            item_name: values.name.trim(),
            description: values.description.trim(),
            price: price,
            meal_type: values.mealType.toLowerCase(),
            dietary_type: values.dietaryType.toLowerCase(),
            day_of_week: DAY_MAPPING[values.dayOfWeek],
          })
          .eq("id", initialData.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Dabba updated successfully",
        });

      } else {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) throw new Error("No user found");

        const dayOfWeek = DAY_MAPPING[values.dayOfWeek as keyof typeof DAY_MAPPING];

        const menuItem = {
          cook_id: user.id,
          item_name: values.name.trim(),
          description: values.description.trim(),
          price: price,
          meal_type: values.mealType.toLowerCase(),
          dietary_type: values.dietaryType.toLowerCase(),
          day_of_week: dayOfWeek,
        };

        // Add validation before insert
        if (!Object.values(DAY_MAPPING).includes(menuItem.day_of_week)) {
          throw new Error(`Invalid day: ${menuItem.day_of_week}`);
        }

        // Debug final payload
        console.log("Final payload:", menuItem);

        const { error } = await supabase.from("dabba_menu").insert([menuItem]).select();

        if (error) throw error;

        toast({
          title: "Success",
          description: "Dabba added successfully",
        });

        form.reset();
      }
      
      onSuccess();
      
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "Failed to save dabba",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }
  const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>(undefined);
  function handleItemSelect(item: MenuItem | null) {
    setSelectedItem(item || undefined);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input placeholder="Butter Chicken" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your dish"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="99.99"
                  type="number"
                  step="0.01"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="mealType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meal Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select meal type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="breakfast">Breakfast</SelectItem>
                    <SelectItem value="lunch">Lunch</SelectItem>
                    <SelectItem value="dinner">Dinner</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dietaryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dietary Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select dietary type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="veg">Vegetarian</SelectItem>
                    <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                    <SelectItem value="vegan">Vegan</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dayOfWeek"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Day of Week</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                      "Sunday",
                    ].map((day, index) => (
                      <SelectItem key={day} value={String(index + 1)}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isEditing ? "Update Menu Item" : "Add Menu Item"}
        </Button>
      </form>
    </Form>
  );
}
