import { ArrowLeftSvg } from "../../assets/icons/arrowsSvg";
import { ArrowRightSvg } from "../../assets/icons/arrowsSvg";
import classes from "./Pagination.module.css";

type Props = {
  totalCards: number;
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pagination = ({ totalCards, currentPage, onChangePage }: Props) => {
  const cardPerPage = 8; // 한 페이지 당 노출할 카드 갯수
  const totalPage = Math.ceil(totalCards / cardPerPage);

  const handlePageChange = (page: number) => {
    onChangePage(page);
  };

  return (
    <div className={classes.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ArrowLeftSvg stroke="var(--color-main)" />
      </button>
      {[...Array(totalPage)].map((_, index) => (
        <button
          key={index}
          className={index + 1 === currentPage ? `${classes.active}` : ""}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPage}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        <ArrowRightSvg stroke="var(--color-main)" />
      </button>
    </div>
  );
};

export default Pagination;
