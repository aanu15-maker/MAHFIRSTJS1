let button = document.getElementById("button");
button.addEventListener("click", function() {
    let input = document.getElementById("input").value;
    let output = document.getElementById("output");
    output.innerHTML = input;
});