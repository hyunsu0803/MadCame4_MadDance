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
#### 3.1. Game1 - 동작 따라하기 (COPY THE POSE)
우측에 제시되는 동작을 그대로 따라하는 게임이다.
각각의 사진은 3초의 시간동안 모니터에 띄워지며, 플레이어는 오른쪽 사진을 최대한 비슷하게 따라해야 한다. 플레이어의 동작을 카메라로 인식한 후,  poseNet 모델을 통해 skeleton(관절 위치) 정보를 추출하고, 오른쪽 사진의 skeleton 정보와 유사도를 계산하였다. 유사도는 관절 사이의 각도를 바탕으로 관절 위치의 정확도를 가중치로 부여한 posenet-similarity 모델로 계산하였다.
총 11개의 사진을 제시한 후, 유사도를 기준으로 bad / good / excellent의 점수가 부여되며, 각각의 판정은 0 / 5 / 10 점의 점수로 변환된다. 마지막 사진이 지나간 후, 최종 점수가 화면에 출력되며 사용자의 닉네임과 함께 총점수가 DB에 저장된다.

#### 3.2. Game2 - 리듬에 맞춰 춤 따라하기 (DUN DUN DANCE)
우측에 제시되는 30초 가량의 춤 영상을 따라하는 게임이다. 

#### 3.3 Game3  - 리듬에 맞춰 춤 따라하기 (STEPPED ON POOP)
우측에 제시되는 30초 가량의 춤 영상을 따라하는 게임이다. Game2와는 다르게 채점되는 구간의 영상과 플레이어가 춤을 추는 영상을 비교한다. 채점 구간의 원본 영상을 posenet 모델을 이용해 미리 프레임별 skeleton 정보를 구해 json파일로 저장해두고 게임 시작시에 불러온다. 5초단위로 영상의 구간을 나누고 매 구간마다 플레이어의 skeleton 정보를 모아두고 구간이 바뀌면 초기화한다. 해당 구간이 채점 구간이라면 불러온 정답 skeleton과 비교하여 유사도를 판별한다. 각 skeleton은 nose부터 right angle까지 총 17개의 key point로 이루어져 있는데, 각 key point별 x좌표, y좌표를 각각 리스트에 모아서 Dynamic Time Warping 알고리즘이 구현된 라이브러리에 넘기고 distance를 반환받는다. 해당 값은 작을수록 유사도가 높은 것이다. 매 채점 구간마다 해당 distance에 기준을 주어 bad / good / excellent의 점수를 부여하고, 각각의 판정은 0 / 10 / 20 점의 점수로 변환된다. 동영상이 끝나면 Modal로 최종 점수가 화면에 출력되며 사용자의 닉네임과 함께 총점수고 DB에 저장된다. 다만 문제가 있었는데, Dynamic Time Warping을 위해서는 skeleton이 normalized 되어야 했다. 하지만 프로젝트에 주어진 시간이 충분하지 않아 이를 처리해주지 못했고 원활한 채점을 위해서는 영상에 나오는 사람이랑 비슷한 크기로 보이게끔 카메라를 위치하고 게임을 플레이해야 한다.

### Reference
- poseNet 모델
https://github.com/tensorflow/tfjs-models/tree/master/posenet
- skeleton 유사도 비교
https://github.com/freshsomebody/posenet-similarity
- dynamic mapping

