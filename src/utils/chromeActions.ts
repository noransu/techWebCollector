// eslint-disable-next-line import/prefer-default-export
export function tabAction(link: string) {
  chrome.tabs.query({
    active: true,
    status: 'complete',
    currentWindow: true
  }, (tabs) => {
    // 获取当前窗口 id
    const tabId: number = tabs.length ? tabs[0].id as number : 0
    // 向当前页面注入 JavaScript 脚本
    chrome.tabs.executeScript(tabId, {
      file: 'js/content.js'
    }, () => {
      // 向目标网页进行通信，向 content.js 发送一个消息
      chrome.tabs.sendMessage(tabId, {
        message: 'JUMP_PAGE',
        url: link
      })
    })
  })
}

export function setStorageItem(action: string, value: string) {
  chrome.runtime.sendMessage({ action: action, data: value })
}

export function getStorageItem(key: string) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(key, res => {
      resolve(res)
    })
  })
}
