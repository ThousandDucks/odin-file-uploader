const usernameInput = document.querySelector("#username");
const usernameMessage = document.querySelector("#username-message");

usernameInput.addEventListener("input", async () => {

    const username = usernameInput.value.trim();

    if (username.length < 3) {
        usernameMessage.textContent =
            "Username must be at least 3 characters";
        return;
    }


    const response = await fetch(
        `/check-username?username=${username}`
    );

    const data = await response.json();


    if (data.taken) {
        usernameMessage.textContent =
            "Username already taken ✗";
    } else {
        usernameMessage.textContent =
            "Username available ✓";
    }

});

// Password

const passwordInput = document.querySelector("#password");
const passwordMessage = document.querySelector("#password-message");


passwordInput.addEventListener("input", () => {

    const valid = /^(?=.*[A-Za-z])(?=.*\d)[^\s]{8,}$/
        .test(passwordInput.value);


    if (valid) {
        passwordMessage.textContent =
            "Password looks good ✓";
    } else {
        passwordMessage.textContent =
            "Need 8 characters, a letter, and a number";
    }

});

// Confirm Password

const confirmPasswordInput = document.querySelector("#confirmPassword");
const confirmPasswordMessage = document.querySelector("#confirm-password-message");


confirmPasswordInput.addEventListener("input", () => {

    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;


    if (confirmPassword === "") {
        confirmPasswordMessage.textContent = "";
        return;
    }


    if (password === confirmPassword) {
        confirmPasswordMessage.textContent =
            "Passwords match ✔";
    } else {
        confirmPasswordMessage.textContent =
            "Passwords do not match ✗";
    }

});