"use client"
import { useState } from 'react';
import {  Code } from 'lucide-react';
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { formSchema } from "@/app/(dashboard)/(routes)/conversation/constants";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import Header from "@/components/Header";
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Empty } from '@/components/Empty';
import { Loader } from '@/components/Loader';
import { cn } from '../../../../lib/utils';
import { UserAvatar } from '@/components/use-avatar';
import { BotAvatar } from '@/components/bot-avatar';
import { Input } from '@/components/ui/input';






interface UserChat {
  role: any;
  content: any;
}

const CodePage = () => {
  const [messages, setMessages] = useState<UserChat[]>([])
  const router = useRouter();
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
      
      const response = await axios.post('/api/code', { messages: newMessages });
      setMessages((current) => [...current, userMessage, response.data]);
      console.log('OpenAI API Response:', response.data);
      console.log('Messages:', messages);

      form.reset();
    } catch (error: any) {
      if (error) {
       console.error(error,  "ERROR ON SUBMIT")
      } else {
        console.log("something went wrong")
      }
    } finally {
      router.refresh();
    }
  }
  return (
    <div>
        <Header
        title="Peterlight"
        description="Our best AI model for code generation."
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
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
                        placeholder="Ask Peter..."
                        {...field}
                        />
    
                      </FormControl>
                    </FormItem>
                  )}
                  />
                  <Button className='col-span-12 lg:col-span-2 lg:self-end w-full'
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
                    <Loader name="Peterlight"/>
                  </div>
                )
              }

              {
                messages.length === 0  && !isLoading && (
                  <Empty label="Let's start working on your project..."/>
                )
              }

             <div className="flex flex-col-reverse gap-y-4">
                  {
                    messages.map((message, index) => (
                    <div key={index}
                    className={cn("p-4 w-full flex flex-col items-start rounded-lg gap-y-2",
                    message.role === "user" ? "bg-white border border-black/10" : "bg-muted")}>
                      {message.role === "user" ? <UserAvatar/> : <BotAvatar name="Peterlight"/>}

                      <ReactMarkdown components={{
                  pre: ({ node, ...props }) => (
                    <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                      <pre {...props} />
                    </div>
                  ),
                  code: ({ node, ...props }) => (
                    <code className="bg-black/10 rounded-lg p-1" {...props} />
                  )
                }} className="text-xs md:text-sm overflow-hidden leading-7 mx-auto w-full max-w-full">
                  {message.content || ""}
                </ReactMarkdown>
                    </div>
                    ))
                  }
             </div>
            </div>
        </div>
    </div>
  )
}

export default CodePage;


// name="Peterlight"