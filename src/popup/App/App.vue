<template>
<!-- w-full h-screen -->
  <div class="flex mx-auto flex-col justify-start bg-primary p-3 min-w-sm min-h-3xl">
    <van-sticky class="w-full">
      <div class="w-full flex justify-start py-2 box-border z-100 bg-white">
        <div class="flex w-full">
          <div class="shadow-md flex justify-between w-5/6 px-3 mr-3 rounded-full bg-white p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
              <defs/>
              <circle cx="11" cy="11" r="8"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input v-model="filterWord"
                  @focus="focusInput"
                  @input="onInput"
                  class="pl-2 main-color text-opacity-60 w-full"
                  type="text"
                  placeholder="Search"/>
          </div>
          <!-- eslint-disable-next-line max-len -->
          <div class="cursor-pointer bg-gray-700 rounded-full w-18 flex justify-center items-center text-white font-semibold">
            <span v-if="!isFocus" @click.stop="onInput">搜索</span>
            <span v-else @click.stop="onCancel">取消</span>
          </div>
        </div>
      </div>
    </van-sticky>
    <transition name="fade">
      <div v-if="!isFocus"
      class="bg-white rounded-lg w-full h-full mt-3 shadow-md p-2 overflow-auto">
        <!-- title -->
        <div class="font-sans font-semibold mt-2 text-2xl px-4">Main Panel</div>
        <!-- card-body -->
        <div class="mt-2">
          <div v-if="selfTagLinks && selfTagLinks.length > 0">
            <card card-title="我的书签(总)"
                  :card-child="selfTagLinks"
                  @clickContent="clickContent" />
          </div>
          <div v-for="item in levelOneLinks" :key="item.name">
            <card :card-title="item.name"
                  :card-child="item.child"
                  @clickContent="clickContent" />
          </div>
        </div>
      </div>
    </transition>
    <search-panel v-if="isFocus"
                  :filteredLinks="filteredLinks"
                  :historyRecords="historyRecord"
                  @clickContent="clickContent" />
    <popup ref="popupRef" :popup-content="popupContent" @clickContent="clickContent" />
  </div>
</template>

<script lang="ts">
import { Sticky } from 'vant'
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useDebounceFn } from '@vueuse/core'
import { useHomeStore } from '@/store/modules/home'
import Popup from '@/components/Popup.vue'
import Card from '@/components/Card.vue'
import SearchPanel from '@/components/SearchPanel.vue'
import { HISTORY_VIEW } from '@/utils/constant'
import { tabAction, getStorageItem, setStorageItem } from '@/utils/chromeActions'

export default defineComponent({
  name: 'App',
  components: {
    [Sticky.name]: Sticky,
    Popup,
    Card,
    SearchPanel
  },
  setup() {
    const homeStore = useHomeStore()
    const levelOneLinks = computed(() => homeStore.getFirstLevelLinks)
    const filteredLinks = computed(() => homeStore.getFilteredLink)
    const selfTagLinks = computed(() => homeStore.getSelfTagLink)
    const popupRef = ref<any>(null)

    const historyRecord = ref([] as LinkConfig[])
    const isFocus = ref(false)
    const popupContent = ref([{
      name: ''
    }])
    const filterWord = ref('')

    const debounceSearch = useDebounceFn(onInput, 300)

    onMounted(() => {
      homeStore.getBrowserTagsList()
      getRecord()
    })

    async function getRecord() {
      const record:any = await getStorageItem(HISTORY_VIEW)
      if (Object.keys(record).length === 0) {
        historyRecord.value = []
      } else {
        historyRecord.value = JSON.parse(record[HISTORY_VIEW])
      }
    }

    function onInput() {
      homeStore.filterLinks(filterWord.value)
    }

    async function focusInput() {
      isFocus.value = true
    }

    function onCancel() {
      filterWord.value = ''
      homeStore.filterLinks('')
      isFocus.value = false
    }

    function clickContent(content: LinkConfig) {
      if (!content.child) {
        const oldHistory = historyRecord.value || []
        if (!oldHistory.some((key) => key.name === content.name)) {
          const newHistory = [content].concat(oldHistory)
          if (newHistory && newHistory.length > 6) newHistory.splice(-1)
          setStorageItem(HISTORY_VIEW, JSON.stringify(newHistory))
        }
        tabAction(content.link!)
        return
      }
      popupContent.value = [...content.child]
      popupRef!.value!.showPopup()
    }

    return {
      selfTagLinks,
      levelOneLinks,
      clickContent,
      popupContent,
      popupRef,
      focusInput,
      onCancel,
      isFocus,
      filterWord,
      onInput: debounceSearch,
      filteredLinks,
      historyRecord
    }
  }
})

</script>

<style scoped>
.main-color {
  color: #1f1c2e;
}
</style>
