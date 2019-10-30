<template>
  <div>
    <div class="header">
      <span>豆瓣</span>
      <icon type="search"
            size="12"
            color="#00b600" />
      <button>打开豆瓣App</button>
    </div>
    <div class="list">
      <div class="item"
           v-for="(cate,i) in categoryList"
           :key="cate.name">
        <div class="title"
             v-if="cate.list.length">
          <span>{{cate.name}}</span>
          <span class="more">更多</span>
        </div>
        <scroll-view class="scroll-view_H"
                     scroll-x="true"
                     bindscroll="scroll">
          <view class="scroll-view-item_H"
                v-for="item in cate.list"
                :key="item.id">
            <img :src="item.images.large"
                 alt="">
            <p>{{item.title}}</p>
            <div class="rate">
              <ul class="stars"
                  v-if="item.rating.average">
                <li v-for="(item2, index2) in item.starNum"
                    :key="index2">
                  <img src="../../../static/images/star.svg"
                       alt="">
                </li>
                <li v-for="(item2, index2) in (5-item.starNum)"
                    :key="index2">
                  <img src="../../../static/images/unstar.svg"
                       alt="">
                </li>
              </ul>
              <span class="num">{{item.rating.average?item.rating.average:'暂无评分'}}</span>
            </div>
          </view>
        </scroll-view>
      </div>
    </div>
  </div>

</template>

<script>

import request from '@/utils/request.js'

export default {
  data () {
    return {
      categoryList: [
        {
          name: '影院热映',
          param: 'in_theaters',
          list: []
        },
        {
          name: 'top250',
          param: 'top250',
          list: []
        }
      ]
    }
  },
  created () {
    this.categoryList.forEach(v => {
      this.getMovieList(v)
    })
  },
  methods: {
    getMovieList (item) {
      request({
        url: `https://api.douban.com/v2/movie/${item.param}?apikey=0df993c66c0c636e29ecbb5344252a4a` // 开发者服务器接口地址",
      }).then(res => {
        // console.log(res.data.subjects)
        let movieList = res.data.subjects
        movieList.forEach(v => {
          v.starNum = Math.ceil(v.rating.average / 2)
        })

        item.list = movieList
      })
    }
  }

}
</script>

<style lang="less">
.header {
  height: 94rpx;
  color: #00b600;
  box-sizing: border-box;
  border-bottom: 1rpx solid #eee;
  display: flex;
  align-items: center;
  padding: 0 36rpx;
  icon {
    flex: 1;
    margin: 8rpx 0 0 28rpx;
  }
  button {
    color: #fff;
    height: 58rpx;
    width: 200rpx;
    background-color: #42bd56;
    line-height: 58rpx;
    font-size: 12px;
  }
}

.item {
  margin-bottom: 60rpx;
}
.title {
  height: 86rpx;
  padding: 0 36rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .more {
    color: #42bd56;
  }
}

.scroll-view_H {
  white-space: nowrap;
  margin: 12rpx 0 0 38rpx;
}
.scroll-view-item_H {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin-right: 18rpx;
  img {
    width: 200rpx;
    height: 286rpx;
  }
  p {
    font-size: 14px;
    margin-top: 20rpx;
  }
}
.rate {
  display: flex;
  .num {
    margin-left: 8rpx;
    color: #aaa;
    font-size: 14px;
  }
}
.stars {
  display: flex;
  img {
    width: 20rpx;
    height: 20rpx;
  }
}
</style>