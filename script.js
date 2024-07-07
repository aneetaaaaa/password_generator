
function generate() {
    let dictionary = "";
    if (document.getElementById("lowercaseCb").checked) {
        dictionary += "abcdefghijklmnopqrstuvwxyz";
    }
    if (document.getElementById("uppercaseCb").checked) {
        dictionary += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    }
    if (document.getElementById("digitsCb").checked) {
        dictionary += "0123456789";
    }
    if (document.getElementById("specialsCb").checked) {
        dictionary += "!@#$%^&*()_+-={}[];<>:";
    }
    
    const length = parseInt(document.querySelector('input[type="range"]').value);

    if (length < 1 || dictionary.length === 0) {
        alert("Please select at least one character type and a valid length.");
        return;
    }

    let password = "";
    for (let i = 0; i < length; i++) {
        const pos = Math.floor(Math.random() * dictionary.length);
        password += dictionary.charAt(pos);
    }

    const passwordField = document.querySelector('input[type="text"]');
    passwordField.value = password;
    updateStrength(password);
}

function updateStrength(password) {
    const strengthText = document.querySelector("div.strength span");
    const strength = calculateStrength(password);
    strengthText.innerText = strength.text;
    strengthText.style.color = strength.color;
}

function calculateStrength(password) {
    let strength = { text: "Weak", color: "red" };
    const lengthCriteria = password.length >= 8;
    const uppercaseCriteria = /[A-Z]/.test(password);
    const lowercaseCriteria = /[a-z]/.test(password);
    const digitCriteria = /\d/.test(password);
    const specialCriteria = /[!@#$%^&*()_+\-={}[\]:;"'<>,.?/~`|]/.test(password);

    const passedCriteria = [lengthCriteria, uppercaseCriteria, lowercaseCriteria, digitCriteria, specialCriteria].filter(Boolean).length;

    if (passedCriteria >= 4 && password.length >= 12) {
        strength = { text: "Very Strong", color: "green" };
    } else if (passedCriteria >= 3) {
        strength = { text: "Strong", color: "orange" };
    } else if (passedCriteria >= 2) {
        strength = { text: "Medium", color: "yellow" };
    }

    return strength;
}

document.querySelectorAll('input[type="checkbox"], button.generate').forEach((elem) => {
    elem.addEventListener("click", generate);
});

document.querySelector('input[type="range"]').addEventListener("input", (e) => {
    document.querySelector("div.range span").innerText = e.target.value;
    generate();
});

document.querySelector("div.password button").addEventListener("click", () => {
    const pass = document.querySelector('input[type="text"]').value;
    navigator.clipboard.writeText(pass).then(() => {
        const copyButton = document.querySelector("div.password button");
        copyButton.innerText = "copied!";
        setTimeout(() => {
            copyButton.innerText = "copy";
        }, 1000);
    });
});

generate();
