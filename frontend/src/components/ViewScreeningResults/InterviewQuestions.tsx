import { useState } from 'react';

export default function InterviewQuestions({ res }: { res: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(res.interviewQuestions.join('\n'));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error('Copy failed:', err);
    }
  };

  return (
    <div>
      {/* Interview Questions */}
      <div className='mt-4 bg-gray-300 p-4 rounded-md border'>
        <div className='flex justify-between items-center'>
          <p className='font-semibold text-gray-800'>
            Suggested Interview Questions
          </p>
          <button
            onClick={handleCopy}
            className={`relative overflow-hidden text-sm px-4 py-1 rounded 
        transition-colors duration-500 ease-in-out
        flex items-center gap-1
      ${
        copied
          ? 'bg-amber-700 text-gray-200'
          : 'bg-green-900 text-gray-200 hover:bg-green-800'
      }
  `}
          >
            <span
              className={`
          absolute transition-all duration-500 ease-in-out
          ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5'}
        `}
            >
              ✅ Copied
            </span>

            <span
              className={`
          transition-all duration-500 ease-in-out
          ${copied ? 'opacity-0 translate-y-5' : 'opacity-100 translate-y-0'}
        `}
            >
              Copy Questions
            </span>
          </button>
        </div>
        <ul className='list-decimal list-inside text-sm text-gray-700 space-y-1 mt-2'>
          {res.interviewQuestions.map((q: string, i: number) => (
            <li key={i}>{q}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
