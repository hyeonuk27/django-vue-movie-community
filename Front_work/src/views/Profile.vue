<template>
  <div id="profile_main">
    <h1 id='logo' @click="$router.push({ name: 'Main' })">METMIX<span style="color: rgba(140, 100, 172, 0.8);">A</span></h1>
    <div id="sideText">
      <h1 style="margin-bottom: 2vh; color: rgba(140, 100, 172, 0.8); font-size: 3.2vh; font-family: 'Nanum Myeongjo', serif;">A</h1>
      <p style="width: 20vh; font-size: 1.65vh;">내가 좋아하는 영화를 담고</p>
      <p style="width: 20vh; font-size: 1.65vh;">포토티켓을 감상하는</p>
      <p style="width: 20vh; font-size: 1.65vh;">나만의 프라이빗 공간</p>
    </div>
    <!-- 유저 이름, 닉네임, 사진 -->
    <UserInfo
    class="d-block"
    />
    <!-- 유저 정보 변경을 위한 modal-->
    <!-- v-for로 반복 돌리기 -->
    <div id="masonry_layer" class="container">
      <vue-masonry-wall :items="photoTickets" :options="{width: 300, padding: 8}" class="m-0 mansory_template pb-5">
          <template v-slot:default="{item}">
            <!-- item은 포토티켓 객체. movie_id는 movie라는 이름으로 접근 -->
            <div class="item photo_ticket d-inline-block" @click="$router.push({ name: 'Detail', query: { moviePk: `${item.movie}`}})">
              <img id="image" :src="item.poster_path" class="card-img-top d-inline-block" alt="...">
              <p class="text-center" style="padding-top: 0.4rem;">{{ item.title }}</p>
            </div>
          </template>
      </vue-masonry-wall>
    </div>
  </div>
</template>

<script src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js" integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D" crossorigin="anonymous" async></script>
<script>
import axios from 'axios'
import UserInfo from '@/components/Profile/UserInfo'
import PhotoTicket from '@/components/Profile/PhotoTicket'
import { mapGetters } from 'vuex'
import VueMasonryWall from "vue-masonry-wall"


export default {
  name: 'Profile',
  components: {
    UserInfo,
    PhotoTicket,
    VueMasonryWall,
  },
  data: function () {
    return {
        photoTickets: [],
        pageNum: 1,
        possiblePageNum: 2,
    }
  },
  methods: {
    getMovies: function () {
      axios({
        method: 'get',
        // 장고한테 요청
        url: 'http://127.0.0.1:8000/api/v1/phototickets/',
        params: {
          page_num: this.pageNum,
        },
        headers: this.config
      })
      .then((res)=>{
        // 응답 데이터에서 가능한 페이지 수 데이터만 pop해서 가져온다.
        this.possiblePageNum = res.data.pop()['possible_page']
        this.photoTickets.push(...res.data)
        this.pageNum += 1
      })
      .catch((err) => {
        console.log(err)
      })
    },
    checkBottom: function () {
      const {scrollTop, clientHeight, scrollHeight} = document.documentElement
      if (scrollHeight - scrollTop <= clientHeight) {
        if (this.pageNum <= this.possiblePageNum) {
          this.getMovies()
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'config',
    ])
  },
  created: function () {
    this.getMovies()
    document.addEventListener('scroll', this.checkBottom)
  },
  destroyed: function () {
    document.removeEventListener('scroll', this.checkBottom)
  },
}
</script>

<style scoped>
#profile_main {
  background-image: url(../assets/bg.jpg);
  background-size: cover;
  min-height: 100vh;
  margin: 0;
  padding: 0;
}

#logo {
  position: absolute;
  top: 1rem;
  left: 1rem;
  color: #f1f1f1;
  opacity: 0.7;
  font-size: 2rem;
  cursor: pointer;
}

#sideText {
  color: whitesmoke;
  font-size: 1.5rem;
  position: fixed;
  top: 20vh;
  left: 2vw;
  opacity: 0;
  animation-name: slideSide;
  animation-duration: 6s;
}

#sidetext > h1 {
  font-family: 'Nanum Myeongjo', serif;
}

@keyframes slideSide {
  0% {
    left: -10vw;
    opacity: 0;
  }
  20% {
    left: 1vw;
    opacity: 1;
  }
  80% {
    left: 1vw;
    opacity: 1;
  }
  100% {
    left: -5vw;
  }
}

#masonry_layer {
  /* 이것에 따라 한 열의 영화 개수 결정됨 */
  width: 51%;
}

.mansory_template {
  width: 100%;
}

.photo_ticket:hover {
  background-color: rgba(255, 255, 255, 0.25);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25), 0 0 0.5em 0 #FF6382;
}

.photo_ticket p {
  font-size: 0.8em;
  text-align: start;
  color: rgba(255, 255, 255, 0.82);
  display: block;
  margin: 0.5em;
}

#image {
  width: 100%;
}

.photo_ticket {
  transition: all 0.2s ease;
  border-bottom: none;
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  text-align: center;
  border-radius: 4px;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.25);
  background-color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  outline: 0;
  overflow: hidden;
}
</style>