const prompt = require("readline-sync");



/********************************** 
LISTING THE GUESTS: EXAMPLE LIST
************************************/

let gosti = [
  ["mama","bacika","norika","milan","uros","djordjija","marko","marko1","mumika","lajco"],
  ["kika"],
  ["tata","daniel","deda","strikan","vesna","ksenija","pancic","abi","goca","alex","julija","elena","zeljko","nikola","nemanja",
    "ujnica","lea","muz","beba","antonija","toni"],
  ['petra','matija',"nunika","zoki","filip","josipa","iva","vladan","teta","zveki","dunja","teo"],
  ["iris","nemanja","bilja","dalibor","jasmina","nikola","badza","bojana","sneza","dordje","olja","olja1","sven","tena","danko","danko1","mile","luka","dino","jovana"],
  ["dario-mama",'josip',"darko pokornik","maja pokornik","cerka","petka dete","nika","miki","danica","beba"]
]
function importingList(list) {

  guests = {};
  list.forEach(function(item,index) {
    guests[index] = item;
  });
  return guests;

}

guests = importingList(gosti);
console.log(guests);




/*******************************
LISTING THE GUESTS MANUALLY
**********************************/


// let guests = {};
// let totalGroups = 0;
// let moreGroups = 1;

// while (moreGroups==1) {

//   totalGroups++;
//   guests[totalGroups] = prompt.question("\nWho is coming to your wedding?\n").split(",");
//   moreGroups = prompt.question("\nDo you want to add more groups? 1 || 0 \n");

// }
// console.log("Your guests are:\n");
// console.log(guests);





/********************** 
ORGANIZING THE TABLES 
***********************/

console.log("\nNow let's organize those tables!");
const tableChairs = prompt.questionInt("How many chairs can be at each table?\n");


/* TASK: check if some groups have more guests than chairs and break them into smaller groups */
function reducingBigGroups(i) {
  n = guests[i].length;
  if (n > tableChairs) {
    console.log(`\n${guests[i]} --> This group has ${n - tableChairs} members, 
      we have to break them into groups smaller than ${tableChairs}.`);
    separating = prompt.question(`Pick from ${n - tableChairs} to ${tableChairs} guests to be separated.`).split(",");
    guests[i] = guests[i].filter(separated => !separating.includes(separated)); // filtering out the non-chosen people, and updating the object guest
    guests[Object.keys(guests).length + 1] = separating;
    console.log(guests);
  }
}
Object.keys(guests).forEach(i => reducingBigGroups(i));



// TASK: combine smaller groups 
let numOfGroupsWithoutTable = Object.keys(guests).length;
let tableGroups = {};
let tableNumber = 1;
while(numOfGroupsWithoutTable > 0) {

  i = Object.keys(guests)[0];
  n = guests[i].length;

  if (n === tableChairs) {
  console.log(`\n${guests[i]} --> This group has exactly ${tableChairs} guests so they will have their own table together.`);
  tableGroups[`TABLE${tableNumber++}`] = guests[i];
  delete guests[i];
  }
  else if (!choices(guests, tableChairs - n)) {
    console.log(`\n${guests[i]} --> This group has ${n} guests and since we don't have any groups left with max 
      ${tableChairs - n} people, so they will have their own table.`);
    tableGroups[`TABLE${tableNumber++}`] = guests[i];
    delete guests[i];
  } else {
    pick = prompt.question(`${guests[i]} --> This group has ${n} guests. Pick a group with maximum ${ tableChairs - n} 
      people to sit with this group.
      (If you don't want to add anyone else, enter 0!)\n`);
    if(pick!=0) {
      guests[i] = guests[i].concat(guests[pick]);
      delete guests[pick];
    } else {
      tableGroups[`TABLE${tableNumber++}`] = guests[i];
      delete guests[i];
    } 
    
  }

  numOfGroupsWithoutTable = Object.keys(guests).length;
}


// TASK: make a function for checking if we can add any groups to the current group
function choices(guests, size) {

  let choices = {};
  for (let key in guests) {
   if (guests[key].length <= size && key != i) {
    choices[guests[key].length] = guests[key];
   }
  }
  return Object.keys(choices).length;

}



/****************************
DISPLAYING THE ASIGNED TABLES
***************************/
console.log(tableGroups);