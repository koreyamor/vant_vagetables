import Vue from 'vue'

import {
    Tabbar,
    TabbarItem,
    Loading,
    Image as VanImage,
    Button,
    Toast,
    Dialog,
    NavBar,
    ContactCard,
    ContactEdit,
    ContactList,
    AddressList,
    AddressEdit,
    Cell,
    CellGroup,
    SubmitBar,
} from 'vant';

Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Loading);
Vue.use(VanImage); //图片懒加载
Vue.use(Button);
Vue.use(Toast); //提示
Vue.use(Dialog); //弹框提示
Vue.use(NavBar); //导航栏
Vue.use(ContactCard); //添加地址
Vue.use(ContactEdit); //编辑地址信息
Vue.use(ContactList); //联系人列表
Vue.use(AddressList); //地址列表
Vue.use(AddressEdit); //地址编辑
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(SubmitBar);//提交订单栏