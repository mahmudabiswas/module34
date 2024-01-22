const loadingData = async (searchText = "13", isShowAll) => {
  const res = await fetch(
    ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phone = data.data;
  allPhones(phone, isShowAll);
};

const allPhones = (phone, isShowAll) => {
  console.log(phone);
  // get the element
  const container = document.getElementById("phoneContainer");
  // clear the container
  container.textContent = "";

  // display show all button if there are more than 12 phones
  const showAllBtn = document.getElementById("showAllBtn");
  if (phone.length > 10 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }

  console.log("is show all", isShowAll);
  // slice the phone 1 to 10;
  if (!isShowAll) {
    phone = phone.slice(0, 10);
  }

  phone.forEach((phone) => {
    const div = document.createElement("div");
    div.innerHTML = `
    
    <div class="card bg-base-100 shadow-xl">
    <figure>
      <img
        src= ${phone.image}
        alt="Shoes"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title"> ${phone.phone_name} </h2>
      <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions justify-end">
        <button onClick=" showModel('${phone.slug}')" class="btn btn-primary"> Show Details </button>
      </div>
    </div>
  </div>
    
    `;
    container.appendChild(div);
  });
  loader(false);
};
// search btn

// model with details Btn

const showModel = async (id) => {
  console.log("show all", id);
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showDetailsModal(phone);
};

const showDetailsModal = (phone) => {
  console.log(phone);
  const allModal = document.getElementById("allModal");

  allModal.innerHTML = `
  <button class="btn" onclick="">open modal</button>
      <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">${phone.name}</h3>
        <img src=${phone.image} alt='phone'          />
          <div class="modal-action">
            <form method="dialog">
              <!-- if there is a button in form, it will close the modal -->
              <button class="btn btn-primary">Close</button>
            </form>
          </div>
        </div>
      </dialog>
  
  `;
  my_modal_5.showModal();
};

const searchBtn = (isShowAll) => {
  loader(true);
  const inputField = document.getElementById("inputField");
  const inputValue = inputField.value;
  inputField.value = "";

  loadingData(inputValue, isShowAll);
};

// loader

const loader = (isLoader) => {
  const loadingSpnnier = document.getElementById("loadingSpnnier");
  if (isLoader) {
    loadingSpnnier.classList.remove("hidden");
  } else {
    loadingSpnnier.classList.add("hidden");
  }
};

// show all display

const HandleShoAll = () => {
  searchBtn(true);
};

loadingData();
