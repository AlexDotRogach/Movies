import css from './MovieSearch.module.css';
import Input from '@mui/material/Input';
import { TextField, Button } from '@mui/material';
const MovieSearch = ({ searchMovie }) => {
  return (
    <form className={css.form} onSubmit={searchMovie}>
      <TextField
        id="outlined-basic"
        label="Write name of movie!"
        variant="outlined"
        name="query"
      />

      <div className={css.button}>
        <Button variant="text" type="submit">
          Search
        </Button>
      </div>
    </form>
  );
};

export default MovieSearch;
