"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {  useToast} from "@/components/ui/use-toast"
import Link from "next/link"

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

export function LoginForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const supabase = await createClient()

    try {
      const { data: { user }, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      
      if (error) {
        console.error('Supabase signIn error:', error);

        if (error.message.includes("Invalid login credentials")) {
          toast({
            title: "Invalid credentials",
            description: "The email or password you entered is incorrect.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Something went wrong.",
            description: error.message,
            variant: "destructive",
          });
        }
        return;
      }

      // Check if user is an admin
      if (user) {
        const { data: isAdmin, error: adminError } = await supabase
          .rpc('is_admin', { user_id: user.id });

        if (adminError) {
          console.error('Admin check error:', adminError);
        }

        if (isAdmin) {
          toast({
            title: "Login successful!",
            description: "Welcome to the admin dashboard.",
          });
          router.push("/admin/dashboard");
          return;
        }

        // Check if user is a cook
        const { data: cookData, error: cookError } = await supabase
          .from('cooks')
          .select('id')
          .eq('id', user.id)
          .single();

        if (!cookError && cookData) {
          toast({
            title: "Login successful!",
            description: "Welcome to your cook dashboard.",
          });
          router.push("/cook/dashboard");
          return;
        }
      }

      toast({
        title: "Login successful!",
        description: "Welcome back to CampusDabba.",
      });

      router.push("/");
    } catch (error) {
      console.error('Error during login:', error);
      toast({
        title: "Something went wrong.",
        description: "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="********" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Sign In
        </Button>
        <div className="text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?{" "}
            <Link href="/auth/register" className="text-primary hover:underline">
              Sign up as a user
            </Link>
            {" or "}
            <Link href="/auth/admin-register" className="text-primary hover:underline">
              Sign up as an admin
            </Link>
          </p>
        </div>
      </form>
    </Form>
  )
}

