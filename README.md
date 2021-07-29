# Just Dance Game - Mad Dance
> Just Dance 게임을 Posenet과 dynamic time warping을 이용해 구현해보았다.
>
> React x Node.js x Mysql 

### hyunsu0803, lhmin0614


------------------

### Project 구조
Login, HomePage, Game1, Game2, Game3

### 1. Login
일회성 닉네임을 입력하면 로그아웃 하기 전까지 해당 닉네임으로 게임을 플레이 할 수 있다. 
사용자가 입력한 닉네임은 Homepage로 전달되어 wellcome 멘트를 확인할 수 있다.

### 2. HomePage
게임을 선택하고 게임별 리더보드를 확인할 수 있는 페이지이다.
상단에는 사용자가 Login 페이지에서 입력한 닉네임이 포함된 wellcome 멘트가 적혀있다.
좌측에는 css를 활용하여 carousel 형태로 게임별 링크가 연결된 카드를 회전시켰으며, 우측에는 각각의 게임에 해당하는 리더보드를 띄워놓았다.
리더보드는 Node.js서버에 연결되어 최상위 점수를 획득한 최대 10개 기록을 받아온다.

### 3. Game
#### 3.1. Game1 - 동작 따라하기 게임 (

