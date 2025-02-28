import React from "react";

interface AspirationsInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  handleSubmit: () => void;
}

const AspirationsInput: React.FC<AspirationsInputProps> = ({
  inputText,
  setInputText,
  handleSubmit,
}) => {
  return (
    <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-white/20 transition-all duration-300 hover:shadow-xl">
      <label
        htmlFor="aspirations"
        className="block text-lg font-semibold mb-3 text-blue-100 tracking-wide"
      >
        CrossFit 2025 Open 각오 한마디 !
      </label>
      <div className="flex items-center gap-2">
        <div className="relative flex-grow">
          <input
            id="aspirations"
            type="text"
            placeholder="여기에 작성..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full p-4 rounded-lg bg-white/90 text-gray-800 
            placeholder:text-gray-500 focus:outline-none focus:ring-2 
            focus:ring-blue-400 focus:bg-white transition-all duration-200
            shadow-inner"
          />
        </div>
        <button
          className="p-5 bg-gradient-to-r from-blue-500 to-indigo-600 
        text-white font-bold rounded-lg hover:from-blue-600 hover:to-indigo-700 
        transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center
        min-w-[56px] h-[56px]"
          onClick={handleSubmit}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AspirationsInput;
