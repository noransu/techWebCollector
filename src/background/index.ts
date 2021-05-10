chrome.runtime.onInstalled.addListener(() => {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: { schemes: ['https', 'http'] }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ])
  })
})

chrome.runtime.onMessage.addListener(async (req) => {
  const { action, data } = req
  chrome.storage.sync.set({ [action]: data }, () => {
    console.log('set successed!')
  })
})
