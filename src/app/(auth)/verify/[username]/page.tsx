'use client'
import { toast, useToast } from '@/hooks/use-toast'
import { useParams,useRouter } from 'next/navigation'
// import { useRouter } from 'next/router'
import React from 'react'
import { useForm} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
// import { signupSchema } from '@/app/schemas/signupSchema'
import { verifySchema } from '@/app/schemas/verifySchema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/app/types/ApiResponse'
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import  {Form} from '@/components/ui/form'


const VerifyAccount = () => {
    const router=useRouter()

    const params=useParams<{username:string}>()
//    const toast=useToast()

   const form=useForm<z.infer<typeof verifySchema>>({
resolver:zodResolver(verifySchema),


   })

   const onSubmit=async(data:z.infer<typeof verifySchema>)=>{

    try{
       const responese = await axios.post('/api/verify-account',{
            username:params.username,
            code : data.code
        })

        toast({
            title:"Success",
            description:responese.data.message
        })

        router.replace('/sign-in')

    }catch(error){

        // const axiosError = error as AxiosError<ApiResponse>
        console.log("error in verifying account",error);
        const axiosError = error as AxiosError<ApiResponse>;
        const errorMessage=axiosError.response?.data.message;

        toast({
            title:"Error",
            description:errorMessage,
            variant:"destructive"
        })
        

    }
   }


  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
      <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
            Verify your account
          </h1>
          <p className="mb-4">Enter the verification code sent to your email</p>
        </div>

        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="code" {...field} />
              </FormControl>
              
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>

      </div>
    </div>
  )
}

export default VerifyAccount
