const media = document.querySelector(".media")
const input = document.querySelector("input")
const button = document.querySelector("button")

let msg = '';
let tempFile = '';
let file_name = '';
let extension = '';

input.addEventListener('input', e => {
    e.preventDefault()
    let url = e.target.value;

    if(!url.trim()) 
        return removeImg();

    fetchImage(url)
})


function fetchImage(url){
    fetch(url).then(res => res.blob()).then(file => {
        if(file.type.includes('image')){
            renderImg(url, file)
        }else{
            removeImg()
        }
    }).catch(err => removeImg())
}

function renderImg(url, file){
    let img = `<img src="${url}" alt="">`;
    media.innerHTML = img;
    media.setAttribute("class", "media");

    msg = '';
    tempFile = URL.createObjectURL(file);
    file_name = url.split("/").pop().split(".")[0];
    extension = file.type.split("/")[1];
}

function removeImg(){
    let i = `<i class="fa-solid fa-image"></i>`;
    media.innerHTML = i;
    media.setAttribute("class", "media dashed");
    
    msg = 'This is not image';
    tempFile = '';
    file_name = '';
    extension = '';
}

// DownLoad Image
button.addEventListener('click', e => {
    e.preventDefault()
    if(msg) return alert(msg);

    download(tempFile)
})

function download(tempFile){
    let a = document.createElement('a');
    a.href = tempFile;
    a.download = `${file_name}.${extension}`;
    document.body.appendChild(a);
    a.click()
    a.remove()
}