<template>
  <div class="home app-container">
    <div>
      <table-view
        :proList="tableData"
        :columns="columns"
        :options="options"
        :page="page"
        @selectChange="selectChange"
        @pageSizeChange="pageSizeChange"
        @pageIndexChange="pageIndexChange"
      ></table-view>
    </div>
    <from-view
      :ruleForm='ruleForm'
      v-model:dialogVisible="dialogVisible"
      @submitForm="submitForm"
      :rules='rules'
    ></from-view>
    <!-- 数量：{{userStore.counter}}
    <el-button
      type="primary"
      @click="addCount()"
    >增加</el-button>
    <el-button
      type="danger"
      @click="delCount()"
    >减</el-button>
    <div>{{msgTitle}}</div> -->
    <!-- <div>
      <paginaSize
        :total='total'
        v-model:page="pageIndex"
        v-model:limit="limit"
        @pagination="getListPg"
      >
      </paginaSize>
    </div> -->
    <!-- <div>
    <modelTest v-model:msgTitle="msgTitle"></modelTest>
  </div> -->
  </div>
</template>

<script lang="ts" setup>
import modelTest from "@/components/modelTest.vue"; // @ is an alias to /src
import paginaSize from "@/components/paginaSize.vue";
import tableView from "@/components/TableView/index.vue";
import FromView from "./components/FromView.vue";
// 使普通数据变响应式的函数
import { mainStore } from "@/store/index";
import { ref, toRefs, reactive, h, watch, onMounted } from "vue";
import API from "@/api/http";
import { ElButton } from "element-plus";
import { useMousePosition } from "@/hooks/useMousePosition";
import { type GetTableResponseData } from "@/api/types/table";
//表单展示类型参数
interface IRowMeta {
  id: string;
  username: string;
  nickname: string;
  phone: string;
  author: string;
  display_time: boolean;
  pageviews: string;
}

// let point = useMousePosition();
// console.log("point1", point);
const userStore = mainStore();
let msgTitle = ref<string>("haooddddjjhhh");
let total = ref<number>(100);
interface Query {
  pageIndex: number;
  limit: number;
}

let listQuery: Query = reactive({
  pageIndex: 1,
  limit: 10,
});
const { pageIndex, limit } = toRefs(listQuery);
let columns = [
  { name: "账号", property: "username" },
  { name: "名称", property: "nickname" },
  { name: "创建时间", property: "author" },
  { name: "商品价格", property: "display_time" },
  { name: "商品原价", property: "pageviews" },
  {
    name: "操作",
    property: "state",
    link: true,
    render: (scope: any) => {
      return h("div", null, [
        h(
          ElButton,
          {
            type: "primary",
            size: "small",
            onClick: () => getDetail(scope.row),
          },
          { default: () => "编辑" }
        ),
        h(
          ElButton,
          {
            type: "danger",
            size: "small",
            onClick: () => getDel(scope.row),
          },
          { default: () => "删除" }
        ),
      ]);
    },
  },
];
const state = reactive({
  tableData: [
    {
      username: "xw",
      nickname: "xw",
      author: "2022-12-23",
      display_time: 26,
      pageviews: "30",
    },
  ],
  dialogVisible: false,
  ruleForm: {
    id: "",
    username: "",
    nickname: "",
  },
  rules: {
    username: [
      {
        required: true,
        message: "请输入姓名",
        trigger: "blur",
      },
    ],
  },
});

const { tableData, dialogVisible, ruleForm, rules } = toRefs(state);

let page = reactive({
  show: true,
  total: 0,
  pageIndex: 1,
  pageSize: 10,
});
let options = reactive({
  header: true,
  loading: false,
  stripe: true,
  border: false,
  indexNum: true,
  select: true,
});

//监听listQuery
watch(listQuery, (newValue, oldValue) => {
  //监视reactive定义的响应式数据时，oldValue无法正确获取，oldValue值和newValue值始终一样
  console.log("watch1", newValue, oldValue);
});
//监听listQuery中某个值
watch(
  () => listQuery.pageIndex,
  (newValue, oldValue) => {
    console.log("watch2", newValue, oldValue);
  }
);
const addCount = () => {
  userStore.addCounter();
};
const delCount = () => {
  userStore.delCounter();
};

const getListPg = (data: object) => {
  // listQuery.page = data.page;
  // listQuery.limit = data.limit;
  Object.assign(listQuery, data);

  console.log("kkk", data, listQuery);
};
// 多选
const selectChange = (val: object) => {
  console.log(val);
};
// 改变分页显示条数
const pageSizeChange = (val: number) => {
  console.log(val);
};
// 点击页数
const pageIndexChange = (val: number) => {
  console.log(val);

  Object.assign(page, { pageIndex: val });
  getList();
};
const getDetail = (val: IRowMeta) => {
  let data = { ...val };
  console.log(data);
  state.ruleForm = {
    id: data.id,
    username: data.username,
    nickname: data.nickname,
  };
  state.dialogVisible = true;
};
const submitForm = (data) => {
  console.log("submitForm", data);
};
const getDel = (val: IRowMeta) => {};
const getList = () => {
  API.channelList({ page: page.pageIndex, limit: page.pageSize })
    .then((res: any) => {
      let list = res.data.list.map((item: any) => {
        return item.user;
      });
      state.tableData = list;

      page.total = res.data.total;
    })
    .catch(() => {
      state.tableData = [];
      page.total = 0;
    });
};

const fnts = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

// onMounted(() => {
//   getList();
// });
</script>
