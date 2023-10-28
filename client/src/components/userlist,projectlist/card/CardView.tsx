import { useNavigate } from "react-router-dom";
import CardViewFront from "./CardViewFront";
import CardViewBack from "./CardViewBack";

import classes from "./CardStyle.module.css";

import {
  CardType,
  CardDataType,
  UserListDataType,
  ProjectListDataType,
} from "../../../model/boardTypes";

interface CardViewProps {
  type: CardType;
  cardData: CardDataType;
}

const CardView = ({ type, cardData }: CardViewProps) => {
  const isUserCard = type === "USER_CARD";
  const { memberBoardId } = cardData as ProjectListDataType;

  const navigate = useNavigate();

  return (
    <div
      className={`${classes.card} ${
        isUserCard ? classes.user : classes.project
      }`}
      onClick={
        isUserCard ? undefined : () => navigate(`/projectlist/${memberBoardId}`)
      }
    >
      <CardViewFront type={type} cardData={cardData} />
      {isUserCard && <CardViewBack cardData={cardData as UserListDataType} />}
    </div>
  );
};

export default CardView;
