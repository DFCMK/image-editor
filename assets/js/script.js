const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const image = new Image();

document.getElementById("brightness").value = 100;
document.getElementById("contrast").value = 100;
document.getElementById("grayscale").value = 0;

function applyFilters(){
    const brightness = document.getElementById("brightness").value;
    const contrast = document.getElementById("contrast").value;
    const grayscale = document.getElementById("grayscale").value / 100;
    
    ctx.filter = `
        brightness(${brightness}%)
        contrast(${contrast}%)
        grayscale(${grayscale})
    `;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0);
}


document.getElementById("upload").addEventListener("change", function(event){
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e){
        image.src = e.target.result;
    };
    reader.readAsDataURL(file);
});


image.onload = function(){
    canvas.width = image.width;
    canvas.height = image.height;
    applyFilters();
    document.querySelector(".canvasContainer").style.display = 'block';
};


document.getElementById("brightness").addEventListener("input", applyFilters);
document.getElementById("contrast").addEventListener("input", applyFilters);
document.getElementById("grayscale").addEventListener("input", applyFilters);


document.getElementById("download").addEventListener("click", function(){
    const link = document.createElement("a");
    link.download = 'edited-image.png';
    link.href = canvas.toDataURL();
    link.click();
});