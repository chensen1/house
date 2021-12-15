import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/login.vue'
const Layout = () => import('@/components/layout.vue')
const Notfound = () => import('@/views/notFound.vue')

const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'logn',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      meta: {
        title: '首页'
      },
      component: () => import('./views/home/index.vue')
      // children: [
      //   {
      //     path: '/home',
      //     name: 'home',
      //     meta: {
      //       activeMenu: '/'
      //     },
      //     component: () => import('./views/home/index.vue')
      //   }
      // ]
    },
    {
      path: '/searchHouse',
      name: 'searchHouse',
      redirect: '/searchHouse',
      meta: {
        title: '挂牌房源公示'
      },
      component: Layout,
      children: [
        {
          path: '/searchHouse',
          name: 'searchHouse',
          meta: {
            activeMenu: '/searchHouse'
          },
          component: () => import('./views/buy/searchHouse.vue')
        }
      ]
    },
    {
      path: '/myHouse',
      name: 'myHouse',
      redirect: '/myHouse',
      meta: {
        title: '个人自主挂牌'
      },
      component: Layout,
      children: [
        {
          path: '/myHouse',
          name: 'myHouse',
          meta: {
            activeMenu: '/myHouse'
          },
          component: () => import('./views/sell/myHouse.vue')
        },
        {
          path: '/newAdd',
          name: 'newAdd',
          meta: {
            activeMenu: '/myHouse'
          },
          component: () => import('./views/sell/newAddSource.vue')
        }
      ]
    },
    {
      path: '/myRecord',
      name: 'myRecord',
      redirect: '/myRecord',
      meta: {
        title: '我的记录'
      },
      component: Layout,
      children: [
        {
          path: '/myRecord',
          name: 'myRecord',
          meta: {
            activeMenu: '/myRecord'
          },
          component: () => import('./views/record/index.vue')
        }, {
          path: '/houseInfo',
          name: 'houseInfo',
          meta: {
            activeMenu: '/myRecord'
          },
          component: () => import('./views/record/houseInfo.vue')
        }, {
          path: '/toAgree',
          name: 'toAgree',
          meta: {
            activeMenu: '/toAgree'
          },
          component: () => import('./views/record/toAgree.vue')
        }, {
          path: '/toSign',
          name: 'toSign',
          meta: {
            activeMenu: '/toSign'
          },
          component: () => import('./views/record/signContract.vue')
        }, {
          path: '/toThirdPartyAccount',
          name: 'toThirdPartyAccount',
          meta: {
            activeMenu: '/toThirdPartyAccount'
          },
          component: () => import('./views/record/toThirdPartyAccount.vue')
        }, {
          path: '/buyersPay',
          name: 'buyersPay',
          meta: {
            activeMenu: '/buyersPay'
          },
          component: () => import('./views/record/buyersPay.vue')
        }, {
          path: '/sellerPay',
          name: 'sellerPay',
          meta: {
            activeMenu: '/sellerPay'
          },
          component: () => import('./views/record/sellerPay.vue')
        }, {
          path: '/credentials',
          name: 'credentials',
          meta: {
            activeMenu: '/credentials'
          },
          component: () => import('./views/record/credentials.vue')
        }, {
          path: '/applyForMoney',
          name: 'applyForMoney',
          meta: {
            activeMenu: '/applyForMoney'
          },
          component: () => import('./views/record/applyForMoney.vue')
        }
      ]
    },
    // {
    //   path: '/houseInfo',
    //   name: 'houseInfo',
    //   redirect: '/houseInfo',
    //   meta: {
    //     title: '交易记录'
    //   },
    //   component: Layout,
    //   children: [
    //     {
    //       path: '/houseInfo',
    //       name: 'houseInfo',
    //       meta: {
    //         activeMenu: '/houseInfo'
    //       },
    //       component: () => import('./views/record/houseInfo.vue')
    //     }
    //   ]
    // },
    {
      path: '/help',
      name: 'help',
      redirect: '/help',
      meta: {
        title: '服务指南'
      },
      component: Layout,
      children: [
        {
          path: '/help',
          name: 'help',
          meta: {
            activeMenu: '/help'
          },
          component: () => import('./views/help/index.vue')
        }
      ]
    },
    {
      path: '*',
      name: 'index',
      redirect: '/notFound',
      component: Layout,
      children: [
        {
          path: '/notFound',
          name: 'notFound',
          component: Notfound
        }
      ]
    }
  ]
})
