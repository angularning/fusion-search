<template>
  <div class="planBox">
    <div class="label">
      {{ title }}
    </div>
    <div class="tagContainer">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="tagsShuxing"
        :style="num===index?`margin-bottom:${bottoms}px`:''"
        :class="[num===index?`active${colors}`:'','sx'+index,colors==='green'?'greenTag':'purpleTag']"
        @click="showSome(index,item,$event)"
      >
        <span class="tagsShuxingTab">
          <span>{{ item.name }}</span>
          <i
            v-if="colors==='green'"
            class="icon zb-icon-product-bottom"
            :class="{'zb-icon-product-top':num===index}"
          />
          <i
            v-if="colors==='purple'"
            class="icon zb-icon-purple-bottom"
            :class="{'zb-icon-product-top':num===index}"
          />
        </span>
        <template>
          <div
            class="planTagsContent"
            :class="[colors+'Bg',num===index?'showOp':'']"
          >
            <PlanTagList
              :list="item.columns"
              :colors="colors"
            />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import PlanTagList from './PlanTagList'
export default {
  name: 'PlanCommonTag',
  components: {
    PlanTagList
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: () => ''
    },
    colors: {
      type: String,
      default: () => ''
    }
  },
  data () {
    return {
      num: -1,
      showArr: [],
      isStatus: false,
      bottomNum: 100
    }
  },
  computed: {
    bottoms () {
      return this.bottomNum
    }
  },
  methods: {
    getKey(item) {
      return Object.keys(item)[0]
    },
    getKey1(item) {
      return Object.keys(item)[1]
    },
    getBigKey(item) {
      return Object.keys(Object.values(item)[0][0])[0]
    },
    getValues(item) {
      return Object.values(item)[0]
    },
    showSome(index, item, e) {
      this.bottomNum = e.currentTarget.querySelector('.planTagsContent').offsetHeight + 20
      const that = this
      that.showArr.push(index)
      const newIndex = that.showArr[that.showArr.length - 1]
      const before = that.showArr[that.showArr.length - 2] || 0
      if (newIndex === before && that.isStatus) {
        that.num = -1
        that.isStatus = false
      } else {
        that.isStatus = true
        that.num = index
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .showOpacity{
    opacity: 1;
  }
  .greenBg{
    background:rgba(73,180,81,0.08);
  }
  .purpleBg{
    background:rgba(143,103,212,0.08);
    .planListTagCon{
      width: 100%;
      border:1px solid rgba(143,103,212,0.2) !important;
      .planListTagConTitle{
        width: 90% !important;
        .planListTagConTitleBold{
          width: 80%;
        }
      }
    }
  }
  .planTagsContent{
    visibility: hidden;
    position: absolute;
    display: flex;
    justify-content: flex-start;
    padding: 10px;
    width: 97%;
    right: 10px;
    z-index: 2;
    margin-top: 10px;
    max-height: 371px;
    overflow: auto;
    .planListTagCon{
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      background: #fff;
      padding: 10px 5px;
      background:rgba(255,255,255,1);
      border-radius:4px;
      margin: 5px;
      border:1px solid rgba(73,180,81,0.2);
      .planListTagConImg{
        width: 60px;
        height: 60px;
        vertical-align: middle;
      }
      .planListTagConTitle{
        display: flex;
        flex-flow: wrap;
        width: 160px;
        margin: 0 20px 0  10px;
        .planListTagConTitleBold{
          font-size:14px;
          font-family:MicrosoftYaqiHei-Bold,MicrosoftYaqiHei;
          font-weight:bold;
          color:rgba(28,45,90,1);
          height: 20px;
          display: flex;
          align-items: center;
          i{
            font-style: normal;
          }
          img{
            width: 80px;
            margin-left: 20px;
          }
        }
        .planListTagConTitleDes{
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          font-size:12px;
          font-family:MicrosoftYaqiHei;
          color:rgba(28,45,90,0.6);
          margin-top: 10px;
          height: 34px;
        }
      }
      .planListTagConBox{
        width: 80px;
        display: flex;
        flex-flow: wrap;
        text-align: right;
        span{
          font-size:12px;
          font-family:PingFangSC-Semibold,PingFang SC;
          font-weight:600;
          color:rgba(241,61,61,1);
          height: 50px;
        }
        a{
          font-size:12px;
          font-family:MicrosoftYaqiHei;
          color:rgba(58,114,255,1);
          text-decoration: underline;
          /*margin-top: 30px;*/
        }
      }
    }
  }
  @mixin text-overflow($width:100%,$display:block) {
    width: $width;
    display: $display;
    white-space: nowrap;
    -ms-text-overflow: ellipsis;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  @mixin displayFlex($justify:space-around,$isWrap:nowrap) {
    display: flex;
    flex-flow: row $isWrap;
    justify-content: $justify;
    align-items: center;
  }
  .planBox{
    .label{
      color: #B3B9C6;
      font-weight: bold;
      margin-bottom: 10px;
      font-size: 12px;
    }
    .tagContainer{
      // @include displayFlex('flex-start',wrap);
      position: relative;
      align-items: normal;
      .greenTag{
        .tagsShuxingTab{
          background:linear-gradient(225deg,rgba(73,180,81,0.12) 0%,rgba(73,180,81,0) 100%);
          border-radius:4px;
          border:1px solid rgba(73,180,81,0.2);
          font-weight:bold;
          color:rgba(73,180,81,1);
        }
      }
      .purpleTag{
        .tagsShuxingTab{
          background:linear-gradient(225deg,rgba(143,103,212,0.12) 0%,rgba(143,103,212,0) 100%);
          border-radius:4px;
          border:1px solid rgba(143,103,212,0.2);
          font-weight:bold;
          color:#CB59A1 ;
        }
      }
      .tagsShuxing{
        display: inline-block;
        margin-bottom: 12px;
        margin-right: 12px;
        .tagsShuxingTab{
          padding: 0 20px;
          height: 32px;
          line-height: 32px;
          display: inline-block;
          border-radius:4px;
          cursor: pointer;
          span:nth-child(1){
            //@include text-overflow();
            font-size:12px;
            font-family:MicrosoftYaqiHei-Bold,MicrosoftYaqiHei;
            font-weight:bold;
            margin-right: 20px;
          }
        }
        .tagsShuxingContent{
          width: 45vw;
          padding: 12px;
          background:rgba(28,45,90,0.06);
          position: relative;
          left: 12px;
          margin-top: 15px;
          .iconGry{
            display: none;
            position: absolute;
            top: -16px;
            font-size: 24px;
            color: rgba(28,45,90,0.06);
          }
          div{
            @include displayFlex('flex-start',wrap);
            .smallTagsList{
              min-width:132px;
              padding: 0 5px;
              height:32px;
              line-height: 32px;
              margin-right: 12px;
              margin-bottom: 12px;
              background:rgba(255,255,255,1);
              border-radius:4px;
              @include displayFlex();
              span:nth-child(1){
                height:16px;
                font-size:12px;
                font-family:MicrosoftYaqiHei;
                color:rgba(28,45,90,1);
                line-height:16px;
              }
              span:nth-child(2){
                height:17px;
                font-size:14px;
                font-family:Gilroy-Bold,Gilroy;
                font-weight:bold;
                color:rgba(229,131,0,1);
                line-height:17px;
              }
            }
          }
        }
        .icon{
          color: #3A72FF;
          position: relative;
          top: 3px;
        }
      }
    }
    .iconNormal{
      width: 20px;
      height: 20px;
      vertical-align: middle;
    }
  }
  .activegreen{
    margin-bottom: 100px !important;
    .tagsShuxingTab{
      background:linear-gradient(225deg,rgba(73,180,81,1) 0%,rgba(73,180,81,0.8) 100%) !important;
      border-radius:4px;
      span{
        color: #fff;
      }
    }
  }
  .activepurple{
    .tagsShuxingTab{
      background: linear-gradient(225deg, #cb59a1 0%, rgb(227 170 208) 100%) !important;
      border-radius:4px;
      span{
        color: #fff;
      }
    }
  }
  .showOp{
    visibility: visible;
  }
  .rotate{
    transform: rotate(180deg);
  }
  .zb-icon-product-bottom{
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAADNklEQVRIS8WWX2hTdxTHv9/7pzCTso75MFpBh6C+zLHC7GSd0gdT8ru12tuGwZgPGxsytz3MZ3Gp7MFHEXVDRR86xiRt1Nh7gyusbFNWGTjWJ1sQ9+DKHhzr1qYMk9wj9yYpaWyapEiWx+T8zifn/L7f8ztEHZ9+d/C1LLyDFL4FSIcI2/1jpMwB/EMoP5nQrqXU2K+10nGtgD7XHsqLfAHB9lqJgt+JGZ08Nq6So9XiVwXuvxl7OZfLfwORNwqJ+JDgdSEdin4/tMGb87/OLGntwvxWilgCOQCRTcX4KcPQ37nRm3hQCX4KuN+N7c15uTEALwKYI/l5SOmXE0zk16oyJjE94+bfE5FhAH7L/zI0Y/CGSvxQfm4FMIBJfgIiJsCU2db2bqr70kJd7SwG9d96vzU7P/81IP0gswb1feXQZWDQxmzuF78yUju9S73yWZxxrxFYKTYuce1OevoUPPk0qNQ0Xi+1dxkYdeyfC3fGVJe1c2C9sBVQZ/pqsdKptJXcXdAVgECNniT8OzPbXtjRaBurdaHQ3r/v+Xeqa4z56g2AUWfgni99kh+6VvLietpY7Yxy7A9E5IJvmbR1dQcDU3veXV/6YaVvqaXGRv+Mr95FN/+7bxlT0zoZdQeG4eE4qZ11rbFPGk1YT7xyBs+IeB9Dwwkqx/5eRHqg6SqtRtP1JGg0JuoOReHlXZKTVM7AjAi2kS3bXevKbGUy5di3AWkFjIhrJf5cDaac2EtALg3wX9dK7n06x9vbRB7PkJhldNxeACQcDhmtiZ7E4irAr0TkMMC7G83QnpHekUx5zKGbh0KPspkfAekEeD7dlzxcmSM2GQsvZnILABdrAuOTcePO0m8OBBGSTkjpB0rCKo6z6yJigfiua8OrVrwnnqsGJLBQs6X+4cBP/8zfgshOgF+m+5JHAjuN2+cA+QjktPl8W3c1/yqnrKX1isZ27U3/eZgSSAfJ2z5QRN707fQcsTupkg+riWmFaBqxhXLszSI4CSJSHFMThtlyNBX5Nniuqpu/zBZNN37TR9v/MrwLVTbxefKBTX+AA2gzV4ySpJu6RC1Dm7kmlpu3aYtw5cR4lqv+E1rLLuB2YI7yAAAAAElFTkSuQmCC') no-repeat;
    background-size: 100%;
  }
  .zb-icon-purple-bottom{
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAADSklEQVRIS8WWXWhbZRjH//9zmtpgCh3eSFv8QGh7UdaaJmDxY+zCghZsi1pI0p6qbBS7eaHXopl44aWIVlGZ5rTNoCr9gG5gwaLbWCFptsoumsKYSC3eyMpSSW16ziNvPkYamyYpkr0X5+Kc531+533e//99H6KMccMIPblnsR8iz4qwiUCjmibAJil/gLxco8tspzlyvVQ6HhYQCUy+ArE/hEhrqUTp72Qc1N71Tg19Xyz+QODqsPl4ypKwCJ7KJtoAMKdTW9B061aNy7mp3u9tJxttS3/CErsXQB9EmjNcLDt0+jsmjNuF4P8AYz7zhEX8AJGHCGwC2vtdAw98w8FB67BVyvS0vjLzz+uAfU5Uycm/dMHL7gvGz/nz9gEVzKYsisABYL7e2TDUdr4vUVY5s0Frb8zVJ5JbkwBeIpHShM/nQ+8BVRl3LUTSKyM/6WoZfptB2pXAcrESFG0lPvGxQN5SK63V4c2V9x4w6g9dy+7ZvKfVGDgqLB8ajZsz2ZUue8Ij3en9VY+0Gm3rO7VnLmdDW6VlLFYFVd7t5NZaek81/VWl3gzQb64p6RPaac+F4a+PUsZic6K+iVMC+ytlGW/YaKMydSqFGMgNT3/dY6XUWOnPKPVGZ3d+U5ZxOOBmNGCeE1veA/mZN2ycrTRhOfERv/kpRM5Q4weM+kM/ieCkrukvuqeGLpWToNKYWGDyBcu2LpJYYsRnxgFpcTjQ2mmOrBcmi/jMq6TU19U6e9q/HfzzINjN16YfTu4m1c/e9YZHThTG3DBCLakU4gDXGfWZCYG4nMec9e3jg9uFwSuB0Be2jVGSMYeO5zomjL/zY1aHzQdTFn4RETfIL71hY7Qwx82xaVfyTjJBcLskUIJLNSvrvy+IoIfgQtdAXV9OWJnjbGdOIL0kfuxqeaSXwZN7xYAgEiVLqiZn/XRFgOMkP/eEjTH1Puo3x0XkTQK/upwNzxTz7/6Slima1cBkc8q2lgVoInFVAUXwtLJTLbXujqkhdaMcOPaJphJbxPxTj1qwPoJITzozuajXOd5xn/elr6tiY58tqm78qh9t9+XwziiuiteTAlb9AlbQqrYYOUlXtYnKQavaJuabt2qN8AHXy//W6v8LrO4vieDOBr0AAAAASUVORK5CYII=') no-repeat;
    background-size: 100%;
  }
  .zb-icon-product-top{
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAACY0lEQVRIS8WWS4hPcRTHP1+PFbOy8ig0xayUKWXyysLUjDKEjWwUyWvBWkQWlpJXQ9nIBnkUijKNR6YUZWWmxALZ2Jix8jg607m6/+ve/73/f7ru5ta953c+9/c933PuT1S4zGwpsBFYBcwF5sSyT8BH4AlwS9KrsnRqFmBmW4ATwOKyRPF+FDgs6XpRfC7QzBYCV4HlsfADcBu4C7wFfGd++U47gfXAADAvno8A2yS9y4L/AprZGuAGMCsSHwUuS/pZosZUYAdwLD7kC7BZ0nB6XQMwYA+B6cAdYLuk8YpyToaZWQdwBdgAfAfWpaF/gCHji9jZaeCgpF+twJJYM5sCnAIOAL7TZYm8aeDzqJnvbFO7sAz0Zux0RFKPv5sEhhuvRc26WpWxSIWQ903UdKu7NwH6Q7f+LkmX2pGxCXQncBEYldSlaOqXgFt/QZkbW/0YM3P3vo+W6Xag2/gIcFbS/hLrzwdOAr0R544+JCnpy9zlZnYG2Accd+AjYC3QL+l+E2m8qb2hfbQ9i7gVoUyPJFeoCNgH3AOGHOjjaJHXUNJY3ooo/lNgCXBe0t4w2zlgD/AaWFlkNjPz/M4Zc6A39kygQ9JEFmhm02KkuYw+2gaSOkd9fOT5aHvgd0k/cnJ4fudMVAFeAHYDbqzVkr6lE5rZDOAx0A0MSvLYhsvMEuB4qaRm5vXycdUr6XOB5LOjRl8l+SzOAhskrWSaVtsho0KDaSq3RbvQbFv437y+xg971zfa/svwDmh9v6cA+jmmvh9wQL2H6jliJJav9RCVgtZ3TMxMiHoOwjmz8J8d9X8DmMBXhQJnAEIAAAAASUVORK5CYII=') no-repeat;
    background-size: 100%;
  }
</style>
