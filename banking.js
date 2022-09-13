let table = [];
// console.log(table);
let array = [];

//Logout in this page
document.getElementById("button").onclick = function () {
    location.href = "index.html";
};

// console.log(Balance);

let DB;
var email = location.search.split("name")[1];

function getDeposit() {
    let Deposit = 0;
    array.forEach((e) => (Deposit = e.Type === "Deposit" ? e.Amount : Deposit));
    document.getElementById("deposit-total").innerHTML = Deposit;

    return Deposit;
}
function getwidthdraw() {
    let widthdraw = 0;
    array.forEach(
        (e) => (widthdraw = e.Type ==="Widthdraw" ? e.Amount : widthdraw)
    );

    document.getElementById("widthdraw-total").innerHTML = widthdraw;
    return widthdraw;
}
// function CurrentBalance() {
//     let CurrentBalance = 0;
//     array.forEach(
//         (e) => (CurrentBalance = e.Current_Balance ==="DepositTotalAmount" ? e.Amount : CurrentBalance)
//     );

//     document.getElementById("widthdraw-total").innerHTML = CurrentBalance;
//     return CurrentBalance;
// }


// create the database

const Bank = "LoginData";
let request = window.indexedDB.open("Bank", 1);
// console.log(request);

request.onerror = function () {
    // console.log("error");
};

request.onsuccess = function () {
    DB = request.result;
    // console.log(DB);
    showData();
};

request.onupgradeneeded = function (e) {
    let db = e.target.result;

    let objectStore = db.createObjectStore("Data", { autoIncrement: true });
    // console.log(objectStore);

    objectStore.createIndex("Type", "Type", { unique: false });
    objectStore.createIndex("Email", "Email", { unique: false });
    objectStore.createIndex("Amount", "Amount", { unique: false });
    objectStore.createIndex("Previous_Balance", "Previous_Balance", {
        unique: false,
    });
    objectStore.createIndex("Current_Balance", "Current_Balance", {
        unique: false,
    });
    objectStore.createIndex("Time", "Time", { unique: false });
};

function addData(data) {
    let transaction = DB.transaction("Data", "readwrite");
    let objectStore = transaction.objectStore("Data");
    // console.log(objectStore, data);

    let request = objectStore.add(data);

    request.onsuccess = () => {};
    transaction.oncomplete = () => {
        showData();
    };
    transaction.onerror = () => {};
}
function showData() {
    let StoreData = [];

    let transaction = DB.transaction("Data", "readwrite");
    let objectStore = transaction.objectStore("Data");
    let getReq = objectStore.getAll();
    getReq.onsuccess = (e) => {
        let data = [];
        let newRequest = e.target;
        StoreData = [...newRequest.result];
        let store = [];

        for (let i = 0; i < StoreData.length; i++) {
            if (StoreData[i].Email === email) {
                store.push(StoreData[i]);
            }
        }

        var maxIndex;
        maxIndex = store.length - 1;

        let newArray = [];
       
        newArray.push(store[maxIndex]);

        document.getElementById("balance-total").innerHTML =
            store[maxIndex].Current_Balance;
            
            
        store.forEach((u) => {
            let log = document.createElement("li");
            array.push(u);

            data += log.innerHTML = `<tr>
                 <td><p class="font-weight-bold"> <span class="font-weight-normal">${u.Email}<span></p></td> 
                 <td><p class="font-weight-bold"> <span class="font-weight-normal">${u.Type}<span></p></td>
                 <td><p class="font-weight-bold"> <span class="font-weight-normal">${u.Amount}<span></p></td>                        
                 <td><p class="font-weight-bold"> <span class="font-weight-normal">${u.Previous_Balance}<span></p></td> 
                 <td><p class="font-weight-bold"> <span class="font-weight-normal">${u.Current_Balance}<span></p></td>
                 <td><p class="font-weight-bold"> <span class="font-weight-normal">${u.Time}<span></p></td></tr>

`;
        });

        getDeposit();
        getwidthdraw();

        document.getElementById("myTable").innerHTML = data;
    };
}

//  input value
function getInputValue(inputId) {
    const inputField = document.getElementById(inputId);

    const inputAmountT = inputField.value;

    const InputBalance = parseFloat(inputAmountT);

   

    //  clear input field

    inputField.value = "";

    return InputBalance;
}
//  update value
// depositAmount

function updateTotalField(value, amount) {
    const showBalance = document.getElementById(value);

    const previousBalance = showBalance.innerText;
    // console.log(previousBalance);
    const previousTotal = parseFloat(previousBalance);
    console.log(previousTotal);

    let val = (showBalance.innerText = parseFloat(previousTotal + amount));
    console.log(val);
}

function getCurrentBalance() {
    const balanceTotal = document.getElementById("balance-total");

    const previousBalanceCheck = balanceTotal.innerText;
    // console.log(previousBalanceCheck);
    const previousBalanceTotal = parseFloat(previousBalanceCheck);

    console.log(previousBalanceTotal);

    return previousBalanceTotal;
}

function updateBalance(amount, Add) {
    document.getElementById("balance-total");
    // console.log(balanceTotal);

    const previousBalanceTotal = getCurrentBalance();
    console.log(previousBalanceTotal);

    if (Add == true) {
        previousBalanceTotal + amount;
    } else {
        previousBalanceTotal - amount;
    }
}

// deposit side
document
    .getElementById("deposit-button")
    .addEventListener("click", function () {
        const depositAmount = getInputValue("deposit-input");

        if (depositAmount <= 0) return;

        if (!depositAmount) return;

        var email = location.search.split("name")[1];

        const previousBalance = getCurrentBalance("deposit-input");

        console.log(previousBalance);

        const DepositTotalAmount = getCurrentBalance("balance-total") + depositAmount;

        // console.log(TotalAmount);
       ;

        const time = DateTime(depositAmount);

        const values = {
            Email: email,
            Type: "Deposit",
            Amount: depositAmount,

            Previous_Balance: previousBalance,
            Current_Balance: DepositTotalAmount,
            Time: time,
        };
        // console.log(values.Amount);

        table.push(values);
        addData(values);

        if (depositAmount >= 0) {
            updateTotalField("deposit-total", depositAmount);
            //    console.log(val);

            updateBalance(depositAmount, true);

            document.querySelector("#error").innerHTML = "";
        } else {
            document.querySelector("#error").innerHTML =
                "<span style='color:red'>Enter You positive Number !!</span>";
        }
    });

//  withdraw side

document
    .getElementById("Withdraw-button")
    .addEventListener("click", function () {
        const withdrawAmount = getInputValue("Withdraw-input");

        if (withdrawAmount <= 0) return;
        if (!withdrawAmount) return;
        var email = location.search.split("name")[1];

        const previousBalanceTotal = getCurrentBalance("Withdraw-input");

        console.log(previousBalanceTotal);

        const Totalwithdraw = getCurrentBalance("balance-total") - withdrawAmount;
        if (Totalwithdraw <= 0) return;

        console.log(Totalwithdraw);
        const time = DateTime(withdrawAmount);

        const values = {
            Email: email,
            Type: "Widthdraw",
            Amount: withdrawAmount,
            Previous_Balance: previousBalanceTotal,
            Current_Balance: Totalwithdraw,
            Time: time,
        };
        table.push(values);
        addData(values);

        const CurrentBalance = getCurrentBalance();
        console.log(CurrentBalance);

        if (withdrawAmount > 0 && withdrawAmount > CurrentBalance) {
            updateTotalField("widthdraw-total", withdrawAmount);

            updateBalance(withdrawAmount, false);

            document.querySelector("#errors").innerHTML = "";
        } else if (withdrawAmount > CurrentBalance) {
            document.querySelector("#errors").innerHTML =
                "<span style='color:red'>Not Enough Balance!!</span>";
        } else {
        }
    });

function DateTime() {
    var date = new Date();
    var hours = date.getHours();
    var days = date.getDay();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime =
        date.toDateString() + " " + hours + ":" + minutes + " " + ampm;
    return strTime;
}
