import NavBar from "./navbar/NavBar";
import NavItem from "./navbar/NavItem";

const PopulatedNavBar = () => {
  let accType;

  return (
    <NavBar>
      <NavItem>SPEED</NavItem>
      <NavItem route="/" end>
        HOME
      </NavItem>
      <NavItem route="/search">
        SEARCH
      </NavItem>
      <NavItem route="/submit">
        SUBMIT
      </NavItem>
      {accType === "moderator" ? 
        <NavItem route="/moderate">
          MODERATE
        </NavItem> 
      : null}
      {accType === "analyst" ? 
        <NavItem route="/analyse">
          MODERATE
        </NavItem> 
      : null}
    </NavBar>
  );
};
export default PopulatedNavBar;
