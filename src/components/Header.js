import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onPanelAdd, showAddValue }) => {
  const onClick = () => {
    console.log("click");
  };
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        text={showAddValue ? "Add" : "close"}
        color={showAddValue ? "green" : "red"}
        onClick={onPanelAdd}
      />
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
