"use client"
import { useState } from 'react';
import { Download, ImageIcon} from 'lucide-react';
import { useForm } from "react-hook-form";
import axios from "axios"
import { formSchema,amountOptions, resolutionOptions } from "@/app/(dashboard)/(routes)/image/constants";
import * as z from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import Header from "@/components/Header";
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Empty } from '@/components/Empty';
import { Loader } from '@/components/Loader';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { useProModal } from '@/hooks/use-pro-modal';
import { toast } from 'sonner';



const Imagepage = () => {
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();
  const promodal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512",
    }
  });

  const isLoading = form.formState.isSubmitting;
    
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setImages([]);
      const response = await axios.post('/api/image', values);
      const urls = response.data.map((image: {url: string})=> image.url);
      setImages(urls)
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
        title="Jazzy"
        description="Turn your prompt into an image."
        icon={ImageIcon}
        iconColor="text-pink-500"
        bgColor="bg-pink-500/10"
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
                {/* PROMPT FORM FIELD */}
                  <FormField
                  name='prompt'
                  render={({field})=>(
                    <FormItem className='col-span-12 lg:col-span-6'>
                      <FormControl className="m-0 p-0">
                        <Input
                        className='border-0 outline-none 
                        focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder="An image of white house..."
                        {...field}
                        />
    
                      </FormControl>
                    </FormItem>
                  )}
                  />
                  {/* AMOUNT FORM FIELD */}
                  <FormField
                  control={form.control}
                  name="resolution"
                  render={({field})=> (
                    <FormItem className="col-span-12 lg:col-span-2">
                      <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value}/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent >
                          {resolutionOptions.map((option)=>(
                            <SelectItem 
                            key={option.value}
                            value={option.value}>
                                {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                  />

                  {/* RESOLUTION FORM FIELD */}
                  <FormField
                  control={form.control}
                  name="amount"
                  render={({field})=> (
                    <FormItem className="col-span-12 lg:col-span-2">
                      <Select
                      disabled={isLoading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue defaultValue={field.value}/>
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {amountOptions.map((option)=>(
                            <SelectItem 
                            key={option.value}
                            value={option.value}>
                                {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                  />


                  <Button className='col-span-12 lg:col-span-2 lg:self-end w-full bg-pink-500 hover:bg-pink-600'
                  disabled={isLoading}>
                    Generate
                  </Button>
              </form>
            </Form>
          </div>
          
          {/* MESSAGE CONTENTS */}
            <div className="space-y-4 mt-4">
              
              {
                isLoading && (
                  <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                    <Loader name="Jazzy is cooking..."/>
                  </div>
                )
              }

              {
                images.length === 0  && !isLoading && (
                  <Empty label="No image generated..." src="/music.jpg"/>
                )
              }

              <div className='grid grid-col-1 md:grid-col-2 lg:grid-cols-3
              xl:grid-cols-4 gap-4 mt-8'>
                {
                  images.map((image)=> (
                    <Card
                    key={image}
                    className="rounded-lg overflow-hidden"
                    >
                      <div className='relative aspect-square'>
                        <Image
                        alt="Image"
                        src={image}
                        fill
                        sizes="w-full h-full"
                        />
                      </div>
                      <CardFooter className='p-2'>
                      <Button 
                          variant="secondary" 
                          className="w-full"
                          onClick={() => {window.open(image)}}
                          >
                            <Download className='h-4 w-4 mr-2'/>
                            Download
                          </Button>
                      </CardFooter>
                    </Card>
                  ))
                }
              </div>
            </div>
        </div>
    </div>
  )
}

export default Imagepage;