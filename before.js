// this code will be executed before page load
(function() {
  chrome.runtime.onMessage.addListener((obj, sender, response) => {
    var { type, videoId } = obj;
    console.log(type)
    console.log(videoId);
    var vidids = "";
    if(type == "NEW"){
      const savebtnchecker = document.querySelector(".savebtn");
      if(!savebtnchecker){
        const savebtn = document.createElement("button");
        savebtn.className= "savebtn";
        savebtn.innerText = "Save video";
        savebtn.title = "Click the button to save the video to watch later";
        savebtn.style.background = "Red";
        savebtn.style.color="white"
        savebtn.style.position = "relative"
        savebtn.style.top = "-20px"
        //https://img.youtube.com/vi/<insert-youtube-video-id-here>/0.jpg
        if (localStorage.getItem('vidids')) {
          vidids = localStorage.getItem('vidids');
        }
        document.querySelector('.ytp-right-controls').append(savebtn)

        ////////////////////////////////
        
        document.querySelector('.savebtn').addEventListener('click', function(){
          console.log("clicked");
          if(!localStorage.getItem("vidids")){
            console.log("not set yet");

            localStorage.setItem("vidids", videoId);
          }else{
            vidids = localStorage.getItem("vidids");
            
            var url = window.location.search;
            var v = new URLSearchParams(url).get("v");
            if (indexGetter(vidids.split(","), v)>=0){
              alert("video already saved")
            }else{
              vidids += "," + v;
              localStorage.setItem("vidids", vidids);
              console.log(vidids)
               alert("video saved");

            }
            
          }
        })
      }
      ///////////////////////////
  
      
      console.log(vidids)
      ///////////////////

      var myvideos = document.querySelector('.myvids');

      if (!myvideos) {
        myvideos = document.createElement('div');
        myvideos.className = "myvideos";

        const contents = document.querySelector('#player');

        myvideos.style.height = "100px";
        myvideos.style.width = "100%";
        myvideos.style.background = "black";
        myvideos.style.overflowY = "scroll"

       if(vidids.length>0){
         var vidArr = vidids.split(',');
         if (!document.querySelector('.myvideos')) {
           contents.append(myvideos)
         }
         for (var i = 0; i < vidArr.length; i++) {
           var imgtag = `https://img.youtube.com/vi/${vidArr[i]}/0.jpg`;
           var appended = `<a href="https://www.youtube.com/watch?v=${vidArr[i]}" title="click to watch this video">
          <img height="100px" src="${imgtag}">
          </a>`

           myvideos.innerHTML += appended;
         }
       }

        
      }
    }
  })
///////////////////////////////////

function indexGetter(array, str){
for(var i = 0; i< array.length; i++){
  if(str == array[i]){
    return i;
  }
}
}
//////////////////////////////
function deleteFromarr(array, index){
  var arr= [];
for(var i = 0; i<array.length; i++){
  if(i>=index){
    array[i] = array[i+1];
  }
  arr.push(array[i]);
  return arr;
}
}
//////

})();
