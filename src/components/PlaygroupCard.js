import React from 'react';

function PlaygroupCard({ playgroup }) {
  const { Date, Time, Service, Name, Address, Age, Day, Language, URL } = playgroup;

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">{Service}</h2>
      <p><span className="font-bold">Date:</span> {Date}</p>
      <p><span className="font-bold">Time:</span> {Time}</p>
      <p><span className="font-bold">Name:</span> {Name}</p>
      <p><span className="font-bold">Address:</span> {Address}</p>
      <p><span className="font-bold">Age:</span> {Age}</p>
      <p><span className="font-bold">Day:</span> {Day}</p>
      <p><span className="font-bold">Language:</span> {Language}</p>
      {URL && <a href={URL} target="_blank" rel="noopener noreferrer" className="text-blue-500">More Info</a>}
    </div>
  );
}

export default PlaygroupCard;
