const loadAccount = () => {
    const user_id = localStorage.getItem('furever_user_id');
    console.log(user_id);
    const user_account = localStorage.getItem('furever_user_account');
    console.log(user_account);
    try {
        fetch(`https://fur-ever-friends-backend.onrender.com/user/allUser/${user_id}/`)
        .then((response) => response.json())
        .then((user) => {
            console.log(user);
            try {
                fetch(`https://fur-ever-friends-backend.onrender.com/user/account/${user_account}/`)
                .then((response) => response.json())
                .then((account) => {
                    console.log(account);
                    const parent = document.getElementById('user-account');
                    const div = document.createElement('div');
                    // div.classList.add("row", "g-0", "align-items-center")
                    div.innerHTML = `
                    <div class="max-w-xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
    <div class="p-5">
        <div class="flex items-center">
            <div class="w-20 h-20 rounded-full overflow-hidden mr-4">
            <img src="${account.image ? account.image : 'images/user.webp'}" alt="Profile Picture" class="w-full h-full object-cover">

            </div>
            <div>
                <h5 class="text-xl font-semibold text-gray-800">${user.first_name} ${user.last_name}</h5>
                <p class="text-sm text-gray-600">${user.username}</p>
                <p class="text-sm text-gray-600">${user.email}</p>
                <p class="text-sm text-gray-600">Balance: ${account?.balance}</p>
            </div>
        </div>
        <div class="mt-4">
            <a href="edit_account.html?id=${user_id}" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center mr-2 mb-2">Edit Account</a>
            <a href="change_password.html?id=${user_id}" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center mb-2">Change Password</a>
        </div>
    </div>
</div>



                    `;
                    parent.appendChild(div);
                })
            } catch (error) {
                
            }
        })
    } catch (err) {
        console.log(err.message);
        console.log(err);
    }
}
loadAccount();