<template>
  <div class="page-container">
    <div class="article-group">
      <div  class="card article-card" v-for="item in currentItems" >
        <div class="" @click="handlerClick(item.link)">
          <h2 class="overview">
            {{item.title }}
          </h2>
          <div class="article-content">
            <div class="banner-box" :style="[{
          backgroundColor: `#f1f1f1`,
          backgroundImage: `url(${item.img})`,
          backgroundRepeat: `no-repeat`,
          backgroundSize: `contain`,
          backgroundPosition: `center center dgjrk `
        }]">
            </div>
            <div class="text-box">
              <p class="text" >
                {{ item.description}}
              </p>
              <span>{{ item.author}}</span>
              <p class="footerq">
                <span> {{ formarter(item.date) }}</span>
                <i class="el-icon-date"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <el-pagination
       small
      layout="total, prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :page-sizes="pageSizes"
      :current-page="currNum"
      :pager-count="pagerCount"
      @size-change="pageSize = arguments[0]"
      @current-change="currNum = arguments[0]">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        currNum: 1,
        pageSize: 5,
        pagerCount: 5,
        pageSizes: [5, 10, 20, 50]
      }
    },
    computed: {
      items () {
        return this.$page.frontmatter.items
      },

      total () {
        return this.items.length || 0
      },

      currentItems () {
        const { items, currNum, pageSize } = this
        const start = (currNum - 1) * pageSize
        return items.slice(start, start + pageSize)
      }
    },

    methods: {
      formarter (data) {
        return data.substring(0, 10)
      },
      handlerClick (link) {
        this.$router.push(this.$page.path + link + '.html')
      }
    }
  }
</script>

<style lang="stylus">
.page-container
  max-width 800px
  margin 100px auto 0
  .article-group
    margin-right 10px
    padding-bottom 10px
    .card
      background #fff
      overflow hidden
      border-radius 2px
      box-shadow: 10px 10px 5px rgba(26,26,26,.2)
      box-sizing border-box
      margin 0 auto
      margin-bottom 20px
    .banner-box{
      /* box-shadow: 10px 10px 5px rgba(26,26,26,.2) */
    }
    .el-pagination{
      text-align center
    }
  @media (max-width ($MQNarrow + 1px))
    .article-group
      margin-right 0

  @media screen and (max-width: 500px) {
      .article-group .card{
        box-shadow none
      }
      div.article-card {
        text-align center
        box-shadow none
        .banner-box {
          width 100%
          height 200px
          box-shadow none
        }
        .article-content {
          display flex
          flex-direction column
          .text-box {
            p {
              margin-top 10px
              height auto
              max-height 72px
            }
          }
        }
      }
    }

  .article-card
    position relative
    padding 0 20px 16px
    cursor pointer
    h2:not(.overview)
      border 0
    .banner-box
      width 174px
      margin-right 20px
      height 104px
      .article-banner
        width 100%
        height 100%
    .article-content
      display flex
      .text-box
        flex 1
        text-align left
        p.text
          margin 0
          margin-bottom 10px
          padding-top 10px
          line-height 24px
          height 48px
          overflow  hidden
          display -webkit-box
          -webkit-line-clamp 2
          /* autoprefixer: off*/
          -webkit-box-orient vertical
        /* autoprefixer: on*/
        a
          text-align center
          float left
        p.footerq
          float right
          display inline-block
          margin 0
          font-size 14px

  .time
    font-weight normal
    float right
    font-size 16px

</style>
