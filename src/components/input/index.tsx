import { useState } from "react";
import style from "./style.module.css";
import Dictionary from "../dictionary";
import BtnClose from "../btnClose";

function Input() {
  const [inputValue, setInputValue] = useState("");
  const [words, setWords] = useState<string[]>([]);

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
  };

  const handleDelete = (index: number) => {
    setWords((prevWords) => prevWords.filter((_, i) => i !== index));
  };

  const handleDeleteAll = () => {
    setWords([]);
  };

  const handleButtonClick = () => {
    if (inputValue.trim()) {
      setWords([...words, inputValue]);
      setInputValue("");
    }
  };

  const handleKeyPress = (event: any) => {
    if (event.key === "Enter") {
      handleButtonClick();
    }
  };

  return (
    <>
      <div className={style.container}>
        <input
          type="text"
          placeholder="Начните вводить текст"
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className={style.containerBtn} onClick={handleButtonClick}>
          Добавить
        </button>
      </div>
      <Dictionary words={words} onDelete={handleDelete} />
      <BtnClose onDeleteAll={handleDeleteAll}/>
    </>
  );
}

export default Input;
