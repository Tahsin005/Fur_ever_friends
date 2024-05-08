const isAuthenticated = () => {
    const token = localStorage.getItem("furever_token");
    console.log(token);
    return token !== null;
};
const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};

const toggleAuthElements = () => {
    const profile = document.getElementById('profile-button');
    const logout = document.getElementById('logout-button')
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    if (isAuthenticated()) {
        profile.style.display = 'block'; 
        logout.style.display = 'block'
        loginButton.style.display = "none";
        registerButton.style.display = "none";
    } else {
        profile.style.display = 'none';
        logout.style.display = 'none'
        loginButton.style.display = "block"; 
        registerButton.style.display = "block"; 
    }
};

window.onload = toggleAuthElements;
