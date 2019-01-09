
function getMusiclist(callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET','./music.json',true);
    
    xhr.onload = function(){
        if(200<=xhr.status<300 || xhr.status===304){
            // console.log(JSON.parse(xhr.responseText))
            callback(JSON.parse(xhr.responseText))
        }else{
            console.log("未收到数据")
        }
        if(xhr.onerror){
            console.log("未连接到网络")
        }
    }
    xhr.send();
}

var currentIndex = 0
var audio = new Audio()
audio.autoplay = true
var List = []



function $(selector){
    return document.querySelector(selector)
}

getMusiclist(function(musicList){
    
    console.log(musicList) 
    loadMusic(musicList[currentIndex])
    List = musicList
})



function loadMusic(musicObj){
    console.log("begin play" , musicObj)
     $('.title').innerText = musicObj.title
     $('.author').innerText = musicObj.author
     $('.coverImg').src = musicObj.img
     audio.src = musicObj.src
     
}



audio.ontimeupdate = function (){   
    $('.current-progress').style.width = audio.currentTime/audio.duration * 350  + 'px'
}

setInterval(function(){   
    var min = Math.floor(audio.currentTime/60)
    if (Math.floor(audio.currentTime%60)<10){
        var sec ='0' + Math.floor(audio.currentTime%60)
    }else{
        var sec =Math.floor(audio.currentTime%60)}
    $('.time').innerText = min + ':' + sec
},1000)



$('.forwrd').onclick = function(){
    currentIndex = (++currentIndex)%List.length
    loadMusic(List[currentIndex])
}

$('.back').onclick = function(){
    currentIndex = (List.length + (--currentIndex))%List.length
    loadMusic(List[currentIndex])
}

$('.bar').onclick = function(e){
    console.log(e)
    var ratio = e.offsetX / parseInt(getComputedStyle($('.total-progress')).width)
    audio.currentTime = audio.duration * ratio
}

$('.playing').onclick = function(){
    if(audio.paused){
        audio.play()
        $('.playing').classList.remove('icon-pause')
        $('.playing').classList.add('icon-play')  
    }else{
        audio.pause()
        $('.playing').classList.remove('icon-play')
        $('.playing').classList.add('icon-pause')
    }
}
// var ul = document.querySelector(".musicList")
// document.createElement(li);

// var li = document.querySelectorAll('li')
// for (var i = 0; i<List.length; i++){
//    li[i].innerText = List[i].title + '--' + List[i].author
// }















