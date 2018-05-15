<style scoped>
    .index {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
    }

    .index h2 {
        color: #666;
        margin-bottom: 200px;
    }

    .index h2 p {
        margin: 0 0 50px;
    }

    .index .ivu-row-flex {
        height: 100%;
    }
</style>
<template>
    <div class="index">
        <Row type="flex" justify="center" align="middle">
            <Col span="24">
                <h1>
                    <img src="https://raw.githubusercontent.com/iview/iview/master/assets/logo.png">
                </h1>
                <h2>
                    <p>人生若只如初见,何事秋风悲画扇?</p>
                    <router-link to="/lifetime">
                      <Button type="primary">Life&nbsp;&nbsp;Time&nbsp;</Button>
                    </router-link>
                    <Button type="primary" @click="handleStart">Contact Me</Button>
                </h2>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        computed:{
            projectsLength:function(){
                return this.$store.state.projects.length;
            }
        },
        methods: {
            handleStart() {
              const content = "<h5>居住城市：浙江省宁波市</h5><h5>手机号码：18380461811</h5><h5>微&nbsp;&nbsp;信&nbsp;&nbsp;号：li742032660</h5>";
                this.$Modal.info({
                    title: '资料简介',
                    content: content
                });
            }
        }
    };
</script>