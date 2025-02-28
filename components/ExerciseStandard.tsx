import React from "react";

interface ExerciseStandardProps {
  number: number;
  title: string;
  requirements: string[];
  noReps: string[];
}

const ExerciseStandard: React.FC<ExerciseStandardProps> = ({
  number,
  title,
  requirements,
  noReps,
}) => {
  return (
    <div className="mb-12">
      <h4 className="text-xl font-bold mb-4 text-blue-300 flex items-center">
        <span className="inline-block w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center mr-3">
          {number}
        </span>
        {title}
      </h4>

      <div className="grid md:grid-cols-2 gap-6 mb-4">
        <div className="bg-gray-900/80 rounded-lg p-5 border-l-4 border-green-500">
          <h5 className="font-bold text-green-400 mb-3 uppercase text-sm tracking-wider">
            요구사항
          </h5>
          <ul className="space-y-2 text-gray-200">
            {requirements.map((req, index) => (
              <li key={index} className="flex items-start">
                <span className="text-green-400 mr-2">•</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray-900/80 rounded-lg p-5 border-l-4 border-red-500">
          <h5 className="font-bold text-red-400 mb-3 uppercase text-sm tracking-wider">
            일반적인 No-Reps
          </h5>
          <ul className="space-y-2 text-gray-200">
            {noReps.map((noRep, index) => (
              <li key={index} className="flex items-start">
                <span className="text-red-400 mr-2">✗</span>
                {noRep}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExerciseStandard;
