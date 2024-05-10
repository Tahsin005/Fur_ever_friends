
const loadCategories = async () => {
    
    try {
        const response = await fetch("https://fur-ever-friends-backend.onrender.com/pet/category/")
        const category = await response.json();
        // console.log(category);
        category.forEach((item) => {
            // console.log(item.slug);
            const parent = document.getElementById('categories')
            const li = document.createElement("li");
            li.classList.add("dropdown-item", "text-center");
            
            li.innerHTML = `<li onclick="loadPetByCategory('${item.slug}')">${item.name}</li>`;

            parent.appendChild(li);
        })
    } catch (err) {
        console.log(err);
    }
}

const loadPetByCategory = async (slug = null) => {
    document.getElementById('pet-list-cards').innerHTML = "";
    document.getElementById("cards-nodata").style.display = "none"
    try {
        const response = await fetch(`https://fur-ever-friends-backend.onrender.com/pet/list/?categories__slug=${slug? slug : ""}`);
        const data = await response.json();
        console.log(data);
        if (data.length > 0) {
            displayPetByCategory(data);
        } else {
            document.getElementById('pet-list-cards').innerHTML = "";
            document.getElementById("cards-nodata").style.display = "block"

        }
    } catch {

    }
}

const displayPetByCategory = (data) => {
    data.forEach((pet) => {
        let cat;
        const loadCategory = () => {
            try {
                fetch("https://fur-ever-friends-backend.onrender.com/pet/category/")
                    .then(res => res.json())
                    .then(category => {
                        // console.log(category)
                        category.forEach((item) => {
                            if (pet.categories[0] == item.id) {
                                // console.log(item)
                                cat = item.name
                                const parent = document.getElementById("pet-list-cards")
                                const div = document.createElement("div")
                                // div.classList.add("grid", " grid-cols-3", "mt-5");
                                div.innerHTML =
                                    `
                                    <div class="mt-8">
                                    <div class="bg-white rounded-lg shadow-md w-72">
                                    <img src="${pet.image}" alt="Pet Image" class="w-full h-48 object-cover rounded-t-lg">
                                    <div class="p-4">
                                        <h4 class="text-lg font-semibold"><a href="pet_details.html?id=${pet.id}" class="text-indigo-600 hover:underline">${pet.name}</a></h4>
                                        <ul class="mt-2 space-y-1">
                                        <li class="text-gray-600">${cat}</li>
                                        <li class="text-gray-600">Price: <span>${(pet.price == 0) ? 'Free' : pet.price}</span></li>
                                        </ul>
                                        <div class="mt-4">
                                        <a href="pet_details.html?id=${pet.id}" class="text-indigo-600 hover:underline">Details</a>
                                        </div>
                                    </div>
                                </div>
                                    </div>

                               
                                `
                                parent.appendChild(div)
                            }
                        })
                    })
            } catch (err) {
                console.log(err.message);
                console.log(err);
            }
        }
        loadCategory();
    })
}
loadCategories();
loadPetByCategory();