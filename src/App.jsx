import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TodoList from './components/TodoList';
import TodoDetail from './components/TodoDetail';
import { TodosProvider } from './contexts/TodosContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';  // QueryClient와 QueryClientProvider 추가
import styled from 'styled-components';

// QueryClient 인스턴스를 생성
const queryClient = new QueryClient();

function App() {
  return (
    <AppContainer>
      <Router>
        {/* QueryClientProvider로 애플리케이션을 감쌈 */}
        <QueryClientProvider client={queryClient}>
          <TodosProvider>
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/todo/:id" element={<TodoDetail />} />
            </Routes>
          </TodosProvider>
        </QueryClientProvider>
      </Router>
    </AppContainer>
  );
}

export default App;

const AppContainer = styled.div`
  background-color: #e1e8ed;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
`;