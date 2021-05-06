chrome.runtime.onMessage.addListener(async (req) => {
  const { action, data } = req
  chrome.storage.sync.set({ [action]: data }, () => {
    console.log('set successed!')
  })
})
