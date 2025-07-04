import { Lightbulb, Volume2 } from "lucide-react";
import React from "react";

const QuestionsSection = ({ mockInterviewQuestion, activeQuestionIndex }) => {
  const textToSpeach=(text)=>{
    if('speechSynthesis' in window)
      {
        const speech=new SpeechSynthesisUtterance(text)
        window.speechSynthesis.speak(speech);
      } 
      else
      {
        alert("Sorry, Your browser does not support text to speech");
      }
  }
  return mockInterviewQuestion&&(
    <div className="p-5 border rounded-lg ml-40 my-10">
      <div className="grid grid-cols-2 md:grod-cols-3 lg:grid-cols-4 gap-5">
        {mockInterviewQuestion &&
          mockInterviewQuestion.map((question, index) => (
            <h2
              key={index}
              className={`p-2 rounded-full text-xs md:text-sm text-center cursor-pointer ${
                activeQuestionIndex === index
                  ? "bg-primary text-white"
                  : "bg-secondary"
              }`}
            >
              Question #{index + 1}
            </h2>
          ))}
      </div>
      <h2 className="my-5 text-md md:text-lg">{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
      <Volume2 className="cursor-pointer" onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}/>
      
      <div className="border rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-5 items-center text-primary">
            <Lightbulb/>
            <strong>Note:</strong>
        </h2>
        <h2 className="text-sm text-primary my-2">{process.env.NEXT_PUBLIC_QUESTION_NOTE}</h2>
      </div>
    </div>
  );
};

export default QuestionsSection;
