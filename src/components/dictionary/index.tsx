import { FC, useState, useRef } from "react";
import style from "./style.module.css";
import cyrillicToTranslit from "cyrillic-to-translit-js";
import DEL from "..//img/Del.png";

interface Props {
  words: string[];
  onDelete: (index: number) => void;
}

const Tooltip: FC<{
  text: string;
  position: { top: number; left: number };
}> = ({ text, position }) => (
  <div
    className={style.tooltip}
    style={{ top: position.top, left: position.left }}
  >
    {text}
  </div>
);

const Dictionary: FC<Props> = ({ words, onDelete }) => {
  const [tooltipData, setTooltipData] = useState<{
    text: string;
    position: { top: number; left: number };
  } | null>(null);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]); // Ссылка на элементы текста

  const checkIfTextIsTruncated = (index: number): boolean => {
    if (textRefs.current[index]) {
      const textElement = textRefs.current[index];
      return textElement.scrollWidth > textElement.clientWidth; // Проверяем, обрезан ли текст
    }
    return false;
  };

  const handleMouseEnter = (
    index: number,
    word: string,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (checkIfTextIsTruncated(index)) {
      const { top, left } = event.currentTarget.getBoundingClientRect();
      setTooltipData({
        text: word,
        position: {
          top: top + window.scrollY - 45,
          left: left + window.scrollX - 20,
        },
      });
    }
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
  };

  return (
    <>
      <ol className={style.container}>
        <li className={style.containerLi}>
          <div className={style.containerLiGrey}>
            <b>1</b>
            <div className={style.containerLiGreyText}>Привет 👋🏻</div>
          </div>
          <div className={style.containerLiDarkGrey}>
            <div className={style.containerLiDarkGreyText}> Privet</div>
            <button className={style.containerLiBtn}>
              <img src={DEL} alt="close" />
            </button>
          </div>
        </li>
        {words.map((word, index) => (
          <li key={index} className={style.containerLi}>
            <div className={style.containerLiGrey}>
              <b> {index + 2}</b>
              <div
                ref={(el) => (textRefs.current[index] = el)} // Сохраняем ссылку на элемент
                className={style.containerLiGreyText}
                onMouseEnter={(event) => handleMouseEnter(index, word, event)}
                onMouseLeave={handleMouseLeave}
              >
                {word}
              </div>
            </div>
            <div className={style.containerLiDarkGrey}>
              <div
                className={style.containerLiDarkGreyText}
                onMouseEnter={(event) =>
                  handleMouseEnter(
                    index,
                    cyrillicToTranslit().transform(word),
                    event
                  )
                }
                onMouseLeave={handleMouseLeave}
              >
                <div></div>
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
      {tooltipData && (
        <Tooltip text={tooltipData.text} position={tooltipData.position} />
      )}
    </>
  );
};

export default Dictionary;
