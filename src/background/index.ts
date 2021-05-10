/**
 * 限制插件只能在https/https协议的页面中激活
 */
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

/**
 * 存入localStorage
 */
chrome.runtime.onMessage.addListener(async (req) => {
  const { action, data } = req
  chrome.storage.sync.set({ [action]: data }, () => {
    console.log('set successed!')
  })
})

/**
 * 快捷键聚焦
 */
chrome.commands.onCommand.addListener(function (command) {
  if (command === 'trigger-focus') {
    const views = chrome.extension.getViews({ type: 'popup' })
    if (views.length > 0) {
      views[0].document.getElementsByTagName('input')[0].focus()
    }
  }
})
