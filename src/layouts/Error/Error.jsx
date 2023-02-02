import css from './Error.module.css';

const App = ({ error }) => {
  return (
    <div className={css.errorWrapper}>
      <div>You have troubles!</div>
      {error && <div>Error - {error}</div>}
    </div>
  );
};

export default App;
