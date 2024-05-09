const changePassword = (event) => {
    event.preventDefault()
    if (!isAuthenticated()) {
        window.location.href = "user_login.html"
    }
    const user_id = localStorage.getItem("fluffypaw_user_id")
    const old_password = getValue("old-password")
    const password = getValue("password")
    const password2 = getValue("password2")
    // console.log(user_id, old_password, password, password2)
    if (password === password2) {
            try {
                fetch(`https://fur-ever-friends-backend.onrender.com/user/password_change/`, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ user_id, old_password, password, password2 }),
                })
                    .then((response) => {
                        if (response.status === 200) {
                            alert("Password changed successfully")
                            window.location.href = "user_account.html";
                        } else {
                            console.log("Password Changing failed with status code:", response.status);
                        }
                    })
            } catch (error) {
                console.log(error)
            }
    }

}

