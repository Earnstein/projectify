"use client"
import { useState } from 'react';
import { MessagesSquare } from 'lucide-react';
import { useForm } from "react-hook-form";
import axios from "axios"
import { formSchema } from "@/app/(dashboard)/(routes)/conversation/constants";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import Header from "@/components/Header";
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Empty } from '@/components/Empty';
import { Loader } from '@/components/Loader';
import { cn } from '@/lib/utils';
import { UserAvatar } from '@/components/use-avatar';
import { BotAvatar } from '@/components/bot-avatar';
import { Input } from '@/components/ui/input';
import { useProModal } from '@/hooks/use-pro-modal';
import { toast } from 'sonner';






interface UserChat {
  role: any;
  content: any;
}

const Conversation = () => {
  const [messages, setMessages] = useState<UserChat[]>([]);
  const router = useRouter();
  const promodal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: ""
    }
  });

  const isLoading = form.formState.isSubmitting;
    
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMessage: UserChat = { role: "user", content: values.prompt };
      const newMessages = [...messages, userMessage];
      const response = await axios.post('/api/conversation', { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403){
        promodal.onOpen();
      }else{
        toast.error("Something went wrong")
      }
    } finally {
      router.refresh();
    }
  }
  return (
    <div>
        <Header
        title="Earnstein"
        description="Our most advanced model"
        icon={MessagesSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
        />

        <div className="px-4 lg:px-8">

          {/* FORM */}
          <div>
            <Form {...form}>
              <form 
              onSubmit={form.handleSubmit(onSubmit)}
              className='rounded-lg border w-full py-2 px-3 md:px-6 
              focus-within:shadow-sm grid grid-cols-12 gap-2'
              >
                  <FormField
                  name='prompt'
                  render={({field})=>(
                    <FormItem className='col-span-12 lg:col-span-10'>
                      <FormControl className="m-0 p-0">
                        <Input
                        className='border-0 outline-none 
                        focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder="Message Earnstein..."
                        {...field}
                        />
    
                      </FormControl>
                    </FormItem>
                  )}
                  />
                  <Button className='col-span-12 lg:col-span-2 lg:self-end w-full bg-violet-500 hover:bg-violet-700'
                  disabled={isLoading}>
                    send
                  </Button>
              </form>
            </Form>
          </div>
          
          {/* MESSAGE CONTENTS */}
            <div className="space-y-4 mt-4">
              
              {
                isLoading && (
                  <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                    <Loader name="Earnstein is thinking..."/>
                  </div>
                )
              }

              {
                messages.length === 0  && !isLoading && (
                  <Empty label="Let's start working on your project..." src="/engineer.png"/>
                )
              }

             <div className="flex flex-col-reverse gap-y-4">
                  {
                    messages.map((message, index) => (
                    <div key={index}
                    className={cn("p-4 w-full flex flex-col items-start rounded-lg gap-y-2",
                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}>
                      <div>{message.role === "user" ? <UserAvatar/> : <BotAvatar name="Earnstein"/>}</div>

                      <p className='text-sm'>{message.content}</p>
                    </div>
                    ))
                  }
             </div>
            </div>
        </div>
    </div>
  )
}

export default Conversation;