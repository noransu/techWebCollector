<template>
<!-- :style="{backgroundColor: cardColor}" -->
  <div @click.stop="toggleShowDetail" class="cursor-pointer w-full min-h-2 mt-3 rounded-3xl flex flex-col transition-all duration-500 bg-gray-700">
    <div class="flex justify-start items-center">
      <div class="icon-wrap h-12 w-12 rounded-full flex justify-center items-center">
        <div class="bg-white w-8 h-8 rounded-full pr-5"></div>
      </div>
      <p class="text-lg font-bold text-white">{{cardTitle}}</p>
    </div>
    <div class="flex flex-wrap justify-between px-6 mb-4" v-if="showChild">
      <div v-for="child in cardChild" :key="child.name" @click.stop="handleClickContent(child)" class="flex justify-start items-center items-center w-full bg-white rounded-full mt-2 px-2">
        <img class="w-5 h-5 rounded-full mr-3 object-contain" :src="child.icon || 'https://cdn.jsdelivr.net/gh/noransu/images-myown@master/noransImage/image.37s3g1ke2hs0.png'"/>
        <span class="font-sans">{{child.name}}</span>
      </div>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { propTypes } from '@/utils/propTypes'

export default defineComponent({
  props: {
    cardColor: propTypes.string,
    cardTitle: propTypes.string,
    cardChild: propTypes.object
  },
  emits: ['clickContent'],
  setup(_, { emit }) {
    const showChild = ref(false)

    function toggleShowDetail():void {
      showChild.value = !showChild.value
    }

    function handleClickContent(item:LinkConfig):void {
      emit('clickContent', item)
    }

    return {
      showChild, toggleShowDetail, handleClickContent
    }
  }
})
</script>
