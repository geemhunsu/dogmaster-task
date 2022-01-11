import React from 'react';

const InfinityScroll = ({setIsLoading, data, setDataPage, list, setList, page, setPage, over}) => {
  const getMoreTrigger = React.useRef();
  console.log(page)
  const getMoreObserver = new IntersectionObserver((entry) => {
    if (entry[0].isIntersecting) {            
      if(!over)setIsLoading(true)
      // 다음 페이지의 list 데이터 갯수가 6개가 되지 않는다면
      // 서버에서 추가로 데이터를 받아와 data에 추가했습니다
      if(!data[(page + 1) * 6 + 5] && !over) setDataPage(dataPage => dataPage + 1)
      setList(list => [...list, ...data.slice(page * 6, page * 6 + 6)])
      if(!over)setPage(page => page + 1)
      if(!over)setIsLoading(false)
    };
  });  
  React.useEffect(() => {
    getMoreObserver.observe(getMoreTrigger.current);    
  }, [])
  return <div ref={getMoreTrigger} style={{height: 50}} />
};

export default InfinityScroll;