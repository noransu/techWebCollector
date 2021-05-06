<template>
  <div class="bg-white rounded-lg w-full h-11/12 mt-3 shadow-md p-2 overflow-hidden">
    <!-- history part -->
    <div v-if="historyRecords && historyRecords.length > 0" class="font-sans font-semibold mt-2 text-2xl px-4">History</div>
    <div v-if="historyRecords && historyRecords.length > 0" class="p-3">
      <div @click="handleClickContent(item)" class="cursor-pointer flex flex-wrap justify-start items-center mt-2 border-1 p-1 border-white rounded-full bg-gray-700" v-for="item in historyRecords" :key="item.name">
        <img class="w-5 h-5 rounded-full mr-3 object-contain" :src="item.icon || 'https://cdn.jsdelivr.net/gh/noransu/images-myown@master/noransImage/image.37s3g1ke2hs0.png'"/>
        <span class="font-sans text-white font-semibold">{{item.name}}</span>
      </div>
    </div>
    <!-- filter part -->
    <div>
      <div  class="font-sans font-semibold mt-2 text-2xl px-4">Filter Result</div>
      <div v-if="filteredLinks.length === 0" class="font-sans font-semibold mt-2 text-xl px-4">Is Empty</div>
      <div class="p-3 overflow-auto h-md">
        <div @click="handleClickContent(item)" class="cursor-pointer flex flex-wrap justify-start items-center mt-2 border-1 p-1 border-white rounded-full bg-gray-700" v-for="item in filteredLinks" :key="item.name">
          <img class="w-5 h-5 rounded-full mr-3 object-contain" :src="item.icon || 'https://cdn.jsdelivr.net/gh/noransu/images-myown@master/noransImage/image.37s3g1ke2hs0.png'"/>
          <span class="font-sans text-white font-semibold">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { HISTORY_VIEW } from '@/utils/constant'
import { setStorageItem } from '@/utils/chromeActions'

export default defineComponent({
  components: {
  },
  props: {
    filteredLinks: {
      type: Array as PropType<Array<LinkConfig>>,
      default: () => []
    },
    historyRecords: {
      type: Array as PropType<Array<LinkConfig>>,
      default: () => []
    }
  },
  emits: ['clickContent'],
  setup(props, { emit }) {
    function handleClickContent(item:LinkConfig):void {
      const oldHistory = props.historyRecords || []
      if (!oldHistory.some((key) => key.name === item.name)) {
        const newHistory = [item].concat(oldHistory)
        if (newHistory && newHistory.length > 6) newHistory.splice(-1)
        setStorageItem(HISTORY_VIEW, JSON.stringify(newHistory))
      }
      emit('clickContent', item)
    }

    return {
      handleClickContent
    }
  }
})
</script>
