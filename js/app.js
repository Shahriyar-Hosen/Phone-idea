document.getElementById("search-btn").addEventListener("click", () => {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;
  searchInput.value = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadPhones(data.data));
});

const loadPhones = (phones) => {
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
};

const loadDetiles = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetiles(data.data));
};

const displayDetiles = (detiles) => {
  console.log(detiles);
  const detilesConteinar = document.getElementById("phone-detiles");
  detilesConteinar.textContent = "";
  const others = (data) => {
    if (data == undefined || data == null) {
      console.log("No other specialties");
      return "No other specialties"
    }
  };
  const othersData = others(detiles.others);
  const div = document.createElement("div");
  div.classList.add("row");
  div.innerHTML = `
           <div class="col-md-4">
              <img src="${
                detiles.image
              }" class="img-fluid rounded-start" alt="..." />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">${
                  detiles.name
                } - <small class="fs-6 fw-light">(${detiles.brand})</small></h5>
                <p>${detiles.releaseDate}</p>
                <p>Main Features:
                <br>Chip Set: ${detiles.mainFeatures.chipSet} 
                <br>Display Size: ${detiles.mainFeatures.displaySize}
                <br>Memory: ${detiles.mainFeatures.memory}</p>
                <p>Others:
                <br></p>
                <p></p>
              </div>
           </div>
  `;
  detilesConteinar.appendChild(div);
};
