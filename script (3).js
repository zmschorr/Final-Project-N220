async function loadMoods() {
    const response = await fetch("moods.json");
    return await response.json();
}

document.getElementById("generateBtn").addEventListener("click", async () => {
    const mood = document.getElementById("moodInput").value;
    const output = document.getElementById("output");

    output.innerHTML = "";

    if (!mood) {
        output.textContent = "Pick a mood first.";
        return;
    }

    const data = await loadMoods();
    const moodData = data[mood];

    document.body.style.background = moodData.color;

    const message = document.createElement("p");
    message.textContent = moodData.message;
    output.appendChild(message);

    for (let i = 0; i < 6; i++) {
        const shape = document.createElement("div");
        shape.classList.add("shape");
        shape.style.left = Math.random() * 80 + "%";
        shape.style.background = moodData.color;
        shape.title = "Click me";

        shape.addEventListener("click", () => {
            alert(moodData.extra);
        });

        output.appendChild(shape);
    }
});
