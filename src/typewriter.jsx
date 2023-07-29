import React, { useState, useEffect } from 'react';

const messages = ['The cat and the hat.', 'The quick brown fox.', 'Hello, world!'];

const Typewriter = () => {
  const [rank, setRank] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRank(rank === messages.length - 1 ? 0 : rank + 1);
    }, 3500);
    return () => clearTimeout(timeout);
  }, [rank]);

  return (
    <div className="flex justify-center">
      <div className="typewriter overflow-hidden border-r border-orange-500 whitespace-nowrap mx-auto">
        <h1 className="text-white text-lg font-mono .h1">{messages[rank]}</h1>
      </div>
    </div>
  );
};

export default Typewriter;
