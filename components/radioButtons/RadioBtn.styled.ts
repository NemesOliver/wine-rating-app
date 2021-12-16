import styled from "styled-components";

const RadioBtn = styled.div`
  display: flex;
  justify-content: space-around;
  /* max width */
  flex-basis: 400px;

  input[type="radio"] {
    display: none;
  }

  input:checked + label {
    span {
      background-color: #ac0000;
      color: #ffffff;
      transition: all 0.3s ease-in;
    }
  }

  span {
    cursor: pointer;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90px;
    height: 30px;
    border-radius: 15px;
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 20%),
      0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%);

    &:active {
      transform: scale(0.95);
    }
  }
`;

export default RadioBtn;
