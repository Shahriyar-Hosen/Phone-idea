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
              <button class="btn btn-primary">See Detiles</button>
            </div>
          </div>
      `;
      searchResult.appendChild(div)
    console.log(phone);
  });
};
