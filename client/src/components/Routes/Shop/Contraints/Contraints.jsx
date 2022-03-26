import classes from './Contraints.module.css';
import Filters from './Filters/Filters';
import SelectedContraints from './SelectedContraints/SelectedContraints';
import Sort from './Sort/Sort';

const Contraints = ({ className = '' }) => {
  return (
    <div className={`${className} ${classes.constraints}`}>
      <div className={`${classes.constraints__top}`}>
        <Filters />
        <Sort />
      </div>
      <div className={classes.constraints__bottom}>
        <SelectedContraints />
      </div>
    </div>
  );
};

export default Contraints;
