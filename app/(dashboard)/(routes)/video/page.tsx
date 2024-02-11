"use client";
import { useState } from "react";
import { VideoIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { formSchema } from "@/app/(dashboard)/(routes)/conversation/constants";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Header from "@/components/Header";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { Input } from "@/components/ui/input";
import { useProModal } from "@/hooks/use-pro-modal";
import { toast } from "sonner";

const Videopage = () => {
  const [video, setVideo] = useState<string>();
  const router = useRouter();
  const promodal = useProModal();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setVideo(undefined);

      const response = await axios.post("/api/video", values);
      setVideo(response.data);
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
  };
  return (
    <div>
      <Header
        title="Jacob"
        description="Turn your prompt into video..."
        icon={VideoIcon}
        iconColor="text-orange-500"
        bgColor="bg-orange-500/10"
      />

      <div className="px-4 lg:px-8">
        {/* FORM */}
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full py-2 px-3 md:px-6 
              focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none 
                        focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Project engineer on duty..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 lg:self-end w-full bg-orange-500 hover:bg-orange-600"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>

        {/* MESSAGE CONTENTS */}
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader name="Jacob is cooking..." />
            </div>
          )}

          {!video && !isLoading && <Empty label="No Video generated..." src="/music.jpg"/>}

          {video && (
            <video
            controls 
            className="w-full mt-8 aspect-video rounded-lg border-bg-black">
              <source src={video} />
            </video>
          )}
        </div>
      </div>
    </div>
  );
};

export default Videopage;
