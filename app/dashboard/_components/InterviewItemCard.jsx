import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const InterviewItemCard = ({ interview }) => {
    const router=useRouter();
    const onStart=()=>{
        router.push('/dashboard/interview/'+interview?.mockId)
    }

    const onFeedBackPress=()=>{
        router.push('/dashboard/interview/'+interview.mockId+'/feedback')
    }
  return (
    <div className="border shadow-sm rounded-lg p-3">
      <h2 className="font-bold text-primary">{interview?.jobPosition}</h2>
      <h2 className="text-sm text-gray-600">
        {interview?.jobExperience} Years of Experience
      </h2>
      <h2 className="text-xs text-gray-400">
        Created At:{interview.createdAt}
      </h2>
      <div className="flex justify-between mt-2 gap-5">
        <div className="w-full">
          <Button size="sm" variant="outline" className="w-full cursor-pointer"
          onClick={onFeedBackPress}>
            FeedBack
          </Button>
        </div>
        <div className="w-full">
          <Button size="sm" className="w-full cursor-pointer" onClick={onStart}>
            Start
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewItemCard;
