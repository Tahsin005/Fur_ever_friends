const handleLogout = () => {
    const token = localStorage.getItem("furever_token");
    console.log("Yey");
    fetch("https://fur-ever-friends-backend.onrender.com/user/logout/", {
        method: "GET",
        authorization: `Token ${token}`,
        headers: { "content-type": "application/json" },
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        localStorage.removeItem('furever_token')
        localStorage.removeItem('furever_user_id')
        localStorage.removeItem('furever_user_account')
        window.location.href = "user_login.html"; 
    })
}
