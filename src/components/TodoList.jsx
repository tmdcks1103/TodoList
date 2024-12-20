import TodoItem from './TodoItem';
import { useTodos } from '../contexts/TodosContext';
import styled from 'styled-components';
import TodoTitle from './TodoTitle';
import TodoInput from './TodoInput';

import { PacmanLoader } from 'react-spinners';
import Lottie from "lottie-react";
import ErrorLottie from "../Animation/Animation - 1731509687429.json";

const TodoList = () => {
  // useTodos로 todos, isLoading, error 가져오기
  const { todos, isLoading, error } = useTodos();

  return (
    <>
      <TodoTitle />
      <TodoInput />
      <List>
        {isLoading ? (
          <LoadingWrapper>
            <PacmanLoader color="#007bff" loading={isLoading} size={50} />
            <LoadingText>로딩 중...</LoadingText>
          </LoadingWrapper>
        ) : error ? (
          <ErrorWrapper>
            {/* 에러 애니메이션~ */}
            <Lottie animationData={ErrorLottie} style={{ width: '150px', height: '150px' }} />
            <ErrorText>에러 발생: {error.message}</ErrorText>
          </ErrorWrapper>
        ) : todos.length > 0 ? (
          todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))
        ) : (
          <EmptyText>할 일이 없습니다.</EmptyText>
        )}
      </List>
    </>
  );
};

export default TodoList;

const List = styled.div`
  margin-top: 20px;
`;

const EmptyText = styled.p`
  text-align: center;
  color: #555;
  font-size: 1.2rem;
`;

// 로딩 관련 

const LoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;  /* 원하는 로딩 영역의 높이를 설정 */
`;

const LoadingText = styled.p`
  text-align: center;
  color: black;
  font-size: 1.2rem;
  margin-top: 10px;
`;

// 에러 처리

const ErrorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
`;

const ErrorText = styled.p`
  text-align: center;
  color: red;
  font-size: 1.2rem;
  margin-top: 10px;
`;