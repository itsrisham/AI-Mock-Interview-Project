"use client";

import { db } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { use } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Feedback = ({ params }) => {
  const { interviewId } = use(params);

  const [feedbackList, setFeedbackList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    GetFeedBack();
  }, []);

  const GetFeedBack = async () => {
    const result = await db
      .select()
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, interviewId))
      .orderBy(UserAnswer.id);

    // Convert the rating field to an integer
    const updatedFeedbackList = result.map((item) => ({
      ...item,
      rating: parseInt(item.rating, 10), // Convert rating to an integer
    }));

    console.log(updatedFeedbackList);
    setFeedbackList(updatedFeedbackList);
  };

  // Calculate the total rating
  const totalRating = feedbackList.reduce((acc, item) => acc + item.rating, 0);

  // Calculate the average rating (optional)
  const averageRating =
    feedbackList.length > 0 ? totalRating / feedbackList.length : 0;

  return (
    <div className="p-10">
      {feedbackList?.length == 0 ? (
        <h2 className="font-bold text-xl text-gray-500">
          No Interview Feedback Record Found
        </h2>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
          <h2 className="font-bold text-2xl">
            Here is your interview feedback
          </h2>

          <h2 className="text-primary text-lg my-3">
            Your overall interview rating: <strong>{totalRating}/10</strong>{" "}
            {/* Display average rating */}
          </h2>
          <h2 className="text-sm text-gray-500">
            Find below interview question with correct answer, Your answer and
            feedback for improvement
          </h2>
          {feedbackList &&
            feedbackList.map((item, index) => (
              <Collapsible key={index} className="mt-7">
                <CollapsibleTrigger className="p-2 bg-secondary rounded-lg flex justify-between text-left gap-7 w-full">
                  {item.question}
                  <ChevronsUpDown className="h-5 w-5" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-red-500 p-2 border rounded-lg">
                      <strong>Rating: </strong>
                      {item.rating}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-red-50 text-sm text-red-900">
                      <strong>Your Answer: </strong>
                      {item.userAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-green-50 text-sm text-green-900">
                      <strong>Correct Answer: </strong>
                      {item.correctAns}
                    </h2>
                    <h2 className="p-2 border rounded-lg bg-blue-50 text-sm text-primary">
                      <strong>Feedback: </strong>
                      {item.feedback}
                    </h2>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            ))}
        </>
      )}
      <Button
        className="cursor-pointer"
        onClick={() => router.replace("/dashboard")}
      >
        Go Home
      </Button>
    </div>
  );
};

export default Feedback;
