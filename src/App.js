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

  const getMoreList = () => {
    setIsLoading(true)
    console.log(data)
    console.log(page)
    if(!data[(page + 1) * 6 + 5]) setDataPage(dataPage => dataPage + 1)
    setList(list => [...list, ...data.slice(page * 6, page * 6 + 6)])
    setPage(page => page + 1)
    setIsLoading(false)
  }

  React.useEffect(() => {
    if(over) return
    axios.get(`https://my-json-server.typicode.com/dmlafiki/jsons/data/${dataPage}`)
    .then(res => {                
      setIsLoading(true)
      if (list.length === 0) {
        setList(res.data.list.slice(0, 6))
        setDataPage(dataPage => dataPage + 1)
      }
        setData(data => [...data, ...res.data.list]);      
        setIsLoading(false)
      })
      .catch(err => {
        console.log(err.response)
        if(err.response.status === 404) setOver(true)
      })
    console.log('데이터', data)
    console.log('데이터페이지', dataPage)
    console.log('리스트', list)
  }, [dataPage])
  
  if (data.length === 0) {    
    return <div>로딩중</div>
  }  
  return (
    <React.Fragment>     
      <Container className="App">        
        {list.map((list, idx) => {          
          if(idx < page * 6) return <Card key={idx} title={list.title} contents={list.contents}
            image={list.image} idx={idx} />
        })}
      </Container>      
      {isLoading ? '' : <InfinityScroll setIsLoading={setIsLoading} data={data}
        setDataPage={setDataPage} setList={setList} page={page} setPage={setPage} />}
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