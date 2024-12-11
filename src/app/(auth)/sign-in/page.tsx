"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useDebounceValue,useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { signupSchema } from "@/app/schemas/signupSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/app/types/ApiResponse";
import {
  Form,
  FormLabel,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button"; // Replace if necessary
import { Link, Loader2 } from "lucide-react";
import { sighINSchema } from "@/app/schemas/signInSchema";
import { sign } from "crypto";
import { signIn } from "next-auth/react";

const Page = () => {

  // const [isSubmitting, setIsSubmitting] = useState(false);

  // const debounced = useDebounceCallback(setUsername, 300);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(sighINSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  

  const onSubmit = async (data: z.infer<typeof sighINSchema>) => {
   const result=await signIn("credentials",{
    redirect: false,
    identifier: data.identifier,
    password: data.password
   })

   if(result?.error){
    toast({
      title:"login failed",
      description:"incorrect username or password",
      variant:"destructive"
    })
   }

   if(result?.url){
router.replace('/dashboard')
   }

  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Join Mestry Message
          </h1>
          <p className="mb-4">Sign in to continue your secret conversations</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
            <FormField
              control={form.control}
              name="identifier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email/Username</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
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
                    <Input
                      type="password"
                      placeholder="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" >
           Signin
            </Button>
          </form>
        </Form>

        <div className="text-center mt-4">
          <p>
            Already a member?{" "}
            <Link href="/sign-in" className="text-blue-500 hover:text-blue-800">
              sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
