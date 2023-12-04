import React, { useEffect, useState } from "react";
import Flashcard from "../components/Flashcard";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Learn.css";
import axios from "axios";
var flashcardArray;

const Learn = () => {
  const [english, setEnglish] = useState("");
  const [korean, setKorean] = useState("");
  const [currentFlashcardNumber, setCurrentFlashcardNumber] = useState(0);
  const [count, setCount] = useState(false);
  const [isItems, setIsItems] = useState(false);
  const navigate = useNavigate();

  const next = () => {
    if (currentFlashcardNumber < flashcardArray.length - 1)
      setCurrentFlashcardNumber(currentFlashcardNumber + 1);
  };
  const previous = () => {
    if (currentFlashcardNumber !== 0)
      setCurrentFlashcardNumber(currentFlashcardNumber - 1);
  };

  const setContent = () => {
    let item_id = flashcardArray[currentFlashcardNumber].vocabulary_item_ref_id;
    console.log(flashcardArray);
    axios
      .get(`http://localhost:2500/flashcards/get-card/${item_id}`)
      .then((res) => {
        setKorean(res.data[0].korean);
        setEnglish(res.data[0].english);
      });
  };
  const addNew = () => {
    axios.get("http://localhost:2500/flashcards/get-new").then(() => {
      navigate("/Learn");
      window.location.reload();
    });
  };

  useEffect(() => {
    const getData = () => {
      axios.get("http://localhost:2500/flashcards/get-learning").then((res) => {
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

  useEffect(() => {
    if (count) setContent();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentFlashcardNumber]);

  return (
    <>
      {isItems ? (
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
      ) : (
        <div className="container">
          <div className="text">No items in learning!</div>
          <div className="home-link" onClick={addNew}>
            Learn 10 new words!
          </div>
        </div>
      )}
    </>
  );
};

export default Learn;
