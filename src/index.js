// write your code here
const baseURL = "http://localhost:3000/ramens";

class Getramens {
  constructor(id, name, restaurant, image, rating, comment) {
    (this.id = id),
      (this.name = name),
      (this.restaurant = restaurant),
      (this.image = image),
      (this.rating = rating),
      (this.comment = comment);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  getRamens();
  document.getElementById("new-ramen").addEventListener("submit", formSubmit);
});

// get ramens from an API
const getRamens = () => {
  fetch(baseURL)
    .then((res) => res.json())
    .then((result) => {
      // console.log(result);
      result.forEach((data) => {
        let dataInfo = new Getramens(
          data.id,
          data.name,
          data.restaurant,
          data.image,
          data.rating,
          data.comment
        );

        // add image to the DOM
        const image = document.createElement("img");
        image.src = dataInfo.image;
        document.getElementById("ramen-menu").append(image);

        // calling loadRamen function
        image.addEventListener("click", () => {
          loadRamen(dataInfo.id);
        });
      });
    })
    .catch((error) => {
      throw error;
    });
};

// load individual ramen
const loadRamen = (id) => {
  fetch(`${baseURL}/${id}`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.name);

      let dataInfo = new Getramens(
        data.id,
        data.name,
        data.restaurant,
        data.image,
        data.rating,
        data.comment
      );
      document.querySelector(".detail-image").src = dataInfo.image;
      document.querySelector(".name").innerText = dataInfo.name;
      document.querySelector(".restaurant").innerText = dataInfo.restaurant;
      document.getElementById("rating-display").innerText = dataInfo.rating;
      document.getElementById("comment-display").innerText = dataInfo.comment;
    });
};

// submit Form data to our db.json
const formSubmit = (e) => {
  e.preventDefault();
  let ramenObj = {
    name: e.target.new_name.value,
    restaurant: e.target.new_restaurant.value,
    image: e.target.new_image.value,
    rating: e.target.new_rating.value,
    comment: e.target.new_comment.value,
  };
  // console.log(ramenObj);
  handleSubmit(ramenObj);
};

// function for POST request

const handleSubmit = (ramenObj) => {
  fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ramenObj),
  })
    .then((res) => res.json())
    .then((ramen) => {
      console.log(ramen);
    });
};