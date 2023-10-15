import NavBar from "./navbar/NavBar";
import NavItem from "./navbar/NavItem";

const PopulatedNavBar = () => {
  let accType = "moderator";

  return (
    <NavBar>
      <NavItem logo>SPEED</NavItem>
      <NavItem route="/">
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
