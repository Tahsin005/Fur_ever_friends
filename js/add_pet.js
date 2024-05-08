const token = localStorage.getItem("furever_token");
if (!token) {
    window.location.href = "user_login.html";
}
const loadCategories = async () => {
    try {
        const response = await fetch("https://fur-ever-friends-backend.onrender.com/pet/category/")
        const category = await response.json();
        // console.log(category);
        category.forEach((item) => {
            // console.log(item.slug);
            const parent = document.getElementById('categories')
            const option = document.createElement("option")
            option.classList.add("dropdown-item")
            option.value = item?.id 
            option.innerHTML = item?.name
            parent.appendChild(option)
        })
    } catch (err) {
        console.log(err);
    }
}
const addPet = (event) => {
    event.preventDefault();
    if (!token) {
        window.location.href = "user_login.html";
    }
    const name = getValue("name")
    const description = getValue("description")
    const image = document.getElementById("image").files[0]
    const price = parseInt(getValue("price"))
    const adopter = ''
    const added_by = parseInt(localStorage.getItem('furever_user_id'))
    const categories = parseInt(getValue("categories"))
    console.log(name, description, image, price, adopter, added_by, categories)

    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("image", image);
        formData.append("price", price);
        formData.append("adopter", adopter);
        formData.append("added_by", added_by);
        formData.append("categories", categories);
        for (var key in formData) {
            console.log(key, formData[key]);
        }
        fetch("https://fur-ever-friends-backend.onrender.com/pet/list/", {
            method: "POST",
            body: formData
        })
        .then((response) => {
            if (response.ok) {
                window.location.href = "pets.html";
            } else {
               console.log("Invalid formation");
            }
        })
        .catch(error => {
            console.error("Error adding pet:", error);
        })
    } catch (err) {
        console.log(err);
    }
}
loadCategories();