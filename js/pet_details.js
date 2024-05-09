const getParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('id');
    console.log(param);
    if (!param || param.trim() === "") {

        return;
    }
    return param
}
const adoptPet = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("furever_token");
    if (!token) {
        window.location.href = "user_login.html";
        return; // Exit early if no token
    }
    const pet_id = getParams();

    const user_id = localStorage.getItem("furever_user_id");
    console.log(user_id);
    const new_id = user_id - 1;
    console.log("new_id: ", new_id);

    try {
        await loadBalance(); // Wait for loadBalance to complete
        // Rest of your code here
        fetch(`https://fur-ever-friends-backend.onrender.com/pet/adopt/`, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ pet_id, user_id })
        })
        .then((response) => {
            if (response.status === 200) {
                window.location.href = "user_account.html";
            } else {
                console.log("");
            }
        });
    } catch (error) {
        console.error("Error in loadBalance:", error);
    }
};

const loadBalance = async () => {
    try {
        const pet_id = getParams();

        const user_id = localStorage.getItem("furever_user_id");
        console.log("pet_id: " , pet_id);
        console.log("uid lb ",user_id);
        const new_id = user_id - 1;
        console.log("new_id load balance: ", new_id);
        const response = await fetch(`https://fur-ever-friends-backend.onrender.com/user/account/${new_id}/`);
        const data = await response.json();
        const x = data.balance;
        clg("my balance", x);
        const petResponse = await fetch(`https://fur-ever-friends-backend.onrender.com/pet/list/${pet_id}/`);
        const petdata = await petResponse.json();
        const pet_price = petdata.price;
        clg("my pet price", pet_price);
        if (pet_price > x) {
            alert("Not enough money to adopt this cat");
            window.location.href = "deposit.html";
        }
    } catch (error) {
        console.error("Error in loadBalance:", error);
    }
};

const addReview = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("furever_token");
    if (!token) {
        window.location.href = "user_login.html";
    }
    const body = document.getElementById("description").value;
    const pet = getParams();
    const user = localStorage.getItem("furever_user_id");
    try {
        const formData = new FormData();
        formData.append("body", body);
        formData.append("pet", pet);
        formData.append("user", user);
        console.log(formData)
        fetch(`https://fur-ever-friends-backend.onrender.com/pet/review/`, {
            method: "POST",
            body: formData
        })
        .then(response => {
            if (response.ok) {
                    window.location.href = "pets.html";
                } else {
                    console.log("Error while reviewing");
                }
            })
            .catch(error => {
                console.error("Error submitting review:", error);
            })
    }
    catch (error) {
        console.log(error)
    }
}
const reviewerDetails = async (user_id) => {
    try {
        const response = await fetch(`https://fur-ever-friends-backend.onrender.com/user/allUser/${user_id}/`);
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.log(error);
        return null;
    }
};
const handlePetDetails = async () => {
    const token = localStorage.getItem('furever_token')
    if (!token) {
        window.location.href = "user_login.html";
    }
    const id = getParams();
    console.log(id);
    try {
        const response = await fetch(`https://fur-ever-friends-backend.onrender.com/pet/list/${id}/`)
        const pet = await response.json();
        let cat;
        const review = await fetch(`https://fur-ever-friends-backend.onrender.com/pet/review/?pet__id=${id}`)
        const reviews = await review.json()
        const loadCategory = async () => {
            try {
                fetch("https://fur-ever-friends-backend.onrender.com/pet/category/")
                    .then(res => res.json())
                    .then(category => {
                        category.forEach((item) => {
                            if (pet.categories[0] == item.id) {
                                cat = item.name
                                const parent = document.getElementById("pet-details-card")
                                const div = document.createElement("div");
                                div.innerHTML =
                                    `
                                <section class="flex justify-center mt-10 mb-10">
                                    <div class="container">
                                        <div class="row" id="detailed-pet">
                                            <div class="col-md-3" >
                                                <div class="d-flex justify-content-center">
                                                    <img src="${pet.image}" alt="book" class="w-100 img-fluid">
                                                </div>
                                                <div class="mt-5">
                                                    ${pet.adopter != null ? `
                                                    <button class="btn btn-warning"><a>Alredy Adopted</a></button>` : `
                                                
                                                <button onclick="adoptPet(event)" class="btn btn-primary"><a>Adopt Now</a></button>
                                                `}
                                                </div>
                                            </div>
                                            <div class="col-md-9">
                                                <br>
                                                <br>
                                                <br>
                                                <br>
                                                <br>
                                                <br>
                                                <br>
                                                    

                                                <div class="card w-96 bg-none text-black">
                                                <div class="card-body items-center text-center">
                                                <h1 class="text-3xl font-weight-bold text0-black">I am "${pet.name}"</h1>
                                                  <p>I am a ${cat}</p>
                                                  <p></p>
                                                  
                                                  <p>${pet.description}</p>
                                                  <div class="card-actions justify-end">
                                                    <button class="btn btn-primary">Pet ID: ${pet.id}</button>
                                                    <button class="btn btn-primary">Price: <span>${(pet.price == 0) ? `Free` : pet.price}</span></button>
                                                  </div>
                                                </div>
                                              </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>


                                ${pet.adopter != null && isAuthenticated() && pet.adopter == localStorage.getItem('furever_user_id') && reviews.length != 1 ? `
                                <div class="my-3">
                                <div class="border border-gray-700">
                                <div class="bg-gray-800 p-4">
                                    <h3 class="text-lg font-semibold text-white">Add Review</h3>
                                </div>
                                <div class="bg-white p-4">
                                    <form method="post">
                                        <div class="mb-4">
                                            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                                            <textarea class="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring focus:ring-indigo-200 focus:ring-opacity-50" id="description" name="description" rows="3" required></textarea>
                                        </div>
                                        <button class="btn bg-yellow-400 text-white py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-opacity-50" type="submit" onclick="addReview(event)">Submit</button>
                                    </form>
                                </div>
                            </div>
                            
                                </div>` : ``}


                                <div class="my-3" id="reviews-box">
                                    <div class="alert alert-primary" role="alert">Reviews: ${reviews.length}</div>
                                </div>
                                    `;
                                parent.appendChild(div)
                                const reviewsParent = document.getElementById("reviews-box");
                                reviews.forEach(async (rev) => {
                                    
                                const userData = await reviewerDetails(rev.user);
                                const reviewCard = document.createElement("div");
                                reviewCard.classList.add("card", "mb-1");
                                reviewCard.innerHTML = `
                                <blockquote class="flex flex-col items-center p-4">
                                <p class="max-w-4xl text-xl font-medium text-center md:text-2xl lg:text-3xl">"${rev.body}"
                                    </p>
                                <footer class="flex items-center gap-3 mt-6 md:mt-12">
                                        <img class="flex-shrink-0 w-12 h-12 border rounded-full border-black/10" src="https://loremflickr.com/g/200/200/girl" alt="Sebastiaan Kloos" loading="lazy">
                                        <a href="" target="_blank"
                                            class="inline-block font-bold tracking-tight">
                                            <h5>${userData.username}</h5>
                                            <p class="card-title text-info">${userData.email} </p>
                                            <p><small class="blockquote-footer">Reviewed On: <cite class="text-primary" title="Source Title">${rev.created_on}</cite></small></p>
                                        </a>
                                    </footer>
                                </blockquote>

                                `;
                                reviewsParent.appendChild(reviewCard);
                                });
                            }
                        })
                    })
            }
            catch (err) {
                console.log(err.message);
                console.log(err);
            }
        }
        loadCategory()
        // console.log(pet)
    } catch (err) {
        console.log(err.message);
        console.log(err);
    }
}
handlePetDetails();