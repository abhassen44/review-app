"use client";
import { Message } from "@/app/model/User";
import { AcceptmessageSchema } from "@/app/schemas/acceptMesssageSchema";
import { ApiResponse } from "@/app/types/ApiResponse";
import MessageCard from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2, RefreshCcw } from "lucide-react";
import { set } from "mongoose";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { use, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import  {use }  from "react"

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitch, setIsSwitch] = useState(false);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const {toast} = useToast();

  const handleDeleteMessage = (messageId: string) => {
    setMessages(messages.filter((message) => message._id !== messageId));
  };

  const toggleSortOrder = () => {
    const newOrder = sortOrder === 'newest' ? 'oldest' : 'newest';
    setSortOrder(newOrder);
    sortMessages(messages, newOrder, selectedCategory, searchTerm);
    toast({
      title: 'Sort Order Changed',
      description: `Showing ${newOrder} messages first`
    });
  };

  const sortMessages = (msgs: Message[], order: string, category: string, search: string) => {
    let filtered = [...msgs];
    
    // Apply category filter
    if (category !== 'All') {
      filtered = filtered.filter(msg => msg.category === category);
    }

    // Apply search filter
    if (search) {
      filtered = filtered.filter(msg =>
        msg.content.toLowerCase().includes(search.toLowerCase()) ||
        msg.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return order === 'newest' ? dateB - dateA : dateA - dateB;
    });

    setMessages(filtered);
  };

  const {data: session} = useSession();

  const form=useForm({
    resolver:zodResolver(AcceptmessageSchema)
  })

  const {register,watch,setValue} = form

  const acceptMessages=watch("acceptmessages")

  const fetchAcceptMessages = useCallback(async () => {
    setIsLoading(true);
    try{
     const response = await axios.get('/api/accept-messages');
     setValue('acceptmessages',response.data.isAcceptingMessages);
    }
    catch (error) {
      const axiosError=error as AxiosError<ApiResponse>;
      toast({
        title:"Error",
        description:axiosError.response?.data.message || "Error accepting messages",
        variant:"destructive"
      })
    }
    finally{
      setIsLoading(false);
      
    }
    
  },[setValue])

  const fetchMessages= useCallback(async (refresh:boolean=false) => {
setIsLoading(true);
setIsSwitch(false);
try {
  const response=await  axios.get<ApiResponse>('/api/get_messages');
  setMessages(response.data.messages || []);
  if(refresh) {
    toast({
      title:"refreshed messages",
      description:"showing latest messages"
    })
  }
} catch (error) {
  const axiosError=error as AxiosError<ApiResponse>;
  toast({
    title:"Error",
    description:axiosError.response?.data.message || "Error accepting messages",
    variant:"destructive"
  })
 
}
finally{
  setIsLoading(false);
  setIsSwitch(false);
}
  },[setIsLoading,setMessages])

  useEffect(() => {
    if(!session || !session.user)return ;

    fetchMessages();
    fetchAcceptMessages();

  }, [session,setValue,fetchMessages,fetchAcceptMessages]);


  //handle switch change

  const handleSwitchChange=async () => {
    // setIsSwitch(true);
    try{
    const response=  await axios.post('/api/accept-messages',{acceptMessages:!acceptMessages});
      // fetchAcceptMessages();
      setValue('acceptmessages',!acceptMessages);
      toast({
        title:response.data.message,
variant:"default"
      })
    }
    catch (error) {
      const axiosError=error as AxiosError<ApiResponse>;
      toast({
        title:"Error",
        description:axiosError.response?.data.message || "Error accepting messages",
        variant:"destructive"
      })
    }
   
  }

const username=session?.user as User
//TODO:do more research
const baseurl=`{window.location.protocol}//${window.location.host}`
const profileUrl=`${baseurl}/u/${username}`


const copyToClipboard = () => {
  navigator.clipboard.writeText(profileUrl);
  toast({
    title:"Copied to clipboard",
    description:"profileUrl copied to clipboard"
  })
}


  if(!session || !session.user){
return <div>please login</div>
  }



  return (
    <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
      <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
        <div className="flex items-center">
          <input
            type="text"
            value={profileUrl}
            disabled
            className="input input-bordered w-full p-2 mr-2"
          />
          <Button onClick={copyToClipboard}>Copy</Button>
        </div>
      </div>

      <div className="mb-4">
        <Switch
          {...register('acceptMessages')}
          checked={acceptMessages}
          onCheckedChange={handleSwitchChange}
          disabled={isSwitch }
        />
        <span className="ml-2">
          Accept Messages: {acceptMessages ? 'On' : 'Off'}
        </span>
      </div>
      <Separator />

      <Button
        className="mt-4"
        variant="outline"
        onClick={(e) => {
          e.preventDefault();
          fetchMessages(true);
        }}
      >
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <RefreshCcw className="h-4 w-4" />
        )}
      </Button>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <MessageCard
              // key={message._id}
              key={message?.id}
              message={message}
              onMessageDelete={handleDeleteMessage}
            />
          ))
        ) : (
          <p>No messages to display.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
