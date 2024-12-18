"use client"
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

  import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
// import { Message } from "@/models/User";
import { Message } from "@/app/model/User";
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { ApiResponse } from '@/app/types/ApiResponse'
  
  type MessageCardProps = {
      message: Message;
      onMessageDelete: (MessageId: string) => void;

  }

const MessageCard = ({message,onMessageDelete}:MessageCardProps) => {
    const {toast} = useToast();
    const handleDeleteConfirm = () => {
      const response = await  axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
      toast({
        title: response.data.message,
      })
      onMessageDelete(message.id)
    }
  return (
            <Card>
        <CardHeader>
            <CardTitle>Card Title</CardTitle>
            <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive"><X className='w-4 h-4'></X></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
            <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
            <p>Card Content</p>
        </CardContent>
       
        </Card>

  )
}

export default MessageCard
