let myFormEl = document.getElementById("myForm");
let nameErrMsgEl = document.getElementById("nameErrMsg");
let nameEl = document.getElementById("name");
let passwordErrMsgEl = document.getElementById("passwordErrMsg");
let passwordEl = document.getElementById("password");
let buttonEl = document.getElementById("button");
let nameEntered = "";
let passwordEntered = "";
let jsonDeatils = "";
let postJsondeatils = "";
nameEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        nameErrMsgEl.textContent = "Required*";
    } else {
        nameErrMsgEl.textContent = "";
    }
});

passwordEl.addEventListener("change", function(event) {
    if (event.target.value === "") {
        passwordErrMsgEl.textContent = "Required*";
    } else {
        passwordErrMsgEl.textContent = "";
    }
});

myFormEl.addEventListener("submit", function(event) {
    event.preventDefault();

});

function displayUserDetails(nameEntered, passwordEntered) {
    for (let item of jsonDeatils) {
        if ((item.password === passwordEntered) && (item.name === nameEntered)) {
            detailsMatched(nameEntered);
            myFormEl.classList.add("d-none");
            document.getElementById("heading").classList.add("d-none");

        } else {
            document.getElementById("totalErrMsg").textContent = "Invalid user details";
        }
    }
}


function getUserDetails() {
    let option = {
        method: "GET"
    };

    fetch("https://60fe481525741100170784ff.mockapi.io/api/v1/user", option)
        .then(function(response) {
            return response.json();

        })
        .then(function(jsonData) {
            jsonDeatils = jsonData;
            nameEntered = nameEl.value;
        });
}
getUserDetails();

function displayPostDetails(nameEntered) {

    let userDetails = document.getElementById("sectionUser");

    let div = document.createElement("nav");
    div.classList.add("div");
    userDetails.appendChild(div);

    for (let item of jsonDeatils) {
        if (item.name === nameEntered) {
            let img = document.createElement("img");
            img.src = item.avatar;
            img.classList.add("logo");
            div.appendChild(img);
        }
    }

    let user = document.createElement("p");
    user.textContent = nameEntered;
    user.classList.add("name-user");
    div.appendChild(user);

    let button = document.createElement("button");
    button.textContent = "Logout";
    button.classList.add("button");
    div.appendChild(button);

    button.onclick = function() {
        myFormEl.classList.remove("d-none");
        document.getElementById("heading").classList.remove("d-none");
        userDetails.textContent = "";
        button.classList.add("d-none");
        totalErrMsg.textContent = "";
    };

    for (let item of postJsondeatils) {
        userDetails.classList.add("main-container");
        let image = item.avatar;

        let divEl = document.createElement("div");
        userDetails.appendChild(divEl);
        divEl.classList.add("container-div");

        let avatar = document.createElement("img");
        avatar.src = image;
        avatar.classList.add("avatar");
        divEl.appendChild(avatar);

        let headingName = document.createElement("p");
        headingName.textContent = item.name;
        headingName.classList.add("name");
        divEl.appendChild(headingName);

        let para = document.createElement("p");
        para.textContent = item.post;
        para.classList.add("post");
        userDetails.appendChild(para);
    }
}

function detailsMatched(nameEntered) {
    let userDetails = document.getElementById("sectionUser");


    let option = {
        method: "GET"
    };

    fetch("https://60fe481525741100170784ff.mockapi.io/api/v1/user_post", option)
        .then(function(response) {
            return response.json();

        })
        .then(function(jsonData) {
            postJsondeatils = jsonData;
            displayPostDetails(nameEntered);

        });

}

buttonEl.onclick = function() {
    let nameEntered = nameEl.value;
    let passwordEntered = passwordEl.value;
    displayUserDetails(nameEntered, passwordEntered);


};