import { FC, useEffect, useRef, useState } from "react";
import style from "./style.module.css";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import DEL from "..//img/Del.png";

interface Props {
  words: string[];
  onDelete: (index: number) => void;
}

const Dictionary: FC<Props> = ({ words, onDelete }) => {
  return (
    <ol className={style.container}>
      <li className={style.containerLi}>
        <div className={style.containerLiGrey}>Привет 👋🏻</div>
        <div className={style.containerLiDarkGrey}>Privet</div>
      </li>
      {words.map((word, index) => (
        <WordItem key={index} word={word} index={index} onDelete={onDelete} />
      ))}
    </ol>
  );
};

const WordItem: FC<{
  word: string;
  index: number;
  onDelete: (index: number) => void;
}> = ({ word, index, onDelete }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const wordRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkOverflow = () => {
      if (wordRef.current) {
        const isOverflowing =
          wordRef.current.scrollWidth > wordRef.current.clientWidth;
        setShowTooltip(isOverflowing);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [word]);

  return (
    <li className={style.containerLi}>
      <div className={style.containerLiGrey} ref={wordRef}>
        {showTooltip && <div className={style.tollTip}>{word}</div>}
        {word}
      </div>
      <div className={style.containerLiDarkGrey}>
        {showTooltip && (
          <div className={style.tollTip}>
            {cyrillicToTranslit().transform(word)}
          </div>
        )}
        <div className={style.containerLiDarkGreyText}>
          {cyrillicToTranslit().transform(word)}
        </div>
        <button
          className={style.containerLiBtn}
          onClick={() => onDelete(index)}
        >
          <img src={DEL} alt="close" />
        </button>
      </div>
    </li>
  );
};

export default Dictionary;
