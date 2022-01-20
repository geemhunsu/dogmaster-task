import React from 'react';
import axios from 'axios';

import Card from './Card';

const Main = () => {
  const [list, setList] = React.useState([])
  React.useEffect(() => {
    axios.get('https://my-json-server.typicode.com/dmlafiki/jsons/data/1')
      .then(res => {
        setList(res.data.list)
        console.log(res)
      })    
  }, [])
  console.log(list)
  return (
    <div>
      {list.map((list, idx) => {
        return <Card key={idx} title={list.title} contents={list.contents}
        image={list.image} idx={idx} />
      })}
    </div>
  );
};

export default Main;