document.getElementById("search-btn").addEventListener("click", () => {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;
  searchInput.value = "";
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => loadPhones(data.data));
});

const loadPhones = (phones)=>{
    // console.log(phones)
    phones.forEach(phone => {
        console.log(phone)
    });
};