//Play-pause

 let playing = false;

 const songlist = [document.querySelector('#s1'), document.querySelector('#s2'), document.querySelector('#s3')]
 const bglist = ['url(./imgs/maxresdefault.jpg)', 'url(./imgs/ash.jpg)', 'url(./imgs/frost.jpg)']

 let curS = songlist[0]
 let curB = bglist[0]

 const progressBar = document.querySelector('#progress-bar'); 
 const ppb = document.querySelector('#ppb');
 const nextB = document.querySelector('.fa-angle-right')
 const prevB = document.querySelector('.fa-angle-left')
 const currentTimeD = document.querySelector('#currentTime')
 const durationTimeD = document.querySelector('#durationTime')
 const volumeBar = document.querySelector('#volume-bar') 
 const disCurSName = document.querySelector('#cur-s-name')
 const disPlayList = document.querySelector('#playlist-bot')
 const showPlaylistBtn = document.querySelector('.fa-angle-down');

 function getName(song){
      let string = song.getAttribute('src')
      string = string.replace('./music/', '');
      string = string.replace('-', ' ');
      string = string.replace('.mp3', '');
      return string
 }
disCurSName.textContent = getName(curS)

function getPlaylist(){
    const songs = document.querySelectorAll('audio');
    const playlist = document.createElement('ol');
    let i = 0;
    songs.forEach(song => {
       const name = getName(song);
       const li= document.createElement('li');
        li.textContent = name;
        li.setAttribute('data-id', i);
        playlist.appendChild(li);
        i++;
    });
    disPlayList.appendChild(playlist);

}
getPlaylist()

showPlaylistBtn.onclick =  ()=>{
    if(disPlayList.classList.contains('playlist-bot-hide')){
        disPlayList.classList.remove('playlist-bot-hide');
        document.querySelector("#playlist-top").style.borderBottomLeftRadius = '0px';
        document.querySelector("#playlist-top").style.borderBottomRightRadius = '0px';
        document.querySelector('.fa-angle-down').style.transform = 'rotate(180deg)';
    }
    else{
        disPlayList.classList.add('playlist-bot-hide');
        document.querySelector("#playlist-top").style.borderBottomLeftRadius = '5px';
        document.querySelector("#playlist-top").style.borderBottomRightRadius = '5px';
        document.querySelector('.fa-angle-down').style.transform = 'rotate(0deg)';
    }
}

 document.querySelector('.full-screen').style.background = curB
 document.querySelector('.full-screen-inner').style.background = curB

 volumeBar.addEventListener('change',(e)=>{
    songlist.forEach(song => song.volume = e.currentTarget.value)
})

 function playingCh(){
    if (playing){
        ppb.classList.replace('fa-pause', 'fa-play');
        curS.pause();
        playing = false;
    }
    else{
        ppb.classList.replace('fa-play', 'fa-pause');
        curS.play();
        playing = true;
    }
}

function changeSong(e){
    curS.pause();
    curS.currentTime = 0

    if(e.target === nextB){
        if (songlist.indexOf(curS) ===  songlist.length - 1){
            curS = songlist[0]
            curB = bglist[0]
        }else{
            curS = songlist[songlist.indexOf(curS) + 1]
            curB = bglist[bglist.indexOf(curB) + 1]
        }
    }else if(e.target === prevB){
        if (songlist.indexOf(curS) ===  0){
            curS = songlist[songlist.length - 1]
            curB = bglist[bglist.length - 1]
        }else{
            curS = songlist[songlist.indexOf(curS) - 1]
            curB = bglist[bglist.indexOf(curB) - 1]
        }
    }else{
        id = e.target.getAttribute('data-id');
        curS = songlist[id]
        curB = bglist[id]
    }

    document.querySelector('.full-screen').style.background = curB
    document.querySelector('.full-screen-inner').style.background = curB
    disCurSName.textContent =  getName(curS)
    if (playing){
        curS.play()
    }
}

nextB.addEventListener('click', changeSong);
prevB.addEventListener('click', changeSong);
document.querySelectorAll('#playlist-bot li').forEach(song => song.addEventListener('click', changeSong));

function progressB(){
    progressBar.max = curS.duration;
    progressBar.value = curS.currentTime;

    let curSDTm = Math.floor(curS.duration / 60);
    let curSDTs = (curS.duration % 60).toFixed();

    let curSCTm = Math.floor(curS.currentTime / 60) 
    let curSCTs = (curS.currentTime % 60).toFixed()

    let adding0 = function(num){
        if (num.toString().length < 2 ){
            return '0' + num;
        }
        else{
            return num;
        }
    }
    if (curS.currentTime == curS.duration){
        next()
    }
    
    curSDT = adding0(curSDTm) + ':' + adding0(curSDTs); 
    curSCT = adding0(curSCTm) + ':' + adding0(curSCTs);

    durationTimeD.textContent = curSDT
    currentTimeD.textContent =  curSCT
}
setInterval(progressB, 1000);

function changeProgressBar() {
    curS.currentTime = progressBar.value;
};

ppb.addEventListener('click', playingCh)
