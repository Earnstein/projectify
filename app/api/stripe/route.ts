import prismadb from "@/lib/prismadb";
import { absoluteUrl } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { url } from "inspector";


const settingsUrl = absoluteUrl("/settings");

export async function GET(){
    try {
        const  { userId } = auth();
        const user = await currentUser();

        if( !userId || !user){
            return new NextResponse("Unathourized", {status: 401})
        }

        const userSub = await prismadb.userSubscription.findUnique({
            where: {
                userId: userId
            }
        });

        if (userSub && userSub.stripeCustomerId){
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: userSub.stripeCustomerId,
                return_url: settingsUrl
            })

        return new NextResponse(JSON.stringify({url: stripeSession.url}))
        }

        const stripeSession = await stripe.checkout.sessions.create({
            success_url: settingsUrl,
            cancel_url: settingsUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.emailAddresses[0].emailAddress,
            line_items: [{
                price_data:{
                    currency: "USD",
                    product_data: {
                        name: "Projectify",
                        description: "Unlimited AI Generations",
                    },
                    unit_amount: 20000,
                    recurring:{
                        interval: "month"
                    }
                },
                quantity: 1,
            }],
            metadata:{
                userId,
            }
        });
        return new NextResponse(JSON.stringify({url:stripeSession.url}))
    } catch (error) {
        console.error("STRIPE", error)
        return new NextResponse("Internal server Error", {status: 500})
    }
}