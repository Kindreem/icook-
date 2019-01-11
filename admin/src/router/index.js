import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home1'

import user from '@/components/user/user'

import power from '@/components/system/power'
import manager from '@/components/system/manager'
import operation from '@/components/system/operation'

import official from '@/components/menu/official'

import food from '@/components/food/food'
import condiment from '@/components/food/condiment'
import excipients from '@/components/food/excipients'
import foods from '@/components/foods/foods'
import genre from '@/components/genre/genre'

import packingStep from '@/components/process/packingStep'
import addfood from '@/components/process/addfood'
import step1addfood from '@/components/process/step1addfood'
import step2addfood from '@/components/process/step2addfood'
import step3addfood from '@/components/process/step3addfood'
import step4addfood from '@/components/process/step4addfood'
import step5addfood from '@/components/process/step5addfood'
import step6addfood from '@/components/process/step6addfood'
import countStepview from '@/components/process/countStepview'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      redirect:'/official',
      children:[
        {
        path: '/power',
        name: 'power',
        component: power
        },
        {
        path: '/manager',
        name: 'manager',
        component: manager
        },
        {
        path: '/operation',
        name: 'operation',
        component: operation
        },
        {
        path: '/user',
        name: 'user',
        component: user
        },
        {
        path: '/official',
        name: 'official',
        component: official
        },
        {
        path: '/food',
        name: 'food',
        component: food
        },
        {
          path:'/foods',
          name: 'foods',
          component: foods
        },
        {
        path: '/condiment',
        name: 'condiment',
        component: condiment
        },
        {
        path: '/excipients',
        name: 'excipients',
        component: excipients
        },
        {
          path:'/genre',
          name:'genre',
          component:genre
        },
        {
          name:'packingStep',
          path:'/packingStep',
          component:packingStep,
        },
        {
          name:'addfood',
          path:'/addfood',
          component:addfood,
          children:[
            {
            name:'step1addfood',
            path:'/step1addfood',
            component:step1addfood,
          },
            {
              name:'step2addfood',
              path:'/step2addfood',
              component:step2addfood,
            },
            {
              name:'step3addfood',
              path:'/step3addfood',
              component:step3addfood,
            },
            {
              name:'step4addfood',
              path:'/step4addfood',
              component:step4addfood,
            },
            {
              name:'step5addfood',
              path:'/step5addfood',
              component:step5addfood,
            },
            {
              name:'step6addfood',
              path:'/step6addfood',
              component:step6addfood,
            },
          ]
        },
        {
          name:'countStepview',
          path:'/countStepview',
          component:countStepview,

        },

      ]
    }

  ]
})
