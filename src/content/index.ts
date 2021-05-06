// const doc = document
chrome.runtime.onMessage.addListener(function (request) {
  if (request.message === 'JUMP_PAGE') {
    document.location.href = request.url
  }
})
