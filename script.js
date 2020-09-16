// Unsplash API
let requestCount = 5;
let initialRequest = true;
const apiKey = "p2OzrsLO2gNJ9Gu1RfBz94Lj2n6xDj16DK4annSxQ-c";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${requestCount}`;

const imgContainer = document.getElementById("img-container");
const loader = document.getElementById("loader");

let photosCount = 0;
let imagesLoaded = 0;
let ready = false;

const isLoaded = () => {
  changeRequestCount();
  imagesLoaded++;
  loader.hidden = true;
  if (photosCount === imagesLoaded) {
    ready = true;
  }
};

// increases the number of photo requests from the initial 5 to 30
const changeRequestCount = () => {
  if (initialRequest) {
    requestCount = 30;
    initialRequest = false;
  }
}

const setAttributes = (element, attributes) => {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

// display photo, description and author name
const displayPhotos = (data) => {
  const { links, urls, user, alt_description, description } = data;
  const dataContainer = document.createElement("div");
  const imageLink = document.createElement("a");
  const image = document.createElement("img");
  const author = document.createElement("p");
  const authorLink = document.createElement("a");
  const descriptionText = document.createElement("p");

  dataContainer.setAttribute("class", "data-container");
  setAttributes(imageLink, { href: links.html, target: "_blank" });
  setAttributes(image, {
    src: urls.regular,
    alt: alt_description,
    title: alt_description,
  });
  author.innerText = "by " + user.name;
  author.setAttribute("class", "author");
  setAttributes(authorLink, {
    href: user.links.html,
    target: "_blank",
    class: "author-link",
  });

  // image
  imageLink.appendChild(image);
  imgContainer.appendChild(imageLink);

  // description and author
  if (data.description !== "") {
    // show description if there is one.
    descriptionText.innerText = description;
    descriptionText.setAttribute("class", "description");
    dataContainer.appendChild(descriptionText);
  }
  authorLink.appendChild(author);
  dataContainer.appendChild(authorLink);

  // put photo and info together
  imgContainer.appendChild(dataContainer);

  // check if image loaded
  image.addEventListener("load", isLoaded);
};

// fetch photos from Unsplash and map each of them for display
const getPhotos = () => {
  try {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((photoData) => {
        photoData.forEach((data) => {
          photosCount++;
          displayPhotos(data);
        });
      });
  } catch (error) {
    console.log("Opa! Deu ruim: " + error);
  }
};

// Event Listeners
window.addEventListener("scroll", () => {
  if (window.scrollY + window.innerHeight >= document.body.offsetHeight - 1000 && ready) {
    getPhotos();
    ready = false;
  }
});

// On Load
getPhotos();
