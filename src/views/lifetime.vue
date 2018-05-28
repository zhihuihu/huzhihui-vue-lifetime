<style scoped>
.time,
.milepost-title {
  font-size: 14px;
  font-weight: bold;
}
.content {
  padding-top: 10px;
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
.message-oper {
  padding-top: 10px;
  padding-left: 5px;
}
.chat-fiex {
  position: fixed;
  bottom: 40px;
  right: 30px;
}
</style>
<template>
  <div>
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
        <TimelineItem v-for="(messageRecord, index) in messageRecordList" :color="messageRecord.type === 10 ? 'green':'blue'">
          <Icon type="trophy" slot="dot" v-if="messageRecord.type === 10"></Icon>
          <p class="time">
            <span>
              {{ messageRecord.createTime }}
            </span>
            <span class="message-user-name">
              【{{ messageRecord.userName }}】
            </span>
          </p>
          <p class="content">
            {{ messageRecord.content }}
          </p>
          <div class="message-oper">
            <Button icon="arrow-up-b" size="small">{{ messageRecord.likes }}</Button>
            <Button icon="arrow-down-b" size="small">{{ messageRecord.dislikes }}</Button>
          </div>
        </TimelineItem>
      </Timeline>
      </Col>
    </Row>
    <div class="chat-fiex">
      <Button type="info" icon="chatboxes" @click="showChatModal">聊一聊</Button>
    </div>
    <Modal title="随便说一说" v-model="chatModel" @on-ok="sumitMessage" :loading="chatModelLoading">
      <Form ref="chatFormInline" :model="chatFormInline" :rules="chatFormRuleInline">
        <FormItem prop="randomNameStr">
          <Input type="text" v-model="chatFormInline.randomNameStr" placeholder="随机一个昵称吧" style="width: 200px">
          </Input>
          <Button type="success" icon="ios-compose" @click="randomName">随机昵称</Button>
        </FormItem>
        <FormItem prop="chatMessage">
          <Input type="textarea" :rows="4" v-model="chatFormInline.chatMessage" placeholder="Enter something..." style="width: 100%;">
          </Input>
        </FormItem>
      </Form>

    </Modal>
  </div>
</template>
<script>
import ModalImg from "../components/ModalImg";
import { getRandomName } from "../resources/js/baseFunction.js";
export default {
  data() {
    return {
      tagChecked: false,
      chatModel: false,
      chatModelLoading: true,
      chatMessage: "",
      randomNameStr: "",
      rewardList: [
        {
          name: "支付宝",
          imgUrl: require("../resources/images/alipay-pay.jpg")
        },
        {
          name: "微信",
          imgUrl: require("../resources/images/wx-pay.png")
        }
      ],
      messageRecordList: [],
      chatFormInline: {
        chatMessage: "",
        randomNameStr: ""
      },
      chatFormRuleInline: {
        chatMessage: [
          {
            required: true,
            message: "请输入杂谈内容.",
            trigger: "blur"
          }
        ],
        randomNameStr: [
          {
            required: true,
            message: "请输入用户名.",
            trigger: "blur"
          }
        ]
      }
    };
  },
  components: {
    ModalImg
  },
  created: function () {
    console.log(this);
    this.reflashCommentRecord();
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
    },
    showChatModal() {
      this.chatModel = !this.chatModel;
    },
    randomName() {
      this.chatFormInline.randomNameStr = getRandomName();
    },
    reflashCommentRecord(method) {
      var _this = this;
      this.$http({
        method: "post",
        url: "/api/messageRecord/queryMessageRecordList",
        data: JSON.stringify({ currentPage: 1, pageSize: 10 })
      }).then(data => {
        const { messageRecordList } = this;
        const { msg } = data;
        if (method === "reflash") {
          this.messageRecordList = msg;
        } else {
          this.messageRecordList = [...messageRecordList, ...msg];
        }
      });
    },
    sumitMessage() {
      let _this = this;
      this.$refs["chatFormInline"].validate(valid => {
        if (valid) {
          let jsonStr = {
            userName: _this.chatFormInline.randomNameStr,
            content: _this.chatFormInline.chatMessage
          };
          this.$http({
            method: "post",
            url: "/api/messageRecord/saveMessageRecord",
            data: JSON.stringify(jsonStr)
          }).then(function (data) {
            _this.$refs["chatFormInline"].resetFields();
            _this.chatModel = false;
            _this.$Message.success(data.msg);

            _this.reflashCommentRecord();
          }).catch(function (error) {
            _this.chatModelLoading = false;
            _this.$nextTick(() => {
              _this.chatModelLoading = true;
            });
          });
        } else {
          _this.$Message.error("请检查参数是否完整！");
          _this.chatModelLoading = false;
          _this.$nextTick(() => {
            _this.chatModelLoading = true;
          });
        }
      });
    }
  }
};
</script>
