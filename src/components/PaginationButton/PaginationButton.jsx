import css from './PaginationButton.module.css';
import Pagination from '@mui/material/Pagination';
const screenWidth = window.innerWidth;

const PaginationButton = ({ page, total, changePage }) => {
  const paginationSize = screenWidth < 550 ? 'small' : 'large';
  const showButtons = screenWidth > 550;
  const handleChange = (event, value) => changePage(value);

  return (
    <div className={css.wrapper}>
      <Pagination
        count={total}
        color="primary"
        onChange={handleChange}
        size={paginationSize}
        page={page}
        showFirstButton={showButtons}
        showLastButton={showButtons}
      />
    </div>
  );
};

export default PaginationButton;
