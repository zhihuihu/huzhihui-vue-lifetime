const routers = [{
  path: '/',
  meta: {
    title: '人生'
  },
  component: (resolve) => require(['./views/index.vue'], resolve)
}, {
  path: '/project',
  meta: {
    title: '项目'
  },
  component: (resolve) => require(['./views/project.vue'], resolve)
}, {
  path: '/lifetime',
  meta: {
    title: '随便聊聊-生命历程'
  },
  component: (resolve) => require(['./views/lifetime.vue'], resolve)
}];
export default routers;