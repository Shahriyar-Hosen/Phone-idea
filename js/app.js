// Error Massege Display None
document.getElementById("emty-input").style.display = "none";
document.getElementById("incorrect").style.display = "none";
document.getElementById("error-massege").style.display = "none";

// Call data
document.getElementById("search-btn").addEventListener("click", () => {
  const searchInput = document.getElementById("search-input");
  const searchText = searchInput.value;

  // Display Cleare
  // input cleare
  searchInput.value = "";
  // display cleare
  document.getElementById("emty-input").style.display = "none";
  document.getElementById("incorrect").style.display = "none";
  document.getElementById("error-massege").style.display = "none";
  // result cleare
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
      .then((data) => displayPhones(data.data))
      .catch((error) => displayError(error));
  }
  const displayError = (error) => {
    document.getElementById("error-massege").style.display = "block";
  };
});

// Display Phone
const displayPhones = (phones) => {
  if (phones.length == 0) {
    document.getElementById("incorrect").style.display = "block";
    return;
  } else {
    // previous data cleare
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
// Load Phone detiles
const loadDetiles = (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayDetiles(data.data));
};

// Display detiles
const displayDetiles = (detiles) => {
  const detilesConteinar = document.getElementById("phone-detiles");
  detilesConteinar.textContent = "";

  // Sensors Others And Release Date Verification 
  const sensors = () => {
    const sensors = detiles.mainFeatures.sensors;
    if (sensors.length === 0) {
      return "There is no sensor in this phone";
    } else {
      return sensors;
    }
  };
  const sensor = sensors();
  
  const other = () => {
    if (detiles.others === undefined) {
      return "No others facilities";
    } else {
      const another = detiles.others;
      const bluetooth = another.Bluetooth;
      const gps = another.GPS;
      const nfc = another.NFC;
      const radio = another.Radio;
      const usb = another.USB;
      const wlan = another.WLAN;
      const allOthers =
        "Bluetooth: " +
        bluetooth +
        ", " +
        "GPS: " +
        gps +
        ", " +
        "NFC: " +
        nfc +
        ", " +
        "Radio: " +
        radio +
        ", " +
        "USB: " +
        usb +
        ", " +
        "WLAN: " +
        wlan;
      return allOthers;
    }
  };
  const others = other();

  const releaseDate = () => {
    if (detiles.releaseDate === "") {
      return "No Release Date";
    } else {
      return detiles.releaseDate;
    }
  };

  const div = document.createElement("div");
  div.classList.add("row");
  div.innerHTML = `
           <div class="col-md-4">
              <img src="${
                detiles.image
              }" class="img-fluid rounded-start" alt="Phone Detiles" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title fs-4">${
                  detiles.name
                } - <small class="fs-4 fw-light">(${detiles.brand})</small></h5>
                <p>${releaseDate()}</p>
                <p><span class="fw-bold fs-6">Main Features:</span>
                <br><span class="fw-bold">Chip Set: </span>${
                  detiles.mainFeatures.chipSet
                } 
                <br><span class="fw-bold">Display Size: </span>${
                  detiles.mainFeatures.displaySize
                }
                <br><span class="fw-bold">Memory: </span>${
                  detiles.mainFeatures.memory
                }</p>
                <p><span class="fw-bold">sensors:</span>
                <br>${sensor}</p>
                <p><span class="fw-bold">Others:</span>
                <br>${others}</p>
              </div>
           </div>
  `;
  detilesConteinar.appendChild(div);
};
