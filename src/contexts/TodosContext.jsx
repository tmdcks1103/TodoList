import { createContext, useContext } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import AxiosInstance from '../hooks/api/AxiosInstance';

const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
    const queryClient = useQueryClient();

    // useQuery로 GET 요청 관리 (투두 목록 가져오기)
    const { data: todos, isLoading, error } = useQuery({
        queryKey: ['todos'], // 쿼리 키: todos
        queryFn: async () => {
            const response = await AxiosInstance.get('/todo');
            return response.data[0]; // 받아온 데이터를 반환하여 todos 상태로 관리
        },
        onError: (err) => {
            console.error('Error fetching todos:', err);
        }
    });

    // useMutation으로 POST 요청 관리 (투두 생성)
    const createTodoMutation = useMutation({
        mutationFn: async ({ title, content }) => {
            // 뮤테이션 함수: 투두 생성
            await AxiosInstance.post('/todo', { title, content });
        },
        onSuccess: () => {
            // 투두 생성 후, 리스트 새로고침
            queryClient.invalidateQueries(['todos']); // 쿼리 키: todos
        },
        onError: (err) => {
            console.error('Error creating todo:', err);
        }
    });

    // useMutation으로 PATCH 요청 관리 (투두 업데이트)
    const updateTodoMutation = useMutation({
        mutationFn: async ({ id, updatedData }) => {
            // 뮤테이션 함수: 투두 업데이트
            await AxiosInstance.patch(`/todo/${id}`, updatedData);
        },
        onSuccess: () => {
            // 투두 업데이트 후, 리스트 새로고침
            queryClient.invalidateQueries(['todos']); // 쿼리 키: todos
        },
        onError: (err) => {
            console.error('Error updating todo:', err);
        }
    });

    // useMutation으로 DELETE 요청 관리 (투두 삭제)
    const deleteTodoMutation = useMutation({
        mutationFn: async (id) => {
            // 뮤테이션 함수: 투두 삭제
            await AxiosInstance.delete(`/todo/${id}`);
        },
        onSuccess: () => {
            // 투두 삭제 후, 리스트 새로고침
            queryClient.invalidateQueries(['todos']); // 쿼리 키: todos
        },
        onError: (err) => {
            console.error('Error deleting todo:', err);
        }
    });

    return (
        <TodosContext.Provider
            value={{
                todos,
                isLoading,
                error,
                createTodo: createTodoMutation.mutate, // mutate 함수로 변경
                updateTodo: updateTodoMutation.mutate, // mutate 함수로 변경
                deleteTodo: deleteTodoMutation.mutate // mutate 함수로 변경
            }}
        >
            {children}
        </TodosContext.Provider>
    );
};

export const useTodos = () => {
    return useContext(TodosContext);
};