import React from 'react';

const InfinityScroll = ({setIsLoading, data, setDataPage, setList, page, setPage}) => {
  const getMoreTrigger = React.useRef();
  
  const getMoreObserver = new IntersectionObserver((entry) => {
    if (entry[0].isIntersecting) {
      setIsLoading(true)      
      if(!data[(page + 1) * 6 + 5]) setDataPage(dataPage => dataPage + 1)
      setList(list => [...list, ...data.slice(page * 6, page * 6 + 6)])
      setPage(page => page + 1)
      setIsLoading(false)
    };
  });  
  React.useEffect(() => {
    getMoreObserver.observe(getMoreTrigger.current);    
  }, [])
  return <div ref={getMoreTrigger}/>
};

export default InfinityScroll;