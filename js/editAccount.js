const user_id = localStorage.getItem('furever_user_id');
const user_account = localStorage.getItem('furever_user_account');
console.log(user_id);
console.log(user_account);
if (user_id && user_account) {
    // alert('Found')
    const loadInstance = () => {
        try {
            fetch(`https://fur-ever-friends-backend.onrender.com/user/allUser/${user_id}/`)
                .then((res) => res.json())
                .then((user) => {
                    // console.log(user)
                    document.getElementById('first-name').value = user.first_name
                    document.getElementById('last-name').value = user.last_name
                    document.getElementById('email').value = user.email
                    try {
                        fetch(`https://fur-ever-friends-backend.onrender.com/user/account/${user_account}/`)
                            .then((response) => response.json())
                            .then((account) => {
                                document.getElementById('image').src = account.image
                                console.log(account.image);
                            })
                    } catch (error) {
                        console.log(error)
                    }
                })
        } catch (error) {
            console.log(error)
        }
    }
    loadInstance();
} else {
    alert('Failed to find')
}
const editAccount = async (event) => {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    // Check if a new image file was selected
    const imageInput = document.getElementById('image').value;
    if (imageInput) {
        formData.append('image', imageInput);
    } else {
        alert('Please input the image url');
    }
    try {
        const response = await fetch(`https://fur-ever-friends-backend.onrender.com/user/update/${user_id}/`, {
            method: 'PATCH',
            body: formData,
        });
        const data = await response.json();
        console.log('Account updated:', data);
        alert("Account updated")
        window.location.href = "user_account.html";
    } catch (error) {
        console.log('Error updating account:', error);
    }
};
