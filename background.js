chrome.tabs.onUpdated.addListener((tabId,tab)=>{
  var urlarr = tab.url.split('.');
  //https://www.youtube.com/watch?v=jsdhfj
  if(urlarr.includes("youtube")){
    if(urlarr[2].includes("watch")){
      console.log("Start watching")
      var videoId = new URLSearchParams(urlarr[2].split("?")[1]).get("v")
      console.log(videoId)
      console.log(chrome.storage.local.get("vidids"))
      chrome.tabs.sendMessage(tabId, {
        type: "NEW",
        videoId: videoId
      })
    }

  }
 
})