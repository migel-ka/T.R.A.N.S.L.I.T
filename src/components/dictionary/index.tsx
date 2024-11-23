import { FC } from "react";
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
        <div className={style.containerLiGrey}>1. Привет 👋🏻</div>
        <div className={style.containerLiDarkGrey}>
          Privet{" "}
          <button className={style.containerLiBtn}>
            <img src={DEL} alt="close" />
          </button>
        </div>
      </li>
      {words.map((word, index) => (
        <li key={index} className={style.containerLi}>
          <div className={style.containerLiGrey}>
            {`${index + 2}. `}
            <div className={style.containerLiGreyText}>{word}</div>
          </div>
          <div className={style.containerLiDarkGrey}>
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
      ))}
    </ol>
  );
};

export default Dictionary;
