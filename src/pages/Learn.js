import React, { useEffect, useState } from "react";
import Flashcard from "../components/Flashcard";
import { Link } from "react-router-dom";
import "../styles/Learn.css";

const Learn = () => {
  const flashcards_text = `[{"flashcard_id":1,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":1,"user_ref_id":1},{"flashcard_id":2,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":2,"user_ref_id":1},{"flashcard_id":3,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":3,"user_ref_id":1},{"flashcard_id":4,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":4,"user_ref_id":1},{"flashcard_id":5,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":5,"user_ref_id":1},{"flashcard_id":6,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":6,"user_ref_id":1},{"flashcard_id":7,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":7,"user_ref_id":1},{"flashcard_id":8,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":8,"user_ref_id":1},{"flashcard_id":9,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":9,"user_ref_id":1},{"flashcard_id":10,"due_date":"2023-12-02T23:00:00.000Z","priority":-1,"vocabulary_item_ref_id":10,"user_ref_id":1}]`;
  const vocabulary_text = `[{"item_id":1,"korean":"피아노","english":"piano"},{"item_id":2,"korean":"타월","english":"towel"},{"item_id":3,"korean":"데이트","english":"date, dating"},{"item_id":4,"korean":"메시지","english":"message"},{"item_id":5,"korean":"휴가","english":"vacation, holiday"},{"item_id":6,"korean":"영","english":"spirit, zero"},{"item_id":7,"korean":"정도","english":"degree"},{"item_id":8,"korean":"사례","english":"case, example"},{"item_id":9,"korean":"테이블","english":"table"},{"item_id":10,"korean":"평양","english":"Pyongyang"}]`;
  const flashards_json = JSON.parse(flashcards_text);
  const vocabulary_json = JSON.parse(vocabulary_text);
  const [english, setEnglish] = useState("");
  const [korean, setKorean] = useState("");
  const [cardId, setCardId] = useState("");
  const [currentFlashcardNumber, setCurrentFlashcardNumber] = useState(0);

  useEffect(() => {
    setCardId(flashards_json[0].vocabulary_tem_ref_id);
  });

  const next = () => {
    if (currentFlashcardNumber < 9)
      setCurrentFlashcardNumber(currentFlashcardNumber + 1);
  };
  const previous = () => {
    if (currentFlashcardNumber !== 0)
      setCurrentFlashcardNumber(currentFlashcardNumber - 1);
  };
  const setContent = () => {
    setKorean(vocabulary_json[currentFlashcardNumber].korean);
    setEnglish(vocabulary_json[currentFlashcardNumber].english);
  };
  useEffect(() => {
    setContent();
  }, [currentFlashcardNumber, flashards_json]);

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
