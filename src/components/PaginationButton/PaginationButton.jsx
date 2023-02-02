import css from './PaginationButton.module.css';
import Pagination from '@mui/material/Pagination';
const PaginationButton = ({ total, changePage }) => {
  const handleChange = (event, value) => changePage(value);

  return (
    <div className={css.wrapper}>
      <Pagination
        count={total}
        showFirstButton
        showLastButton
        color="primary"
        onChange={handleChange}
      />
    </div>
  );
};

export default PaginationButton;
