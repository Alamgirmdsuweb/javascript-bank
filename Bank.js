var user = [
    {   name: 'suweb',
        Email: "Suweb@gmail.com",
        password: "1234",
    },
    {
        name: 'suweb1',
        Email: "Suweb1@gmail.com",
        password: "1234",
    },
    {
        name: 'suweb2',
        Email: "Suweb2@gmail.com",
        password: "1234",
    },
];

var userEmail;
const dbName = "UserData";

const request = indexedDB.open(dbName, 2);

request.onerror = (event) => {};

let StoreData = [];

request.onupgradeneeded = (event) => {
    const db = event.target.result;

    const objectStore = db.createObjectStore("alldata", {
        keyPath:"User",
        autoIncrement: true,
    });

    objectStore.transaction.oncomplete = (event) => {
        let LoginObjectStore = db
            .transaction("alldata", "readwrite")
            .objectStore("alldata");
        user.forEach((id) => {
            LoginObjectStore.add(id);
        });
    };
};

request.onsuccess = (event) => {
    const db = event.target.result;

    let LoginObjectStore = db
        .transaction("alldata", "readwrite")
        .objectStore("alldata");
    LoginObjectStore.oncomplete = (ev) => {;
    let getReq = LoginObjectStore.getAll();
    console.log(getReq);
    getReq.onsuccess = (e) => {
        e.preventDefault();
        let newRequest = e.target;

        StoreData = [...newRequest.result];

        console.log(StoreData);
    };
    getReq.onerror = (e) => {
        console.log("error");
    };
};
}

// store Login form Data

function Submit() {
    userEmail = document.getElementById("email").value;
  
    UserPassword = document.getElementById("password").value;

  
    let Time;
    let flag = false
    for (var i = 0; i<user.length; i++) {
        if (userEmail === user[i].Email && UserPassword === user[i].password) {
            Time = DateTime();
			// addData();
			
            // window.location.href = "Banking.html";
            window.location.href=`Banking.html?name${user[i].Email}`
            flag= true
         break;
            
        } 
        
    }
    if(!flag){
        document.getElementById("error").innerHTML =
            "<span style='color:red'>Please input  your current email or password !!</span>";
            
    }
}

function DateTime() {
    var date = new Date();
    var hours = date.getHours();
    var days = date.getDay();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = date.toDateString() + " " + hours + ":" + minutes + " " + ampm;
    return strTime;
}

// function addData() {
//     const value = "email";

//     const request1 = indexedDB.open(value, 2);
//     request1.onerror = (error) => {
        
//     };
//     request1.onupgradeneeded = () => {
       
//         const db = request1.result;
//         db.createObjectStore("userData", { autoIncrement: true });
//     };
//     request1.onsuccess = () => {
        
//     };

//     Time = DateTime();
//     let data = {
//         email: userEmail,
//         password: UserPassword,
//         Time,
//     };

//     let dbPromise = indexedDB.open("email", 2);
//     dbPromise.onsuccess = () => {
//         const db = dbPromise.result;
//         const tx = db.transaction("userData", "readwrite");
//         const userData = tx.objectStore("userData");
//         const newUsers = userData.add(data);

//         newUsers.onsuccess = () => {
//             tx.oncomplete = () => {
               
//                 db.close();
//             };
//         };
//         newUsers.onerror = (e) => {
//             tx.oncomplete = () => {
              
//             };
//         };
//     };
// }


    function clearFunc()
	{
		document.getElementById("email").value="";
		document.getElementById("password").value="";
	}	