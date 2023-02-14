const media = document.querySelector(".media")
const input = document.querySelector(".input")
const button = document.querySelector(".button")


input.addEventListener('input', e => {
    e.preventDefault()
    let url = e.target.value;

    if(!url.trim()) return ;

    fetchImage(url)
})


function fetchImage(url){
    fetfch(url).then(res => res.blob()).then(file => {
        console.log(file)
        if(file.type.includes('image')){
            renderImg(url, file)
        }
    })
}

function renderImg(url, file){
    console.log({url, file})
}