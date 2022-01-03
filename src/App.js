import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Card from './components/Card';
import InfinityScroll from './components/InfinityScroll';

import './App.css';

function App() {  
  const [data, setData] = React.useState([])  
  const [list, setList] = React.useState([])
  const [page, setPage] = React.useState(1)
  const [dataPage, setDataPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(true)
  const [over, setOver] = React.useState(false)  

  React.useEffect(() => {
    if(over) return
    axios.get(`https://my-json-server.typicode.com/dmlafiki/jsons/data/${dataPage}`)
    .then(res => {                
      setIsLoading(true)
      if (list.length === 0) {
        setDataPage(dataPage => dataPage + 1)
        setList(res.data.list.slice(0, 6))     
      }
      setData(data => [...data, ...res.data.list]);      
        setIsLoading(false)
      })
      .catch(err => {        
        if(err.response.status === 404) setOver(true)
      })   
  }, [dataPage])
  
  if (data.length === 0) {
    return <NowLoading>
      <p>. . . 로딩중 . . .</p>
    </NowLoading>
  }  
  return (
    <React.Fragment>     
      <Container className="App">        
        {list.map((list, idx) => {          
          return <Card key={idx} title={list.title} contents={list.contents}
          image={list.image} idx={idx} />
        })}
      </Container>      
      {isLoading ? '' : <InfinityScroll setIsLoading={setIsLoading} data={data}
        setDataPage={setDataPage} list={list} setList={setList} page={page} setPage={setPage} />}
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

const NowLoading = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  p {
    font-size: 24px;
  }
`;

export default App;