var btnNumber = document.getElementById("btnNumber");
var addBook = document.getElementById("btnAdd");
var sectionBookNum = document.querySelector(".s2");
var checkNum = document.querySelector(".s2 p");
var bookNum;
var booksRemaining;

var arrBook = [];
var sectionForm = document.querySelector(".form-add-book");
var inputForm = document.querySelectorAll(".s3 .form input");
var bookMessage = document.querySelector(".m1");
var priceMessage = document.querySelector(".m2");
var autherMessage = document.querySelector(".m3");
var emailMessage = document.querySelector(".m4");
var table = document.querySelector("table");
var message = document.querySelector(".message");
var form = document.querySelector("form");

function hide(elements) {
  elements.style.display = "none";
}
function show(elements) {
  elements.style.display = "block";
}

function Auther(name, email) {
  this.autherName = name || "";
  this.autherEmail = email || "";
}
function ObjBook(book, p, authorName, authorEmail) {
  this.nameBook = book || "";
  this.price = p || "";
  this.auther = new Auther(authorName, authorEmail);
}

btnNumber.addEventListener("click", function () {
  bookNum = parseInt(document.getElementById("num-book").value);
  if (!isNaN(bookNum)) {
    // console.log(bookNum);
    booksRemaining = bookNum;
    hide(sectionBookNum);
    show(sectionForm);
  } else {
    checkNum.innerHTML = "Please Enter books Number ";
  }
});

//check input vailed by click  input
inputForm[0].addEventListener("input", function (e) {
  var pattern = /^[a-zA-Z0-9]{2,30}$/;
  if (e.target.value != "" && pattern.test(e.target.value)) {
    hide(bookMessage);
  } else if (e.target.value == "") {
    bookMessage.innerHTML = "this faild is required";
    show(bookMessage);
  } else {
    bookMessage.innerHTML = "The input doesn't match the Name book pattern.";
    show(bookMessage);
  }
});
inputForm[1].addEventListener("input", function (e) {
  var pattern = /^[0-9]{1,6}$/;
  if (e.target.value != "" && pattern.test(e.target.value)) {
    hide(priceMessage);
  } else if (e.target.value == "") {
    priceMessage.innerHTML = "this faild is required";
    show(priceMessage);
  } else {
    priceMessage.innerHTML = "The input doesn't match the price pattern.";
    show(priceMessage);
  }
});
inputForm[2].addEventListener("input", function (e) {
  var pattern = /^[a-zA-Z]{2,30}$/;
  if (e.target.value != "" && pattern.test(e.target.value)) {
    hide(autherMessage);
  } else if (e.target.value == "") {
    autherMessage.innerHTML = "this faild is required";
    show(autherMessage);
  } else {
    autherMessage.innerHTML =
      "The input doesn't match the Name auther pattern.";
    show(autherMessage);
  }
});
inputForm[3].addEventListener("input", function (e) {
  var pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (e.target.value != "" && pattern.test(e.target.value)) {
    hide(emailMessage);
  } else if (e.target.value == "") {
    emailMessage.innerHTML = "this faild is required";
    show(emailMessage);
  } else {
    emailMessage.innerHTML = "The input doesn't match the email pattern.";
    show(emailMessage);
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (booksRemaining > 0) {
    var book = new ObjBook(
      inputForm[0].value,
      inputForm[1].value,
      inputForm[2].value,
      inputForm[3].value
    );
    arrBook.push(book);
    message.innerHTML = `done successfully `;
    message.style.backgroundColor = "#3a8a38";
    show(message);
    booksRemaining--;
    if (booksRemaining === 0) {
      show(message);
      displaybook();
      clearForm();
    } else {
      clearForm();
      message.innerHTML = `You need to add ${booksRemaining} more book(s).`;
      message.style.backgroundColor = "#991f1f";
      show(message);
    }
  }
});
function displaybook() {
  var contaner = ` `;
  console.log(contaner + "start");
  for (let i = 0; i < arrBook.length; i++) {
    contaner += `<tr>
    <td>${arrBook[i].nameBook}</td>
    <td>${arrBook[i].price}</td>
    <td>${arrBook[i].auther.autherName}</td>
    <td>${arrBook[i].auther.autherEmail}</td>
    <td>
        <button onclick="editBook(${i})">Edit</button>
        <button onclick="deleteBook(${i})">Delete</button>
    </td>    <tr>
    `;
  }
  console.log(contaner + "end");
  document.querySelector("tbody").innerHTML = contaner;
  hide(sectionForm);
  show(table);
}

function clearForm() {
  inputForm[0].value = "";
  inputForm[1].value = "";
  inputForm[2].value = "";
  inputForm[3].value = "";
}

function deleteBook(index) {
  arrBook.splice(index, 1);
  displaybook();
}

function editBook(i) {
  var row = document.querySelectorAll("tbody tr")[i];
  var cells = row.querySelectorAll("td");

  if (cells[0].querySelector("input")) {
    arrBook[i].nameBook = cells[0].querySelector("input").value;
    arrBook[i].price = cells[1].querySelector("input").value;
    arrBook[i].auther.autherName = cells[2].querySelector("input").value;
    arrBook[i].auther.autherEmail = cells[3].querySelector("input").value;
    displaybook();
  } else {
    cells[0].innerHTML = `<input type="text" value="${arrBook[i].nameBook}">`;
    cells[1].innerHTML = `<input type="text" value="${arrBook[i].price}">`;
    cells[2].innerHTML = `<input type="text" value="${arrBook[i].auther.autherName}">`;
    cells[3].innerHTML = `<input type="email" value="${arrBook[i].auther.autherEmail}">`;
    cells[4].innerHTML = `
      <button onclick="saveBook(${i})">Save</button>
      <button onclick="cancelEdit(${i})">Cancel</button>
    `;
  }
}

function saveBook(i) {
  var row = document.querySelectorAll("tbody tr")[i];
  var cells = row.querySelectorAll("td");
  arrBook[i].nameBook = cells[0].querySelector("input").value;
  arrBook[i].price = cells[1].querySelector("input").value;
  arrBook[i].auther.autherName = cells[2].querySelector("input").value;
  arrBook[i].auther.autherEmail = cells[3].querySelector("input").value;
  displaybook();
}

function cancelEdit(index) {
  displaybook();
}
