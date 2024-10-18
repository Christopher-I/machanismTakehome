import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface TodoType {
  text: string;
  status: 'active' | 'completed' | 'all';
}

function App() {
  const [input, setInput] = useState<string>('');
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [status, setStatus] = useState<string>('all');
  const [filteredTodos, setFilteredTodos] = useState<TodoType[] | undefined>(undefined);
  const [totalActiveTodos, setTotalActiveTodos] = useState<number>(0);

  useEffect(() => {
    const totalActiveTodos = todos.filter((todo) => todo.status === 'active').length;
    setTotalActiveTodos(totalActiveTodos);
  }, [todos, filteredTodos, status]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addToList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const todoCopy = [...todos];
      const newEntry = { text: input, status: 'active' };
  
      todoCopy.push(newEntry as TodoType);
      setTodos(todoCopy);
      setInput('');

      if (status === 'all') {
        setFilteredTodos(todoCopy);
      } else {
        const _filteredTodos = todoCopy.filter((todo) => todo.status === status);
        setFilteredTodos(_filteredTodos);
      }
    }
  };

  const showAllTodos = () => {
    setStatus('all');
    // setFilteredTodos(todos);
  };

  const showActiveTodos = () => {
    setStatus('active');
  };

  const showCompletedTodos = () => {
    setStatus('completed');
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const index = todos.findIndex((todo) => todo.text === e.target.nextSibling?.textContent);
    const todosCopy = [...todos];
    if (e.target.checked) {
      todosCopy[index].status = 'completed';
      setTodos(todosCopy);
    } else {
      todosCopy[index].status = 'active';
      setTodos(todosCopy);
    }
  };

  return (
    <Container>
      <Input onChange={handleChange} value={input} onKeyDown={addToList} />

      {filteredTodos?.map((todo, index) => (
        <ButtonWrapper>
          <Todo style={{ display: 'flex', flexDirection: 'row' }}>
            <label htmlFor="box"></label>
            <input
              id="box"
              type="checkbox"
              onChange={handleCheckbox}
              placeholder="What needs to be done"
            />
            <div key={index}>{todo.text}</div>
          </Todo>
          <CancelButton>x</CancelButton>
        </ButtonWrapper>
      ))}
      {
        <StatusContainer>
          <div> {totalActiveTodos} items left</div>
          <Button onClick={showAllTodos}>All</Button>
          <Button onClick={showActiveTodos}>Active</Button>
          <Button onClick={showCompletedTodos}>Completed</Button>
        </StatusContainer>
      }
      <div>No of filtered to dos {filteredTodos?.length}</div>
    </Container>
  );
}
export default App;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const Button = styled.button`
  border-color: red;
  border-width: 1px;

  &:hover {
    cursor: pointer;
  }
`;

const Input = styled.input`
  &:focus {
    outline: none;
    border: 1px solid red;
    box-shadow: 0 0 10px #719ece;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  flex-direction: row;
`;

const Todo = styled.div``;
const CancelButton = styled.div`
  width: 20px;
  height: 20px;
  &:hover {
    cursor: pointer;
  }
`;
