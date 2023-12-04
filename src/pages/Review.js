import React, { useEffect, useState } from "react";
import Flashcard from "../components/Flashcard";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Review.css";
import axios from "axios";
var flashcardArray;

const Review = () => {
  const [english, setEnglish] = useState("");
  const [korean, setKorean] = useState("");
  const [currentFlashcardNumber, setCurrentFlashcardNumber] = useState(0);
  const [succeses, setSucceses] = useState(0);
  const [failures, setFailures] = useState(0);
  const [finished, setFinished] = useState(false);
  const [count, setCount] = useState(false);
  const [isItems, setIsItems] = useState(false);
  const navigate = useNavigate();

  const next = () => {
    if (currentFlashcardNumber < flashcardArray.length - 1)
      setCurrentFlashcardNumber(currentFlashcardNumber + 1);
    else setFinished(true);
  };

  const setContent = () => {
    let item_id = flashcardArray[currentFlashcardNumber].vocabulary_item_ref_id;
    axios
      .get(`http://localhost:2500/flashcards/get-card/${item_id}`)
      .then((res) => {
        setKorean(res.data[0].korean);
        setEnglish(res.data[0].english);
      });
  };

  useEffect(() => {
    const getData = () => {
      axios.get("http://localhost:2500/flashcards/get-due").then((res) => {
        //setFlashcardArray(res.data);
        flashcardArray = res.data;
        if (flashcardArray) {
          setIsItems(true);
          setContent();
        }
        setCount(true);
      });
    };
    getData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const succeedCard = () => {
    let flashcard_id = flashcardArray[currentFlashcardNumber].flashcard_id;
    axios.post(`http://localhost:2500/flashcards/succeed-card/${flashcard_id}`);

    setSucceses(succeses + 1);
    next();
  };

  const failCard = () => {
    let flashcard_id = flashcardArray[currentFlashcardNumber].flashcard_id;
    axios.post(`http://localhost:2500/flashcards/fail-card/${flashcard_id}`);

    setFailures(failures + 1);
    next();
  };
  const addNew = () => {
    axios.get("http://localhost:2500/flashcards/get-new").then(() => {
      navigate("/Learn");
      window.location.reload();
    });
  };

  useEffect(() => {
    if (count) setContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFlashcardNumber]);

  return (
    <>
      {isItems ? (
        <>
          {finished ? (
            <>
              <div className="flashcard_container">
                <div className="review_text">Good job!</div>
                <div className="review_text">Today's stats:</div>
                <div className="review_text">Learned: {succeses}</div>
                <div className="review_text">Failed: {failures}</div>
                <Link className="home-link pink" to="/">
                  Back to home
                </Link>
              </div>
            </>
          ) : (
            <div className="flashcard_container">
              <Flashcard english={english} korean={korean}></Flashcard>
              <div className="navigation_container">
                <div
                  className="navigation_button review_button fail"
                  onClick={failCard}
                ></div>
                <div
                  className="navigation_button review_button succeed"
                  onClick={succeedCard}
                ></div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="container">
            <div className="text">No items due today! Congratulations!</div>
            <div className="home-link" onClick={addNew}>
              Learn 10 new words!
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Review;
