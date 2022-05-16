<template>
  <div>
    <ul>
      <li v-for="item of msgList" :key="item.id">
        <p>
          <span>{{ item.user }}</span>
          <span>{{ new Date(item.dateTime) }}</span>
        </p>
        <p>
          发送: <span>{{ item.msg }}</span>
        </p>
      </li>
    </ul>
    <input type="text" placeholder="请输入消息" v-model="msg" />
    <button @click="handleSendBtnClick">发送</button>
  </div>
</template>

<script  setup>
// msgList []
// {
//   id: new Date().getTime(),
//   user: username => localStorgae
//   dateTime: new Date().getTime()
//   msg: msg
// }

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useWebSocket } from '../hooks'
const msg = ref('')
const msgList = ref([])
const router = useRouter()

// 接收后端返回的数据
const handleMessage = (e) => {
  console.log(e)
  const _msgData = JSON.parse(e.data)
  msgList.value.push(_msgData)
}
const ws = useWebSocket(handleMessage)

let username = ''

onMounted(() => {
  username = localStorage.getItem('username')
  if (!username) {
    router.push('/login')
  }
})
const handleSendBtnClick = () => {
  const _msg = msg.value
  if (!_msg.trim().length) {
    return
  }
  ws.send(
    JSON.stringify({
      id: new Date().getTime(),
      user: username,
      dateTime: new Date().getTime(),
      msg: msg.value
    })
  )

  // 清空msg
  msg.value = ''
}
</script>
