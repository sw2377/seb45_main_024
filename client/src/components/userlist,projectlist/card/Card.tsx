import CardEdit from "./CardEdit";
import CardView from "./CardView";
import {
  CardType,
  CardDataType,
  UserListDataType,
} from "../../../model/boardTypes";

import classes from "./CardStyle.module.css";

interface CardProps {
  type: CardType;
  cardData: CardDataType;
  isEdit?: boolean;
}

const Card = ({ type, cardData, isEdit }: CardProps) => {
  return (
    <li className={classes.cardWrapper}>
      {isEdit ? (
        <CardEdit cardData={cardData as UserListDataType} />
      ) : (
        <CardView cardData={cardData} type={type} />
      )}
    </li>
  );
};

export default Card;
