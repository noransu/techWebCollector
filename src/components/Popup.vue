<template>
  <van-popup v-model:show="show" position="bottom" closeable round :style="{ height: '70%' }">
    <div class="font-sans font-semibold mt-2 text-2xl px-4 py-2">Detail</div>
    <div class="w-full h-11/12 px-10 py-3 overflow-auto">
      <div @click="handleClickContent(item)"
      class="cursor-pointer flex flex-wrap justify-start items-center mt-2 border-1 p-2 border-white rounded-full bg-gray-700"
      v-for="item in popupContent" :key="item.name">
        <img class="w-5 h-5 rounded-full mr-3 object-contain"
        :src="item.icon || 'https://cdn.jsdelivr.net/gh/noransu/images-myown@master/noransImage/image.37s3g1ke2hs0.png'"/>
        <span class="font-sans text-white font-semibold truncate" style="width: 80%">{{item.name}}</span>
      </div>
    </div>
  </van-popup>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Popup } from 'vant'

export default defineComponent({
  components: {
    [Popup.name]: Popup
  },
  props: {
    popupContent: {
      type: Array as PropType<Array<LinkConfig>>,
      default: () => []
    }
  },
  emits: ['clickContent'],
  setup(_, { emit }) {
    const show = ref(false)

    const showPopup = () => {
      show.value = true
    }

    const closePopup = () => {
      show.value = false
    }

    function handleClickContent(item:LinkConfig):void {
      emit('clickContent', item)
    }

    return {
      show,
      showPopup,
      closePopup,
      handleClickContent
    }
  }
})
</script>
