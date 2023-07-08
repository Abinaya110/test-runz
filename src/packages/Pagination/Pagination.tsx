import classNames from "classnames/bind";
import SvgBack from "../../icons/SvgBack";
import SvgNext from "../../icons/SvgNext";
import Button from "../Button/Button";
import Flex from "../Flex/Flex";
import styles from "./pagination.module.css";
import { gray2, textShade3 } from "../../theme/colors";
import Text from "../Text/Text";

const cx = classNames.bind(styles);

const Pagination = ({ currentPage, totalPages, onPageChange }: any) => {
  // Calculate the range of page numbers to display
  const range = [];
  const maxPages = 10; // Maximum number of page numbers to show
  const ellipsis = "...";
  const pageSize = 10; // Number of items per page

  // Helper function to add page numbers to the range
  const addPageToRange = (page: any) => {
    range.push(
      <Button
        textColors={currentPage === page ? "primary" : "shade-3"}
        className={cx("btnCommon", "btnMargin", {
          btnActive: currentPage === page,
          btnDeActive: currentPage !== page,
        })}
        key={page}
        onClick={() => onPageChange(page)}
      >
        {page}
      </Button>
    );
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  if (totalPages <= maxPages) {
    // If the total number of pages is less than or equal to the maximum, show all page numbers
    for (let i = 1; i <= totalPages; i++) {
      addPageToRange(i);
    }
  } else {
    // Show a truncated range of page numbers with an ellipsis in between
    const leftEllipsis = currentPage - 3 > 1;
    const rightEllipsis = currentPage + 3 < totalPages;

    addPageToRange(1); // Always show the first page

    if (leftEllipsis) {
      range.push(
        <Button
          style={{ marginLeft: 4 }}
          className={cx("btnCommon", "btnDeActive")}
        >
          {ellipsis}
        </Button>
      );
    }

    // Calculate the starting and ending page numbers for the range
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      addPageToRange(i);
    }

    if (rightEllipsis) {
      range.push(
        <Button
          style={{ marginLeft: 4 }}
          className={cx("btnCommon", "btnDeActive")}
        >
          {ellipsis}
        </Button>
      );
    }

    addPageToRange(totalPages); // Always show the last page
  }
  const rangeStart = (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalPages);

  if (totalPages === 0) {
    return <></>;
  }
  return (
    <Flex row center between>
      <Flex>
        <Text type="captionBold" color="shade-3">
          Showing {rangeStart < 10 ? `0${rangeStart}` : rangeStart} -{" "}
          {rangeEnd < 10 ? `0${rangeEnd}` : rangeEnd} out of {totalPages}
        </Text>
      </Flex>
      <Flex row center>
        <Button
          types="link"
          onClick={handlePrevClick}
          disabled={currentPage === 1}
        >
          <SvgBack fill={textShade3} fillOne={gray2} />
        </Button>

        {range}
        <Button
          style={{ marginLeft: 4 }}
          types="link"
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          <SvgNext fill={textShade3} fillOne={gray2} />
        </Button>
      </Flex>
    </Flex>
  );
};

export default Pagination;
