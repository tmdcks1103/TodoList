import React from "react";
import styled from "styled-components";
import { CiAlarmOn } from "react-icons/ci";

const TodoTitle = () => {
  return (
    <TitleContainer>
      <IconWrapper>
        <CiAlarmOn />
      </IconWrapper>
      <TitleText>Todo List</TitleText>
      <IconWrapper>
        <CiAlarmOn />
      </IconWrapper>
    </TitleContainer>
  );
};

export default TodoTitle;

const TitleContainer = styled.div`
  background: #3C3C3C;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  padding: 12px 20px;
  border-radius: 20px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
  transform: scale(1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    padding: 10px 18px;
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 95%;
  }
`;

const IconWrapper = styled.div`
  color: #FF2E63;
  font-size: 2.5rem;
  margin: 0 15px;
  animation: pulse 1.5s infinite ease-in-out;

  &:hover {
    color: #FFD700; /* 금색 */
    transform: scale(1.3) rotate(10deg);
    transition: transform 0.3s ease, color 0.3s ease;
  }

  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.2);
    }
    100% {
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const TitleText = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  letter-spacing: 1.5px;
  color: #fff;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* 부드러운 텍스트 그림자 */
  text-transform: uppercase;
  margin: 0;
  animation: slideIn 1s ease-out;

  @keyframes slideIn {
    0% {
      opacity: 0;
      transform: translateY(-20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.5rem;
  }
`;