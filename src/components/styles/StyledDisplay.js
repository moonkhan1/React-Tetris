import styled from 'styled-components';

export const StyledDisplay = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center; 
  margin: 0 0 20px 0;
  padding: 20px;
  border: 4px solid #605542;
  min-height: 30px;
  width: 100%;
  border-radius: 10px;
  color: ${props => (props.gameOver ? '#9E3229' : '#fdd978')};
  background: ${props => (props.gameOver ? '#fdd978' : '#6e2f3b')};
  font-size: 0.8rem;
`;