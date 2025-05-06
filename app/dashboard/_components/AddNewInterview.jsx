"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { chatSession } from "@/utils/GeminiAIModel";
import { LoaderCircle } from "lucide-react";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from 'uuid';
import { useUser } from "@clerk/nextjs";
import moment from "moment/moment";
import { useRouter } from "next/navigation";

const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false)
    const [jobposition, setJobPosition] = useState()
    const [jobDesc, setJobDesc] = useState()
    const [JobExperience, setJobExperience] = useState()
    const[loading,setLoading]=useState(false);
    const[jsonResponse,setJsonResponse]=useState([])
    const router=useRouter();
    const {user}=useUser();
    const onSubmit=async(e)=>{
        setLoading(true);
        e.preventDefault()
        console.log(jobposition,jobDesc,JobExperience)
        const InputPrompt = `
Generate ${process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT} interview questions and answers in JSON format.

The candidate is applying for the role of: ${jobposition}
Job Description/Tech Stack: ${jobDesc}
Years of Experience: ${JobExperience}

The questions must be relevant to:
1. Deep technical knowledge in React, Node.js, MySQL, and Firebase and Java
2. System architecture and design decisions
3. Problem-solving and debugging skills
4. Common design patterns and testing approaches
5. Team collaboration and communication scenarios

Distribute the questions evenly across these five categories.

Output format:
[
  {
    "question": "What is XYZ?",
    "answer": "XYZ is..."
  },
  ...
]

Only return the JSON array. Do not include any commentary or explanation.
`;



        const result=await chatSession.sendMessage(InputPrompt)
        const MockJsonResp=(result.text).replace('```json','').replace('```','');
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);

        if(MockJsonResp)
        {

        
        const resp=await db.insert(MockInterview).values({
            mockId:uuidv4(),
            jsonMockResp:MockJsonResp,
            jobPosition:jobposition,
            jobDesc:jobDesc,
            jobExperience:JobExperience,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD-MM-yyyy')
        }).returning({mockId:MockInterview.mockId})
        
        console.log("Inserted ID:",resp);
        if(resp)
        {
            setOpenDialog(false);
            router.push('/dashboard/interview/'+resp[0]?.mockId)
        }
    }
    else
    {
        console.log("ERROR");
    }
        setLoading(false);
    }
    return (
        <div>
            <div
                className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-sm cursor-pointer transition-all"
                onClick={() => setOpenDialog(true)}
            >
                <h2 className="font-bold text-lg text-center">+ Add New</h2>
            </div>
            <Dialog open={openDialog}>
                <DialogContent className="w-full max-w-screen-2xl" style={{ width: "1000zvw" }}>
                    <DialogHeader>
                        <DialogTitle className="text-2xl">Tell us more about your job interviewing</DialogTitle>
                        <DialogDescription>
                            <form onSubmit={onSubmit}>
                                <div>
                                    <h2>Add Details about your job position/role, Job description and years of experience</h2>
                                </div>
                                <div className="mt-7 my-3">
                                    <label>Job Role/Job Position</label>
                                    <Input placeholder="Ex. Full Stack Developer" required
                                    onChange={(event)=>setJobPosition(event.target.value)}/>
                                </div>
                                <div className="my-3">
                                    <label>Job Description/Tech Stack (In Short)</label>
                                    <Textarea placeholder="Ex. React, Angular, Nodejs, MySql etc" required
                                    onChange={(event)=>setJobDesc(event.target.value)}/>
                                </div>
                                <div className="my-3">
                                    <label>Years of experience</label>
                                    <Input placeholder="Ex.5" type="number" max="100" required
                                    onChange={(event)=>setJobExperience(event.target.value)}/>
                                </div>
                                <div className="flex gap-5 justify-end">
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {loading?
                                        <>
                                        <LoaderCircle className="animate-spin"/>'Generating from AI'</>:'Start Interview'}
                                        </Button>
                                </div>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>

            </Dialog>
        </div>
    );
};

export default AddNewInterview;
