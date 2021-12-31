import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Card from './components/Card';
import InfinityScroll from './components/InfinityScroll';

import './App.css';

function App() {
  const [data, setData] = React.useState([])
  const [lastPost, setLastPost] = React.useState(6)
  const [list, setList] = React.useState([])

  React.useEffect(() => {
    axios.get('https://my-json-server.typicode.com/dmlafiki/jsons/data/1')
      .then(res => {
        setData(res.data.list);
        setList(res.data.list.map((post, idx) => {
          if (idx > lastPost) return
          return post
        }))
      })
      .catch(err => {
      console.log(err)
    })
  }, [])
  if (data.length === 0) return <div>로딩중</div>
  console.log(list)
  return (
    <React.Fragment>
      <Container className="App">        
        {list.map((list, idx) => {          
          return <Card key={idx} title={list.title} contents={list.contents} image={list.image} />
        })}
        <InfinityScroll setLastPost={setLastPost} setList={setList} />
      </Container>
    </React.Fragment>
  );
}

const Container = styled.div`  
  margin: auto;
  padding-top: 10vh;
  width: 80vw;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;  
`;

export default App;
