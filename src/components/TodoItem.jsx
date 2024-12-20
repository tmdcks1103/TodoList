import { useState } from 'react';
import { useTodos } from '../contexts/TodosContext';
import styled from 'styled-components';
import { Link } from 'react-router-dom';  // 추가: 상세보기 링크

const TodoItem = ({ todo }) => {
  const { updateTodo, deleteTodo } = useTodos();  // 수정: 뮤테이션 훅 사용
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.title);
  const [newContent, setNewContent] = useState(todo.content);
  const [checked, setChecked] = useState(todo.checked || false);

  // 수정: 투두 수정 버튼 클릭 시 호출되는 함수
  const handleUpdate = async () => {  // 수정: 비동기 함수로 변경
    if (!newTitle.trim() || !newContent.trim()) {
      alert('제목과 내용을 모두 입력하세요.');
      return;
    }
    try {
      // 수정: updateTodoMutation 호출로 투두 수정
      await updateTodo({ id: todo.id, updatedData: { title: newTitle, content: newContent } });  // mutateAsync 호출
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // 수정: 체크박스 상태 변경 함수
  const handleCheckboxChange = async () => {  // 수정: 비동기 함수로 변경
    const newCheckedState = !checked;
    setChecked(newCheckedState);
    try {
      // 수정: 체크 상태 변경 시 updateTodoMutation 호출
      await updateTodo({ id: todo.id, updatedData: { ...todo, checked: newCheckedState } });  // mutateAsync 호출
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);  // 삭제 함수 호출
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <Item>
      <Checkbox
        type="checkbox"
        checked={checked}
        onChange={handleCheckboxChange}
      />
      {isEditing ? (
        <>
          <Input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <Textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
          />
          <Button onClick={handleUpdate}>수정 완료</Button>
        </>
      ) : (
        <>
          <Title $checked={checked}>{todo.title}</Title>
          <Content $checked={checked}>{todo.content}</Content>
          <Actions>
            <Link to={`/todo/${todo.id}?checked=${checked}`}>
              <LinkButton>상세보기</LinkButton>
            </Link>
            <Button onClick={() => setIsEditing(true)}>수정</Button>
            <DeleteButton onClick={handleDelete}>삭제</DeleteButton>  
          </Actions>
        </>
      )}
    </Item>
  );
};

export default TodoItem;

// Styled components
const Item = styled.div`
  padding: 6px 10px;
  margin: 8px auto;
  border: 1px solid #ddd;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
  width: 100%;
  max-width: 600px;
  background-color: #f9f9f9;
  position: relative;             // Item에 position: relative 추가
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  margin-right: 8px;
`;

const Title = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin: 0;
  text-decoration: ${({ $checked }) => ($checked ? 'line-through' : 'none')};
`;

const Content = styled.p`
  font-size: 0.95rem;
  color: #555;
  margin-top: 2px;
  text-decoration: ${({ $checked }) => ($checked ? 'line-through' : 'none')};
`;

const Actions = styled.div`
  display: flex;
  gap: 6px;
  position: absolute;            // 버튼을 절대 위치로 배치
  top: 6px;                      // 상단 여백 조정
  right: 10px;                   // 오른쪽에 배치
  align-items: center;
`;

const Input = styled.input`
  padding: 6px;
  width: 97.5%;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
`;

const Textarea = styled.textarea`
  padding: 6px;
  width: 97.5%;
  height: 70px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  resize: none;
`;

const Button = styled.button`
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease, transform 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #004085;
    transform: translateY(1px);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.3);
  }
`;

const DeleteButton = styled(Button)`
  background-color: #d9534f;

  &:hover {
    background-color: #c9302c;
  }

  &:active {
    background-color: #b52c2c;
  }
`;

const LinkButton = styled(Button)`
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  background-color: #00b8a9;  /* 민트색 시작 */
  color: white;
  border-radius: 30px;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;

  background: linear-gradient(135deg, #00b8a9, #007b7f);  /* 민트와 청록색 그라데이션 */
  box-shadow: 0 5px 15px rgba(0, 184, 169, 0.2);

  &:hover {
    background: linear-gradient(135deg, #007b7f, #00b8a9);  /* Hover 시 색상 반전 */
    transform: scale(1.05);
    box-shadow: 0 10px 20px rgba(0, 184, 169, 0.3);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 184, 169, 0.4);
  }

  &:active {
    transform: scale(1);
    box-shadow: 0 5px 10px rgba(0, 184, 169, 0.15);
  }

  &:hover::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
    z-index: -1;
  }
`;