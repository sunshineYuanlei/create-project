<template>
  <div class="container" @mousedown="mousedown">
    <h1>ToDoList</h1>
    <h3>
      共有<span class="text-primary">{{ lists.length }}</span
      >个任务，其中<span class="text-success">{{ finished.length }}</span
      >项已完成
    </h3>
    <h3>未完成的列表</h3>
    <ul>
      <template v-for="(item, index) in lists" :key="index">
        <li class="list-group-item d-flex justify-content-between" v-if="!item.checked">
          <div class="form-group form-check mb-0">
            <input
              type="checkbox"
              class="form-check-input"
              :id="'item-' + index"
              v-model="item.checked"
              @click="item.checked = !item.checked"
            />
            <label
              v-if="!item.isEdit"
              class="form-check-label"
              @dblclick="showEdit(item, index)"
              >{{ item.name }}</label
            >
            <label v-else class="form-check-label" :for="'item-' + index">
              <input type="text" v-model="editValue" ref="myinput" />
            </label>
          </div>
          <button
            type="button"
            class="close"
            aria-label="Close"
            @click="remove(index)"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </li>
      </template>
    </ul>
    <h3>已完成的列表</h3>
    <ul>
      <li
        class="list-group-item"
        v-for="(item, index) in finished"
        :key="'finished-' + index"
      >
        <div class="form-group form-check">
          <input
            type="checkbox"
            class="form-check-input"
            :id="'finished-' + index"
            v-model="item.checked"
            disabled
          />
          <label class="form-check-label" :for="'finished-' + index">{{
            item.name
          }}</label>
        </div>
      </li>
    </ul>
    <h3>添加新的Task</h3>
    <div class="form-group">
      <label for="add">添加</label>
      <input
        type="text"
        class="form-control"
        id="add"
        placeholder="添加新的Task"
        v-model="value"
        @keydown.enter="add"
      />
    </div>
    <button type="button" class="btn btn-primary btn-lg btn-block" @click="add">
      确定添加
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "@vue/reactivity";
import { reactive, toRefs, getCurrentInstance, onMounted } from "vue";

const currInstance = getCurrentInstance()  
let editIndex = 0
const state: any = reactive({
  lists: [
    { name: "1", checked: false, isEdit: false },
    { name: "2", checked: false, isEdit: false },
    { name: "3", checked: false, isEdit: false },
  ],
  finished: computed(() =>
    state.lists.filter((item: { checked: boolean }) => item.checked)
  ),
  value: "",
  editValue: ""
});
let { lists, finished, value, editValue } = toRefs(state);
const add = () => {
  const tmp = { name: state.value, checked: false, isEdit: false };
  state.lists.push(tmp);
  state.value = "";
};
const showEdit = (item: any, index: number) => {
  editIndex = index
  console.log("```index", index);
  item.isEdit = true;
  state.editValue = item.name;
};

const mousedown = (e: any) => {
    const instance = currInstance as any
    const dom = instance.ctx.$refs?.myinput?.[0] 
    console.log('``dom', dom, e, e.target)
    if(dom && e.target !== dom){
      state.lists[editIndex] = {name: state.editValue,  checked: false, isEdit: false}
    }
}

const remove = (index: number) => {
    state.lists.splice(index, 1)
}

onMounted(() => {
    console.log('```onMounted')
})


</script>
