### 응답 받은 데이터 무한스크롤로 구현하기 
>**구현 방법**
- 서버에서 받아온 데이터를 data라는 배열에 담는다
- data에 있는 데이터를 6개씩 list라는 배열에 담는다
- list배열을 map()을 통해 화면에 뿌려준다
- 화면 맨 아래에 InterSection Observer가 관측하는 div를 넣는다
- div가 관측될 때마다 data에 있는 데이터를 6개씩 list에 추가한다

url : [http://geemhunsu.s3-website.ap-northeast-2.amazonaws.com/]