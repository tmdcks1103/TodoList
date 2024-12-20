import { useState } from 'react';
import { useTodos } from '../contexts/TodosContext';
import styled from 'styled-components';

const TodoInput = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { createTodo, isLoading, isError } = useTodos(); // useTodos에서 isLoading, isError를 받아옴
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      setErrorMessage('제목과 내용을 모두 입력해주세요.');
      return;
    }
    createTodo({ title, content });  // 기존 createTodo에서 객체로 전달
    setTitle('');
    setContent('');
    setErrorMessage('');
  };

  return (
    <InputContainer>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        {errorMessage && <Error>{errorMessage}</Error>}
        <Button type="submit" disabled={isLoading || !title || !content}>
          {isLoading ? '추가 중...' : '추가'}
        </Button>
        {isError && <Error>투두 추가 중 오류가 발생했습니다.</Error>} {/* 오류 메시지 추가 */}
      </Form>
    </InputContainer>
  );
};

export default TodoInput;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin: 20px auto;
  max-width: 600px; /* 최대 너비 설정 */
  width: 100%;
  padding: 0 15px;
`;

const Input = styled.input`
  padding: 14px 22px;
  font-size: 1.1rem;
  border: 1.5px solid #e0e0e0;
  border-radius: 12px;
  outline: none;
  background-color: white;
  color: #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: #007bff;
    background-color: #f1f9ff;
    box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
  }
`;

const Textarea = styled.textarea`
  padding: 14px 22px;
  font-size: 1.1rem;
  height: 120px;
  border: 1.5px solid #e0e0e0;
  border-radius: 12px;
  outline: none;
  background-color: white;
  color: #333;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  resize: none;

  &::placeholder {
    color: #999;
  }

  &:focus {
    border-color: #007bff;
    background-color: #f1f9ff;
    box-shadow: 0 4px 10px rgba(0, 123, 255, 0.2);
  }
`;

const Button = styled.button`
  padding: 14px 22px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: all 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const Error = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: -12px;
`;