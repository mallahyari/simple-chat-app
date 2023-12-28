import React from 'react';
import { useChat } from 'ai/react';

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: 'http://localhost:8010/api/v1/ask',
  });

  const formatDate = (date: Date | undefined): string => {
    if (!date) return '';
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      timeZoneName: 'short',
    };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <main className="mx-auto mt-80 w-full max-w-xl p-8 flex flex-col bg-gray-100 rounded-lg shadow-lg">
      <section className="flex-grow mb-4 overflow-auto h-96">
        {messages.map((m) => (
          <div className="flex mb-4" key={m.id}>
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full mr-4 ${
                m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'
              }`}
            >
              {m.role === 'user' ? 'U' : 'AI'}
            </div>
            <div className="flex flex-col">
              <div
                className={`p-4 max-w-md rounded-lg text-left ${
                  m.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 '
                }`}
              >
                {m.content}
              </div>
              <span className="text-xs text-left mt-1 text-gray-500">
                {formatDate(m.createdAt)}
              </span>
            </div>
          </div>
        ))}
      </section>
      <form className="flex space-x-4" onSubmit={handleSubmit}>
        <input
          className="flex-grow w-48 rounded-md p-2 text-black focus:outline-none focus:ring focus:border-blue-300"
          value={input}
          onChange={handleInputChange}
          placeholder="Say something..."
        />
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
          type="submit"
        >
          Send
        </button>
      </form>
    </main>
  );
}
