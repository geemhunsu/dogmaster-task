import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Card from './components/Card';
import './App.css';

function App() {
  const [data, setData] = React.useState([])
  const [lastPost, setLastPost] = React.useState(5)
  const [list, setList] = React.useState([])
  

  React.useEffect(() => {
    axios.get('https://my-json-server.typicode.com/dmlafiki/jsons/data/1')
      .then(res => {
        setData(res.data.list);
      })
      .catch(err => {
      console.log(err)
    })
  }, [])
  if(data.length === 0) return <div>로딩중</div>
  console.log(data, '데이터')
  return (
    <React.Fragment>
      <Container className="App">
        <Card/>
        {data.map((list, idx) => {          
          return <Card key={idx} title={list.title} contents={list.contents} image={list.image} />
        })}
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`
  margin: auto;
  padding-top: 10vh;
  width: 80vw;
  display: flex;
  flex-wrap: wrap;
`;

export default App;
