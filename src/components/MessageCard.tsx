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
import { Badge } from "@/components/ui/badge"
import { X } from 'lucide-react'
import { Message } from "@/app/model/User"
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'
import { ApiResponse } from '@/app/types/ApiResponse'

type MessageCardProps = {
    message: Message;
    onMessageDelete: (MessageId: string) => void;
}

const MessageCard = ({message, onMessageDelete}: MessageCardProps) => {
    const {toast} = useToast();
    const handleDeleteConfirm = async () => {
        const response = await axios.delete<ApiResponse>(`/api/delete-message/${message._id}`)
        toast({
            title: response.data.message,
        })
        onMessageDelete(message._id as string)
    }

    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <Badge variant="outline" className="mb-2">{message.category}</Badge>
                        <CardTitle className="text-lg">{message.content}</CardTitle>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" size="icon">
                                <X className='w-4 h-4' />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete this message.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteConfirm}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
                <CardDescription>Sent on {new Date(message.createdAt).toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-sm text-gray-600 mb-4">{message.content}</p>
                {message.tags && message.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {message.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">{tag}</Badge>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}

export default MessageCard
