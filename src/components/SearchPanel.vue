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
  setup(_, { emit }) {
    function handleClickContent(item:LinkConfig):void {
      emit('clickContent', item)
    }

    return {
      handleClickContent
    }
  }
})
</script>
