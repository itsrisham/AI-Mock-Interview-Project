"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection.jsx';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button.jsx';
import Link from 'next/link.js';
const RecordAnswerSection = dynamic(() => import('./_components/RecordAnswerSection.jsx'), {
  ssr: false,
});

const StartInterview = () => {
    const [interviewData,setInterviewData]=useState();
    const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
    const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
    const params=useParams();
    useEffect(()=>{
        GetInterviewDetails();
    },[])
    const GetInterviewDetails = async () => {
        const result = await db
          .select()
          .from(MockInterview)
          .where(eq(MockInterview.mockId, params.interviewId));
        
        const jsonMockResp=JSON.parse(result[0].jsonMockResp);
        console.log(jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        setInterviewData(result[0]);
      };
  return (
    <div>
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <QuestionsSection mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        />
        <RecordAnswerSection
        key={activeQuestionIndex}
        mockInterviewQuestion={mockInterviewQuestion}
        activeQuestionIndex={activeQuestionIndex}
        interviewData={interviewData}
        />
    </div>
    <div className='flex justify-end gap-6 mx-15 mb-15'>
      {activeQuestionIndex>0 && <Button className='cursor-pointer' onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
      {activeQuestionIndex!=mockInterviewQuestion?.length-1 && <Button className='cursor-pointer' onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
     {activeQuestionIndex==mockInterviewQuestion?.length-1 &&
     <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
     <Button className='cursor-pointer'>End Interview</Button>
     </Link>}
    </div>
    </div>
  )
}

export default StartInterview
