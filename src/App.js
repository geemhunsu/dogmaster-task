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
        // 저는 한번에 6개씩 리스트를 표시했습니다. 한번에 불러오는 데이터 갯수는 10개 여서 
        // 불러오는 순서가 6개 > 4개 > 6개 > 6개...가 되었는데 이를 방지하고자
        // 첫 랜더링 시에 data에 20개의 데이터를 채웠습니다
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
      {/* list를 갱신하는 동안에는 InfinityScroll컴포넌트가 관측되지 않아야 하기 때문에
      isLoading이라는 값을 사용하여 로딩중이 아닐 때만 보여지게 했습니다 */}
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