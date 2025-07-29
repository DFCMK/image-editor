const canvas = document.getElementById("canvas");
const canvasContainer = document.querySelector(".canvasContainer");

const ctx = canvas.getContext('2d');
let image = new Image();

document.getElementById("upload").addEventListener("change", function(event){
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e){
        image.src = e.target.result;
    }

    reader.readAsDataURL(file)
})

image.onload = function(){
    canvas.width = image.width;
    canvas.height = image.height;

    ctx.drawImage(image, 0, 0);
    canvasContainer.style.display = 'block';
}

function applyFileters(){
    const brightness = document.getElementById("brightness").value;
    const contrast = document.getElementById("contrast").value;
    const grayscale = document.getElementById("grayscale").value;

    ctx.filter = `
    brightness(${brightness})
    contrast(${contrast})
    grayscale(${grayscale})`;

    ctx.drawImage(image, 0, 0);
}

document.getElementById("brightness").addEventListener("input", applyFileters);
document.getElementById("contrast").addEventListener("input", applyFileters);
document.getElementById("grayscale").addEventListener("input", applyFileters);

document.getElementById("download").addEventListener("click", function(){
    const link = document.createElement("a");
    link.href = canvas.toDataURL();
    link.download = 'edited-imae.png';

    link.click();
})