const token = localStorage.getItem("furever_token");
if (!token) {
    window.location.href = "user_login.html";
}
const handleDeposit = (event) => {
    event.preventDefault();
    const amnt = getValue("amount")
    const amount = parseInt(amnt)
    const acnt = localStorage.getItem("furever_user_account")
    const account = parseInt(acnt)
    // console.log(amount, account);
    if ((typeof amount === 'number') && (typeof account === 'number')) {
        // console.log("Yes it is a number");
        try {
            var res;
            fetch('https://fur-ever-friends-backend.onrender.com/transaction/deposit/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount, account })
            })
            .then((response) => {
                response.json();
            })
            .then((data) => {
                alert(`You Have Successfully Deposited ${amount}$`)
                window.location.href = "user_account.html"
            })

        } catch (error) {
            
        }
    } else {
        console.log("Invalid input");
    }
}