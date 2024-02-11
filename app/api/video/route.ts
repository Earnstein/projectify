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

      const freeTrial = await checkApiLimit();

      if (!freeTrial){
        return new NextResponse("Free trial has expired.", {status: 403});
      }
  
      
      const response =  await replicate.run(
        "deforum/deforum_stable_diffusion:e22e77495f2fb83c34d5fae2ad8ab63c0a87b6b573b6208e1535b23b89ea66d6",
        {
          input: {
            max_frames: 100,
            animation_prompts: prompt
          },
        }
      );
  
      await increaseApiLimit();
      return NextResponse.json(response);
    } catch (error) {
      console.log('[MUSIC_ERROR]', error);
      return new NextResponse("Internal Error", { status: 500 });
    }
  };