import React, { useEffect, useState } from "react";
import Flashcard from "../components/Flashcard";
import { Link } from "react-router-dom";
import "../styles/Learn.css";
import axios from "axios";

const Learn = () => {
  const flashcards_text = `[{"flashcard_id":1,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":1,"user_ref_id":1},{"flashcard_id":2,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":2,"user_ref_id":1},{"flashcard_id":3,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":3,"user_ref_id":1},{"flashcard_id":4,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":4,"user_ref_id":1},{"flashcard_id":5,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":5,"user_ref_id":1},{"flashcard_id":6,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":6,"user_ref_id":1},{"flashcard_id":7,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":7,"user_ref_id":1},{"flashcard_id":8,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":8,"user_ref_id":1},{"flashcard_id":9,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":9,"user_ref_id":1},{"flashcard_id":10,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":10,"user_ref_id":1}]`;
  const flashards_json = JSON.parse(flashcards_text);

  const [english, setEnglish] = useState("");
  const [korean, setKorean] = useState("");

  const [currentFlashcardNumber, setCurrentFlashcardNumber] = useState(0);

  const next = () => {
    if (currentFlashcardNumber < 9)
      setCurrentFlashcardNumber(currentFlashcardNumber + 1);
  };
  const previous = () => {
    if (currentFlashcardNumber !== 0)
      setCurrentFlashcardNumber(currentFlashcardNumber - 1);
  };
  const setContent = () => {
    let item_id = flashards_json[currentFlashcardNumber].vocabulary_item_ref_id;
    axios
      .get(`http://localhost:2500/flashcards/get-card/${item_id}`)
      .then((res) => {
        setKorean(res.data[0].korean);
        setEnglish(res.data[0].english);
      });
  };
  useEffect(() => {
    setContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFlashcardNumber]);

  return (
    <div className="flashcard_container">
      <Flashcard english={english} korean={korean}></Flashcard>
      <div className="navigation_container">
        <div className="navigation_button" onClick={previous}>
          Previous
        </div>
        <div className="navigation_button" onClick={next}>
          Next
        </div>
      </div>
      <Link className="navigation_text" to="/">
        Finish Learning
      </Link>
    </div>
  );
};

export default Learn;
