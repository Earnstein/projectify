"use client";
import { useState } from "react";
import { Music } from "lucide-react";
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


const Musicpage = () => {
  const [music, setMusic] = useState<string>();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setMusic(undefined);

      const response = await axios.post("/api/music", values);
      setMusic(response.data);
      form.reset();
    } catch (error: any) {
      if (error) {
        console.error(error, "ERROR ON SUBMIT");
      } else {
        console.log("something went wrong");
      }
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Header
        title="Segius"
        description="Turn your prompt into melodies..."
        icon={Music}
        iconColor="text-yellow-500"
        bgColor="bg-yellow-500/10"
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
                        placeholder="Let's go Afrobeatssss..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 lg:self-end w-full bg-yellow-500 hover:bg-yellow-600"
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
              <Loader name="Segius is cooking..." />
            </div>
          )}

          {!music && !isLoading && <Empty label="No music generated..." />}

          {music && (
            <audio controls className="w-full mt-8">
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default Musicpage;
