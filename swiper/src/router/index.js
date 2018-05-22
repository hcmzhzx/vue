import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import goods from '@/components/goods'
import user from '@/components/user'
import address from '@/components/address'
import shop from '@/components/shop'
import order from '@/components/order'
import orderDetail from '@/components/order-detail'
import addressChoose from '@/components/address-choose'
import addressAdd from '@/components/address-add'
import addressEdit from '@/components/address-edit'
import feedback from '@/components/feedback'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: index
        },
        {
            path: '/goods/:id',
            name: 'goods',
            component: goods
        },
        {
            path: '/user',
            name: 'user',
            component: user
        },
        {
            path: '/address',
            name: 'address',
            component: address
        },
        {
            path: '/shop',
            name: 'shop',
            component: shop
        },
        {
            path: '/address/choose',
            name: 'address-choose',
            component: addressChoose
        },
        {
            path: '/order',
            name: 'order',
            component: order
        },
        {
            path: '/order/detail',
            name: 'order-detail',
            component: orderDetail
        },
        {
            path: '/address/add',
            name: 'address-add',
            component: addressAdd
        },
        {
            path: '/address/edit/:id',
            name: 'address-edit',
            component: addressEdit
        },
        {
            path: '/goods/feedback',
            name: 'feedback',
            component: feedback
        }
    ],
    mode: 'history'
})
