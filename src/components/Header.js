import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation} from 'react-router-dom'

const Header = ({ title, onPanelAdd, showAddValue }) => {
//   const onClick = () => {
//     console.log("click");
//   };

const location = useLocation()

  return (
    <header className="header">
      <h1>{title}</h1>
      { location.pathname === '/'&& <Button
        text={showAddValue ? "Add" : "close"}
        color={showAddValue ? "green" : "red"}
        onClick={onPanelAdd}
      />}
    </header>
  );
};

Header.defaultProps = {
  title: "React Learning"
};

Header.propTypes = {
  title: PropTypes.string.isRequired
};

export default Header;
