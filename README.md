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
총 11개의 사진을 제시한 후, 유사도를 기준으로 bad / good / excellent의 점수가 부여되며, 각각의 판정은 0 / 5 / 10 점의 점수로 변환된다. 마지막 사진이 지나간 후, 최종 점수가 화면에 출력되며 사용자의 닉네임과 함께 총점수가 DB에 저장된다 (저장된 기록은 HomaPage에서 확인할 수 있다).

#### 3.2. Game2 - 리듬에 맞춰 춤 따라하기 (DUN DUN DANCE)
우측에 제시되는 37초 길이의 춤 영상을 따라하는 게임이다. 37초 동안 총 26개의 시점에서 동작의 유사도를 채점하며, 채점되는 시간과 해당 시간의 동작은 아래의 픽토그램으로 확인 가능하다. Game1과 마찬가지로 posenet-similarity 모델을 사용하여 정답동작과 사용자의 동작을 비교하였고 해당 구간에서 가장 높은 similarity를 기준으로 채점하였다. 게임의 원활한 진행을 위해 해답동작의 skeleton pose 정보와 시점정보는 미리 분석하여 json파일로 저장했으며, component/Game2 폴더에서 확인할 수 있다. json 파일로 저장해놓은 시점이 순서대로 지나갈 때마다 정답동작 기준을 바꾸고, 다음 시점 전까지 similarity를 연속적으로 분석하여 최선의 similarity를 뽑아내는 방법으로 채점하였다. 유사도를 기준으로 점수가 부여되며, Game1 과 점수 변환 방식은 동일하다.


### Reference
- poseNet 모델
https://github.com/tensorflow/tfjs-models/tree/master/posenet
- skeleton 유사도 비교
https://github.com/freshsomebody/posenet-similarity
- dynamic mapping

