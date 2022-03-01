// Error Massege Display None
document.getElementById("emty-input").style.display = "none";
document.getElementById("incorrect").style.display = "none";
document.getElementById("error-massege").style.display = "none";

document.getElementById("search-btn").addEventListener("click", () => {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;

  // Display Cleare
    searchInput.value = "";
  document.getElementById("emty-input").style.display = "none";
  document.getElementById("incorrect").style.display = "none";
  document.getElementById("error-massege").style.display = "none";

  const detilesConteinar = document.getElementById("phone-detiles");
  detilesConteinar.textContent = "";
  const searchResult = document.getElementById("search-result");
  searchResult.textContent = "";

  // Data load
  if (searchText == "") {
    document.getElementById("emty-input").style.display = "block";
    return;
  } else {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => loadPhones(data.data))
      .catch((error) => displayError(error));
  }
  const displayError = (error) => {
    document.getElementById("error-massege").style.display = "block";
  };
});

const loadPhones = (phones) => {
  if (phones.length == 0) {
    document.getElementById("incorrect").style.display = "block";
    return;
  } else {
    const searchResult = document.getElementById("search-result");
    searchResult.textContent = "";
    phones.forEach((phone) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="card h-100">
              <img src="${phone.image}" class="card-img-top  p-3" alt="Phone images" />
              <div class="card-body">
                <h4 class="card-title text-center">${phone.phone_name}</h4>
                <h6 class="card-text text-center">
                  ${phone.brand}
                </h6>
              </div>
              <div class="mx-auto m-3">
                <button onclick="loadDetiles('${phone.slug}')" class="btn btn-primary">See Detiles</button>
              </div>
            </div>
        `;
      searchResult.appendChild(div);
    });
  }
};

const loadDetiles = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetiles(data.data));
};

const displayDetiles = (detiles) => {
  const detilesConteinar = document.getElementById("phone-detiles");
  detilesConteinar.textContent = "";
  const div = document.createElement("div");
  div.classList.add("row");
  div.innerHTML = `
           <div class="col-md-4">
              <img src="${detiles.image}" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${detiles.name} - <small class="fs-6 fw-light">(${detiles.brand})</small></h5>
                <p>${detiles.releaseDate}</p>
                <p>Main Features:
                <br>Chip Set: ${detiles.mainFeatures.chipSet} 
                <br>Display Size: ${detiles.mainFeatures.displaySize}
                <br>Memory: ${detiles.mainFeatures.memory}</p>
                <p></p>
                <p>Others:
                <br></p>
              </div>
           </div>
  `;
  detilesConteinar.appendChild(div);
};
