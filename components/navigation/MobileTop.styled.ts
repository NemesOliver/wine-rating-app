import styled from "styled-components";

export const MobileTopNavigation = styled.nav`
  position: "fixed";
  top: 0;
  bottom: 0;
  height: 6vh;
  margin: 0 2.5vh;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  @media all and (min-width: 600px) {
    display: none;
  }
`;
