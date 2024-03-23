import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { checkApiLimit, increaseApiLimit} from "@/lib/api-limit";


const replicate = new Replicate({
    auth: process.env.REPLICATE_TOKEN!
  });



export async function POST(
    req: Request
  ) {
    try {
      const { userId } = auth();
      const body = await req.json();
      const { prompt  } = body;
  
      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }
  
      
  
      if (!prompt) {
        return new NextResponse("Prompt are required", { status: 400 });
      }

            
      // const freeTrial = await checkApiLimit();

      // if (!freeTrial){
      //   return new NextResponse("Free trial has expired.", {status: 403});
      // }
  

      const response = await replicate.run(
        "meta/musicgen:b05b1dff1d8c6dc63d14b0cdb42135378dcb87f6373b0d3d341ede46e59e2b38",
        {
          input: {
            model_version: "stereo-melody-large",
            prompt: prompt
          }
        }
      );

      // await increaseApiLimit();
  
      return NextResponse.json(response);
    } catch (error) {
      console.log('[MUSIC_ERROR]', error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };