import { NextRequest, NextResponse } from "next/server";
import { askGemini } from "@/lib/gemeni";
// import Interview from "@/models/interview.model";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
export async function GET(){
    try{
        return NextResponse.json({"message": 'hello form api'})
    }catch{

    }
}


export async function POST(request: NextRequest) {
    const {type, role, level, amount, techStack } = await request.json()

    try{ 
        const session = await getServerSession(authOptions)
        if(session?.user.email){
            return NextResponse.json({
                "message": "Unauthorized"
            }, { status: 401})
        }

        const prompt =  `Prepare questions for a job interview.
                The job role is ${role}.
                The job experience level is ${level}.
                The tech stack used in the job is: ${techStack}.
                The focus between behavioural and technical questions should lean towards: ${type}.
                The amount of questions required is: ${amount}.
                Please return only the questions, without any additional text.
                The questions are going to be read by a voice assistant so do not use "/" or "*" or any other special characters which might break the voice assistant.
                Return the questions formatted like this:
                ["Question 1", "Question 2", "Question 3"]
                
                Thank you! <3`

        const response = await askGemini(prompt);

        // await Interview.create({

        // })
        NextResponse.json({
            "message": "success",
            "result": response
        })
    }catch{

    }
}