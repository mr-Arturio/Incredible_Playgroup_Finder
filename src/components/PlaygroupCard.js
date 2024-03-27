import React from 'react';

// Placeholder for language icons. You should replace these with your actual icons or SVG paths.
const languageIcons = {
  English: '/english.svg', // replace with your actual path to the English icon
  French: '/french.svg',  // replace with your actual path to the French icon
  // Add more languages and their icon paths as needed
};

function PlaygroupCard({ playgroup }) {
  const { Date, Time, Name, Address, Age, Day, Language, URL, Service } = playgroup;

  // This function returns the path to the language icon based on the language passed.
  // You can replace it with actual image paths or SVG elements.
  const getLanguageIcon = (language) => languageIcons[language] || '/icons/default.svg'; // replace with your default icon

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 relative">
      <div className="flex justify-between items-start p-6">
        <div>
          <h2 className="block mt-2 text-xl leading-tight font-semibold text-gray-800">{Name}</h2>
          <p className="mt-3 text-gray-600 text-sm">{Day}, {Date}</p>
        </div>
        <div className="text-sm font-semibold text-gray-500 bg-gray-200 px-3 py-1 rounded-full">{Service}</div>
      </div>
      <div className="px-6 pb-6">
        <div className="flex items-center text-gray-700">
          <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path d="M18 10c0 3.866-3.582 7-8 7s-8-3.134-8-7 3.582-7 8-7 8 3.134 8 7zm-9 3v4H9v-4H7l3-3 3 3h-2zm-1-3V6H8v4H6l3 3 3-3h-2zm1-7h2v3h-2V3z" />
          </svg>
          <span className="ml-2">{Time}</span>
        </div>
        <div className="flex items-center mt-2 text-gray-700">
          <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-9h2v2h-2v-2zm-3 0h2v2H8v-2zm-2 0h2v2H6v-2z" clipRule="evenodd" />
          </svg>
          <span className="ml-2">{Address}</span>
        </div>
        <div className="flex items-center mt-2 text-gray-700">
          <svg className="h-5 w-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a2 2 0 002 2h12a2 2 0 002-2V4a2 2 0 00-2-2H4zm3 4a1 1 0 112 0 1 1 0 01-2 0zm9 9H4v-1a2 2 0 012-2h8a2 2 0 012 2v1z" clipRule="evenodd" />
          </svg>
          <span className="ml-2">{Age} Years</span>
        </div>
      </div>
      {URL && (
        <div className="bg-gray-100 p-4">
          <a href={URL} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 visited:text-purple-600">More Info</a>
        </div>
      )}
      <div className="absolute bottom-4 right-4 flex items-center">
        <img src={getLanguageIcon(Language)} alt={`${Language} icon`} className="h-7 w-7" />
      </div>
    </div>
  );
}

export default PlaygroupCard;
