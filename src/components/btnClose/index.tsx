import { FC } from "react";
import style from "./style.module.css";
import DEL from "..//img/Del.png";

interface Props {
  onDeleteAll: () => void;
}

const BtnClose: FC<Props> = ({ onDeleteAll }) => {
  return (
    <div className={style.container}>
      <button className={style.containerBtn} onClick={onDeleteAll}>
       <img src={DEL} alt="dellAll" /> Очистить всё
      </button>
    </div>
  );
};

export default BtnClose;
