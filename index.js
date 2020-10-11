const prompt = require("readline-sync");


function prettyObject(object) {
  for (let key in object) {
    console.log(key + ": " +object[key].toString());
  }
}

// function checkOptions(answer, options) {
//   if (!options.includes(answer)) {
//     console.log("That answer is not an option!");
//   }
// }

/********************************** 
LISTING THE GUESTS: EXAMPLE LIST
************************************/

function exampleList() {
  return guestList = [
    ["mama","bacika","norika","milan","uros","djordjija","marko","marko1","mumika","lajco"],
    ["kika"],
    ["tata","daniel","deda","strikan","vesna","ksenija","pancic","abi","goca","alex","julija","elena","zeljko","nikola","nemanja",
      "ujnica","lea","muz","beba","antonija","toni"],
    ['petra','matija',"nunika","zoki","filip","josipa","iva","vladan","teta","zveki","dunja","teo"],
    ["iris","nemanja","bilja","dalibor","jasmina","nikola","badza","bojana","sneza","dordje","olja","olja1","sven","tena","danko","danko1","mile","luka","dino","jovana"],
    ["dariova mama",'josip',"darko pokornik","maja pokornik","cerka","petka dete","nika","miki","danica","beba"]
  ]
}


/*******************************
LISTING THE GUESTS MANUALLY
**********************************/

function creatingGuestListManually() {

  let guestList = [];
  let moreGroups = 1;

  while (moreGroups==1) {

    newGroup = prompt.question("\nWho is coming to your wedding?\nINSTRUCTIONS: enter names separated with comma, exampe: guest1,guest2,guest3").split(",");
    guestList.push(newGroup);
    moreGroups = prompt.question("\nDo you want to add more groups? 1 || 0 \n");

  }
  return guestList;
}


/*********************************** 
LETTING THE USER CHOOSE IF THEY WANT TO
1. ENTER THE GUESTLIST MANUALLY
2. TEST THE APP WITH PREMADE GUESTLIST  
*************************************/

let guestList;
let manually = prompt.questionInt("Do you want to enter your own guestlist? If you just want to test the app using premade guestlist, enter 0.\n");
if(manually == 1) {
  guestList = creatingGuestListManually();
} else {
  guestList = exampleList();
}

console.log(guestList);
console.log("\nGuestlist:");
console.log(prettyObject(guestList));


/********************** 
ORGANIZING THE TABLES 
***********************/

console.log("\nNow let's organize those tables!");
const tableChairs = prompt.questionInt("How many chairs can be at each table?\n");


/* TASK: check if some groups have more guests than chairs and break them into smaller groups */
function reducingBigGroups(guestList) {

  let guests = {};
  i = 1;
  while (guestList.length > 0) {
    n = guestList[0].length;
    if (n <= tableChairs) {
      guests[`GROUP ${i++}`] = guestList[0];
      guestList.shift();
    } else {
      console.log(`\n${guestList[0]} --> This group has ${n} members, we have to break them into groups smaller than ${tableChairs}.`);
      separating = prompt.question(`Select guests to be separated from this group.`).split(",");
      guestList[0] = guestList[0].filter(separated => !separating.includes(separated));
      if (separating.length <= tableChairs) {
        guests[`GROUP ${i++}`] = separating;
      } else {
        guestList.push(separating);
      }      
    }
  }
  return guests;
}

let guests = reducingBigGroups(guestList);



// TASK: combine smaller groups 
let numOfGroupsWithoutTable = Object.keys(guests).length;
let tableGroups = {};
let tableNumber = 1;
while(numOfGroupsWithoutTable > 0) {

  i = Object.keys(guests)[0];
  n = guests[i].length;

  if (n === tableChairs) {
  console.log(`\n${guests[i]} --> This group has exactly ${tableChairs} guests so they will have their own table together.`);
  tableGroups[`TABLE ${tableNumber++}`] = guests[i];
  delete guests[i];
  }
  else if (!Object.keys(choices(guests, tableChairs - n)).length) {
    console.log(`\n${guests[i]} --> This group has ${n} guests and since we don't have any groups left with max 
      ${tableChairs - n} people, they will have their own table.`);
    tableGroups[`TABLE ${tableNumber++}`] = guests[i];
    delete guests[i];
  } else {
    console.log("\nYour choices are:");
    console.log(prettyObject(choices(guests, tableChairs - n)));
    pick = prompt.questionInt(`${guests[i]} --> This group has ${n} guests. Choose a group from above listed choices to sit with this group and enter that choice' number.
      (If you don't want to add anyone else, enter 0!)\n`);
    if(pick!=0) {
      guests[i] = guests[i].concat(guests[`GROUP ${pick}`]);
      delete guests[`GROUP ${pick}`];
    } else {
      tableGroups[`TABLE ${tableNumber++}`] = guests[i];
      delete guests[i];
    } 
    
  }

  numOfGroupsWithoutTable = Object.keys(guests).length;
}


// TASK: make a function for checking if we can add any groups to the current group
function choices(guests, size) {

  let choices = {};
  for (let key in guests) {
    j = 1;
   if (guests[key].length <= size && key != i) {
    choices[key] = guests[key];
   }
  }
  return choices;

}


/****************************
DISPLAYING THE ASIGNED TABLES
***************************/
let totalGuests = 0;
for (let key in tableGroups) {
  totalGuests = totalGuests + tableGroups[key].length;
}
console.log(`Great job, now we have asigned tables! \nThe total number of tables is ${Object.keys(tableGroups).length}. \nThe total number of guests is ${totalGuests}.`)
console.log(prettyObject(tableGroups));