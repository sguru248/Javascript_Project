"use strict";
const btn = document.querySelector(".btn");

const costEst = document.getElementById("cost");

const preview = document.getElementById("previewBtn");

/// Function/////

const calcDayPassed = function (fromDate, toDate) {
  const days = (new Date(toDate) - new Date(fromDate)) / (1000 * 60 * 60 * 24);

  return days;
};

function previewRooms() {
  const photodiv = document.getElementById("roomPhotos");

  console.log(photodiv);

  photodiv.style.display = "block";

  const roomType = document.getElementById("roomType").value;

  console.log(roomType);

  let roomno = 0;

  if (roomType === "basic") {
    roomno = 1;
  } else if (roomType === "deluxe") {
    roomno = 2;
  } else if (roomType === "suite") {
    roomno = 3;
  }

  const html = `<img src="./Asset/image-${roomno}.jpg" alt="Basic Room" />`;

  photodiv.insertAdjacentHTML("afterbegin", html);
}

/////

const amountCalculate = function (roomType, fromDate, toDate, breakfast) {
  let roomCost = 0;

  if (roomType === "basic") {
    roomCost = 1000;
  } else if (roomType === "deluxe") {
    roomCost = 2000;
  } else if (roomType === "suite") {
    roomCost = 5000;
  }

  const days = calcDayPassed(fromDate, toDate);
  let totalCost = roomCost * days;

  if (breakfast === "yes") {
    totalCost = totalCost + 500 * days;
  }

  return { totalCost, days };
};
////////

//////

btn.addEventListener("click", function (e) {
  e.preventDefault();
  const roomType = document.getElementById("roomType").value;
  const fromDate = document.getElementById("fromDate").value;
  const toDate = document.getElementById("toDate").value;
  const breakfast = document.querySelector(
    'input[name="breakfast"]:checked'
  ).value;

  console.log(roomType);
  console.log(fromDate);
  console.log(toDate);
  console.log(breakfast);

  const finaldetails = amountCalculate(roomType, fromDate, toDate, breakfast);

  console.log(finaldetails);

  const html = `
              <h2>Cost Estimate:</h2><br/>
              <p>Type of Room:  ${roomType}</p>
              <p>No of Days     :  ${finaldetails.days}</p>
              <p>Total coast :  ${finaldetails.totalCost}</p>
  `;

  costEst.insertAdjacentHTML("afterbegin", html);
});
