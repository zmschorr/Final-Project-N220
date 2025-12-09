async function loadMoods() {
    const response = await fetch("moods.json");
    const data = await response.json();
    return data;
}

document.getElementById("generateBtn").addEventListener("click", async function () {
    const mood = document.getElementById("moodInput").value;
    const output = document.getElementById("output");

    output.innerHTML = "";

    if (!mood) {
        output.textContent = "Pick a mood first.";
        return;
    }

    const data = await loadMoods();
    const moodData = data[mood];

    output.style.backgroundColor = shadeColor(moodData.color, -40);

    for (let i = 0; i < 25; i++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.style.backgroundColor = moodData.color;

        // Random horizontal position
        bubble.style.left = Math.random() * 95 + "%";

        // Random size between 20px and 50px
        const size = 20 + Math.random() * 30;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";

        // Random animation duration 3-7s
        bubble.style.animationDuration = (3 + Math.random() * 4) + "s";

        // Random glow intensity
        bubble.style.boxShadow = `0 0 ${5 + Math.random()*15}px ${moodData.color}`;

        // Click alert
        bubble.addEventListener("click", () => {
            alert(moodData.extra);
        });

        output.appendChild(bubble);
    }

    // Mood message
    const message = document.createElement("p");
    message.textContent = moodData.message;
    message.style.color = "white";
    message.style.fontWeight = "bold";
    message.style.marginTop = "10px";
    output.appendChild(message);
});

function shadeColor(color, percent) {
    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R<255)?R:255;
    G = (G<255)?G:255;
    B = (B<255)?B:255;

    let RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    let GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    let BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}

