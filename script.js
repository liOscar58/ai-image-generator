const apiKey ="ENTER YOUR API KEY HERE"

const maxImages = 4;
let selectedImageNumber = null;

function ranNum(min, max){
    return Math.floor(Math.random()* (max-min +1)) + min ;
}

function noGenerateButton(){
    document.getElementById("generate").disabled = true;
}

function GenerateButton(){
    document.getElementById("generate").disabled = false;
}

function clearImages(){
    const images = document.getElementById("image-grid");
    images.innerHTML = "";
}

async function generateImages(input){
    noGenerateButton();
    clearImages();

    const loading = document.getElementById("loading");
    loading.style.display ="block";

    const imageUrls = [];

    for(let i=0; i<maxImages; i++){

        const randomNum = ranNum(1,10000);
        const prompt = `${input} ${randomNum}`;

        const response = await fetch(
            "",
            {
                headers: { Authorization: "" },
                method: "POST",
                body: JSON.stringify(prompt),
            }
        );

        if (!response.ok) {
            alert("Failed to generate image!");
        }

        const result = await response.blob();
        const imgUrl = URL.createObjectURL(result);
        imageUrls.push(imgUrl);

        const img = document.createElement("img");
        img.src = imgUrl;
        img.alt = `art-${i + 1}`;
        document.getElementById("image-grid").appendChild(img);
    }

    loading.style.display = "none";
    GenerateButton();

    selectedImageNumber = null; // Reset selected image number
}

document.getElementById("generate").addEventListener('click', () => {
    const input = document.getElementById("image-prompt").value;
    generateImages(input);
});

