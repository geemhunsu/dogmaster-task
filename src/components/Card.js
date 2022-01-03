import React from 'react';
import styled from 'styled-components';

const Card = ({title, contents, image, idx }) => {

  return (
    <Container>
      <p>{idx + 1}</p>
      <p>{title}</p>
      <p>{contents}</p>      
      <img src={image} alt='image'/>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;  
  align-items: cetner;
  margin-bottom: 50px;
  width: 45%;
  border: 1px solid black;
`;

export default Card;