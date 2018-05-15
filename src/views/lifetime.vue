<style scoped>
.time,
.milepost-title {
  font-size: 14px;
  font-weight: bold;
}
.content {
  padding-left: 5px;
}
.left-background {
  background: #eee;
  padding: 20px;
}
.right-background {
  padding: 30px 20px;
}
.reward img {
  width: 49%;
}
.message-user-name {
  color: green;
}
</style>
<template>
  <Row>
    <Col :xs="24" :sm="8" :md="8" :lg="8" class="left-background">
    <Card :bordered="false">
      <p slot="title">网站简介</p>
      <div style="text-align: center;">
        <p>饮酒</p>
        <p>作者：陶渊明</p>
        <p>结庐在人境，而无车马喧。</p>
        <p>问君何能尔？心远地自偏。</p>
        <p>采菊东篱下，悠然见南山。</p>
        <p>山气日夕佳，飞鸟相与还。</p>
        <p>此中有真意，欲辨已忘言。</p>
      </div>
      </br>
      <p>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;本人非常向往陶渊明的生活，和他对于世事的态度。 奈何世间烦恼千千万，如何才能到这样的地步呢？ 只待一天功成生就，归隐乡间。 所以在此和各位聊聊。
      </p>
    </Card>
    </br>
    <Card :bordered="false" class="">
      <p slot="title">网站开发语言</p>
      <div style="font-weight: 600;">
        <p>前端框架：Vue</p>
        <p>后端框架：SpringBoot+Mysql</p>
        <p>服务器：Ubuntu</p>
        <p>剩下的都是小打小闹了。</p>
      </div>
    </Card>
    </br>
    <Card :bordered="false" class="">
      <p slot="title">赞助打赏</p>
      <div style="">
        <p>觉得对你有帮助，请多多支持哦！</p>
        <div class="reward">
          <img v-for="(reward, index) in rewardList" :src="reward.imgUrl" @click="showImg(reward)">
        </div>
      </div>
    </Card>
    </Col>
    <Col :xs="24" :sm="16" :md="16" :lg="16" class="right-background">
    <Timeline>
      <TimelineItem color="green">
        <Icon type="trophy" slot="dot"></Icon>
        <span class="milepost-title">2018-05-14正式发布</span>
      </TimelineItem>
      <TimelineItem>
        <p class="time">
          <span>
            2018-05-14 14:34:32
          </span>
          <span class="message-user-name">
            【昵称为空】
          </span>
        </p>
        <p class="content">
          哈哈哈，我就是第一条，突破零的记录
        </p>
        <div>
          <Button icon="arrow-up-b" type="dashed" size="small" @click="handleAdd">999+</Button>
          <Button icon="arrow-down-b" type="dashed" size="small" @click="handleAdd">999+</Button>
        </div>
      </TimelineItem>
      <TimelineItem>
        <p class="time">1976年</p>
        <p class="content">Apple I 问世</p>
      </TimelineItem>
      <TimelineItem>
        <p class="time">1976年</p>
        <p class="content">Apple I 问世</p>
      </TimelineItem>
    </Timeline>
    </Col>
  </Row>
</template>
<script>
import ModalImg from "../components/ModalImg";
import alipayPay from "../resources/images/alipay-pay.jpg";
import wxPay from "../resources/images/wx-pay.png";
export default {
  data() {
    return {
      tagChecked: false,
      rewardList: [
        {
          name: "支付宝",
          imgUrl: alipayPay
        },
        {
          name: "微信",
          imgUrl: wxPay
        }
      ],
      chatHistoryList: [
        {
          id: "",
          userName: "",
          content: "",
          createTime: "",
          like: 0,
          disLike: 0
        }
      ]
    };
  },
  components: {
    ModalImg
  },
  methods: {
    showImg(that) {
      this.$Modal.info({
        title: that.name,
        closable: true,
        render: h => {
          return h(ModalImg, {
            props: {
              imgUrl: that.imgUrl
            },
            on: {}
          });
        }
      });
    }
  }
};
</script>
