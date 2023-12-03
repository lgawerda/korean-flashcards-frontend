import React, { useEffect, useState } from "react";
import Flashcard from "../components/Flashcard";
import { Link } from "react-router-dom";
import "../styles/Review.css";
import axios from "axios";

const Review = () => {
  const flashcards_text = `[{"flashcard_id":1,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":1,"user_ref_id":1},{"flashcard_id":2,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":2,"user_ref_id":1},{"flashcard_id":3,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":3,"user_ref_id":1},{"flashcard_id":4,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":4,"user_ref_id":1},{"flashcard_id":5,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":5,"user_ref_id":1},{"flashcard_id":6,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":6,"user_ref_id":1},{"flashcard_id":7,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":7,"user_ref_id":1},{"flashcard_id":8,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":8,"user_ref_id":1},{"flashcard_id":9,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":9,"user_ref_id":1},{"flashcard_id":10,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":10,"user_ref_id":1}]`;
  const flashards_json = JSON.parse(flashcards_text);

  const [english, setEnglish] = useState("");
  const [korean, setKorean] = useState("");
  const [currentFlashcardNumber, setCurrentFlashcardNumber] = useState(0);
  const [succeses, setSucceses] = useState(0);
  const [failures, setFailures] = useState(0);
  const [finished, setFinished] = useState(false);

  const next = () => {
    if (currentFlashcardNumber < 9)
      setCurrentFlashcardNumber(currentFlashcardNumber + 1);
    else setFinished(true);
  };

  const setContent = () => {
    let item_id = flashards_json[currentFlashcardNumber].vocabulary_item_ref_id;
    axios
      .get(`http://localhost:2500/flashcards/get-card/${item_id}`)
      .then((res) => {
        console.log(res);
        setKorean(res.data[0].korean);
        setEnglish(res.data[0].english);
      });
  };

  const succeedCard = () => {
    setSucceses(succeses + 1);
    next();
  };

  const failCard = () => {
    setFailures(failures + 1);
    next();
  };

  useEffect(() => {
    setContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFlashcardNumber]);

  return (
    <>
      {finished ? (
        <>
          <div className="flashcard_container">
            <div className="review_text">Good job!</div>
            <div className="review_text">Today's stats:</div>
            <div className="review_text">Learned: {succeses}</div>
            <div className="review_text">Failed: {failures}</div>
            <Link className="navigation_text" to="/">
              Back to home
            </Link>
          </div>
        </>
      ) : (
        <div className="flashcard_container">
          <Flashcard english={english} korean={korean}></Flashcard>
          <div className="navigation_container">
            <div
              className="navigation_button review_button succeed"
              onClick={succeedCard}
            ></div>
            <div
              className="navigation_button review_button fail"
              onClick={failCard}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
