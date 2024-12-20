import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useTodos } from '../contexts/TodosContext';
import styled, { keyframes } from 'styled-components';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// 디테일 페이지 애니메이션 추가
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const TodoDetail = () => {
    const { id } = useParams();  // URL에서 id 파라미터 가져오기
    const location = useLocation();  // URL에서 쿼리 매개변수 가져오기
    const { todos, updateTodo } = useTodos();
    const navigate = useNavigate();  // 뒤로 가기 위한 navigate 훅
    const queryClient = useQueryClient(); // react-query의 queryClient 가져오기

    if (!todos) {
        return <div>로딩 중...</div>;  // todos가 아직 로딩되지 않았다면 로딩 메시지 출력
    }

    const todo = todos.find(todo => todo.id === Number(id));  // 해당 id에 맞는 todo 찾기

    // URL 쿼리에서 'checked' 값 가져오기 (체크 상태)
    const queryParams = new URLSearchParams(location.search);
    const checked = queryParams.get('checked') === 'true';  // 'true'로 설정된 경우 체크 상태로 처리

    // 완료 여부를 업데이트하는 뮤테이션
    const updateCheckedMutation = useMutation({
        mutationFn: async () => {
            const updatedTodo = { ...todo, completed: !checked };
            await updateTodo(id, updatedTodo); // 업데이트 함수 호출
        },
        onMutate: async () => {
            // 서버 요청 전에 낙관적 업데이트 시작
            const previousTodos = queryClient.getQueryData(['todos']); // 이전 todos 데이터를 가져옴

            // todos 상태를 즉시 업데이트 (체크 상태를 반영)
            queryClient.setQueryData(['todos'], (oldTodos) =>
                oldTodos.map((todo) =>
                    todo.id === id ? { ...todo, completed: !checked } : todo
                )
            );

            // 오류가 나면 이전 상태로 롤백하기 위한 데이터 반환
            return { previousTodos };
        },
        onError: (err, variables, context) => {
            // 오류 발생 시 이전 상태로 롤백
            queryClient.setQueryData(['todos'], context.previousTodos);
            console.error('Error updating todo:', err);
        },
        onSettled: () => {
            // 업데이트 완료 후 데이터를 다시 가져와서 상태 갱신
            queryClient.invalidateQueries(['todos']);
        },
        onSuccess: () => {
            // 업데이트 후 같은 페이지로 리디렉션
            navigate(`/todo/${id}`);
        },
    });

    if (!todo) {
        return <ErrorText>할 일을 찾을 수 없습니다.</ErrorText>;
    }

    return (
      <DetailContainer>
        <GradientBackground /> {/* 그라디언트 배경 */}
        <ContentWrapper>
          <Title>{todo.title}</Title>
          <Content>{todo.content}</Content>
          <DateText>등록일: {new Date(todo.createdAt).toLocaleString()}</DateText>
          <DateText>수정일: {new Date(todo.updatedAt).toLocaleString()}</DateText>
          <CheckboxWrapper>
            <CheckboxLabel>
              <input 
                type="checkbox" 
                checked={checked} 
                onChange={() => updateCheckedMutation.mutate()} // 체크박스 클릭 시 상태 변경
              />
              완료 여부
            </CheckboxLabel>
          </CheckboxWrapper>
          <BackButton onClick={() => navigate(-1)}>뒤로 가기</BackButton> {/* 이전 페이지로 이동 버튼 */}
        </ContentWrapper>
      </DetailContainer>
    );
};

export default TodoDetail;

// 스타일링
const DetailContainer = styled.div`
  position: relative;
  overflow: hidden;
  padding: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #e1e8ed;
`;

const GradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #a0c4ff, #ffc6ff);
  opacity: 0.8;
  z-index: -1;
`;

const ContentWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  padding: 30px;
  max-width: 600px;
  width: 100%;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  animation: ${fadeIn} 0.8s ease forwards;
  transform-origin: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #4a4a4a;
`;

const Content = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

const DateText = styled.p`
  font-size: 1rem;
  color: #777;
`;

const CheckboxWrapper = styled.div`
  margin-top: 20px;
`;

const CheckboxLabel = styled.label`
  display: flex;
  align-items: center;
  font-size: 1rem;
`;

const BackButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: 1.2rem;
  text-align: center;
`;