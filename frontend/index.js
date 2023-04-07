const add = document.getElementById("add");
const remove = document.getElementById("delete");
const update = document.getElementById("update");
const search = document.getElementById("search");

const addName = document.getElementById("addName");
const addMobile = document.getElementById("addMobile");
const updateName = document.getElementById("updateName");
const updateMobile = document.getElementById("updateMobile");
const deleteMobile = document.getElementById("deleteMobile");
const searchInput = document.getElementById("searchInput");
const myselect = document.getElementById("myselect");

const display = document.getElementById("display");

let list = [];

upDateList();

add.addEventListener("click", async (e) => {
  const name = addName.value;
  const mobile = addMobile.value;

  await fetch("http://localhost:4000/storeData", {
    method: "POST",
    body: JSON.stringify({
      name: name.toUpperCase(),
      mobile: mobile,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      alert(json.message);
      list.push({ name: json.data.name, mobile: json.data.mobile });
      //console.log(list);
      upDateList();
    });
});

update.addEventListener("click", async (e) => {
  const name = updateName.value;
  const mobile = updateMobile.value;

  await fetch("http://localhost:4000/update", {
    method: "POST",
    body: JSON.stringify({
      name: name.toUpperCase(),
      mobile: mobile,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      alert(json.message);
      //console.log(list);
      upDateList();
    });
});

remove.addEventListener("click", async (e) => {
  const mobile = deleteMobile.value;

  await fetch("http://localhost:4000/delete", {
    method: "POST",
    body: JSON.stringify({
      mobile: mobile,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => {
      alert(json.message);
     // console.log(list);
      upDateList();
    });
});

search.addEventListener("click", (e) => {
  const serchValue = searchInput.value;
  const condition = myselect.value;

  if (condition == "name") {
    let result = [];
    list.map((e) => {
      if (e.name.toUpperCase().includes(serchValue.toUpperCase())) {
        result.push(e);
      }
    });
    removelist();
    showlist(result);
  } else {
    let result = [];
    list.map((e) => {
      if (e.mobile.includes(serchValue)) {
        result.push(e);
      }
    });
    removelist();
    showlist(result);
  }
});

async function upDateList() {
  const response = await fetch("http://localhost:4000/list")
    .then((response) => response.json())
    .then((json) => {
      list = json.data;
      //console.log(list);
      showlist(list);
    });
}

function showlist(l) {
    removelist();
  for (var i = 0; i < l.length; i++) {
    let ele = `<tr id="${1}">
        <td>${i + 1}</td>
        <td>${l[i].name}</td>
        <td>${l[i].mobile}</td>
      </tr>`;

    display.innerHTML += ele;
  }
}

function removelist() {
  while (display.hasChildNodes()) display.removeChild(display.firstChild);

  let ele=`<tr>
  <th>S.No.</th>
  <th>Name</th>
  <th>Mobile</th>
</tr>`;

display.innerHTML+=ele;
}
