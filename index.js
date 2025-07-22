let numOfResults = [];
let imageContainer = document.getElementById("image-container");

async function fetchData() {
    try {
        const pokemonName = document.getElementById("searchInput").value.trim().toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`); // assign the retreived data in to the variable response
        if (!response.ok) {
            throw new Error("Unable to fetch data");
        }

        const data = await response.json(); // assign values from retrieved response after converting it into JSON object
        console.log(data);

        // You can only use front_default if the API you are using provides a 'sprites.front_default' property in its response.
        // 'front_default' is specific to the structure of the PokeAPI response for Pokémon images.
        // If you use a different API, you need to check its documentation for the correct property to access the image or data you want.
        // Example for PokeAPI:

        /*

        const imgElement = document.getElementById("pokemonImage");
        imgElement.src = data.sprites.front_default; // assign the image source to the img element
        imgElement.style.display = "block"; // show the image element */

        numOfResults.push(data); // store the data for later use
        initializeNewImage(); // call the function to initialize the new image element
    } catch (error) {
        console.log(error);
    }
}

function initializeNewImage() {
    try {
        // Clear previous images
        imageContainer.innerHTML = "";

        for (let i = 0; i < numOfResults.length; i++) {
            const pokeData = numOfResults[i];
            const newImg = document.createElement("img");
            newImg.id = `image${i}`; // Assign a unique ID to each new image
            newImg.src = pokeData.sprites.front_default; // Set the image source
            newImg.style.display = "block";
            imageContainer.appendChild(newImg); // add the image element to the container
        }

        if (numOfResults.length > 2) {
            startScrolling();
        }
    } catch (error) {
        console.log(error);
    }
}

function startScrolling() {
    if (numOfResults.length >= 3) {
        imageContainer.addEventListener("mouseover", () => {
            imageContainer.classList.toggle("scroll");
        });
        imageContainer.addEventListener("mouseout", () => {
            imageContainer.classList.toggle("scroll");
        });
    }
}
