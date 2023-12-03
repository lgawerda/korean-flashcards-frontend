import React, { useState, useEffect } from "react";
import "../styles/Flashcard.css";

const Flashcard = ({ english, korean }) => {
  const [flip, setFlip] = useState(false);
  const flipOnce = () => setFlip((current) => !current);

  return (
    <>
      {flip ? (
        <div onClick={flipOnce} className="flashcard pink">
          {korean}
        </div>
      ) : (
        <div onClick={flipOnce} className="flashcard blue">
          {english}
        </div>
      )}
    </>
  );
};

export default Flashcard;
