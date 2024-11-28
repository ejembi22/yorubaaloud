function loginDetails(event) {
    event.preventDefault();
    let getLoginEmail = document.querySelector("#email").value;
    let getLoginPassword = document.querySelector("#password").value;
    const spin = document.getElementById("spinner")
  //   console.log(getLoginEmail);
  //   console.log(getLoginPassword);
  
  
  
   
  spin.style.display = "inline-block";
    if (getLoginEmail === "" || getLoginPassword === "") {
      Swal.fire({
        icon: "error",
        text: "Required to fill this field",
        confirmButtonColor: "#2d85de",
        customClass: {
            popup: 'custom-swal-popup' // Assign a custom class
        }
      });
    } else {
      let formData = new FormData();
      formData.append("email", getLoginEmail),
        formData.append("password", getLoginPassword);
  
      let requestOptions = {
        method: "post",
        body: formData,
      };
  
      fetch(
        "https://accosmart.com.ng/yorubalearning/api/admin_login",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
          localStorage.setItem("usersdetails", JSON.stringify(result))

         const x = JSON.parse(localStorage.getItem("usersdetails")) 
         console.log(x)
          // const y = JSON.parse(x)
          // console.log(y)
          
  
          if (x.hasOwnProperty("token")) {
            swal.fire({
              icon: "success",
              text: `Successful`,
              confirmButtonColor: "#2D85DE",
              customClass: {
                  popup: 'custom-swal-popup' // Assign a custom class
              }
          
            });
            spin.style.display = "none";
            setTimeout(() => {
            location.href="./dashboard.html"
          }, 1000)
           
          } else {
            swal.fire({
              icon: "error",
              text: result.message,
              confirmButtonColor: "#2D85DE",
              customClass: {
                popup: 'custom-swal-popup' // Assign a custom class
            }
            });
          }
        })
        .catch((error) => console.log("error", error));
    }

  
    
  }
  
  function Signup(event) {
    event.preventDefault();
  
    let getName = document.querySelector("#fullname").value;
    console.log(getName);
    let getEmail = document.querySelector("#emailaddress").value;
    console.log(getEmail);
    let getPassword = document.querySelector("#createpassword").value;
    console.log(getPassword);
    let getConfirmPassword = document.querySelector(
      "#createconfirmpassword"
    ).value;
    console.log(getConfirmPassword);
  
    if (
      getName === "" ||
      getEmail === "" ||
      getPassword === "" ||
      getConfirmPassword === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Required to fill out all fields!",
        customClass: {
            popup: 'custom-swal-popup' // Assign a custom class
        }
      });
    } else if (getPassword.length < 6) {
      Swal.fire("Password is too short");
      
    } else if (getConfirmPassword == !getPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password does not match",
        customClass: {
            popup: 'custom-swal-popup' // Assign a custom class
        }
      });
    } else {
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      let formData = new FormData();
      formData.append("name", getName);
      formData.append("email", getEmail);
      formData.append("password", getPassword);
      formData.append("password_confirmation", getConfirmPassword);
  
      let requestOptions = {
        method: "post",
        body: formData,
      };
  
      fetch(
        "https://accosmart.com.ng/yorubalearning/api/register_admin",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          console.log(result);
  
          if (result.status === "success") {
            swal.fire({
              icon: "success",
              text: "User Created Successfully",
              confirmButtonColor: "#2D85DE",
              customClass: {
                  popup: 'custom-swal-popup' // Assign a custom class
              }
            });
            location.href="./dashboard.html"
          } else {
            swal.fire({
              icon: "error",
              text: "There was a problem with your sign-up",
              confirmButtonColor: "#2D85DE",
              customClass: {
                popup: 'custom-swal-popup' // Assign a custom class
            }
            });
          }
        })
  
        .catch((error) => console.log("error", error));
    }
  }
  
  
  
  
  
    function logout(){
      localStorage.clear()
      Swal.fire({
          title: 'Logged Out',
          text: 'You have logged out successfully!',
          icon: 'success',
          confirmButtonText: 'OK',
          customClass: {
              popup: 'custom-swal-popup' // Assign a custom class
          }
  
      }).then (() =>{
      setTimeout(()=>{
          window.location.href ="index.html";
      }, 2000)
  })
  
    }
    


// Dashboard js

document.getElementById('toggle').addEventListener('click', function() {
    const dashboard = document.getElementById('dashboard');
    dashboard.classList.toggle('collapsed');
   

});

// update admin password
function updatePassword(event) {
  event.preventDefault()
const token = localStorage.getItem('token')
let getCurrentemail = document.querySelector('#currentemail').value;
let getUpdatepassword = document.querySelector('#updatepassword').value;
let getUpdateconfirmpassword = document.querySelector('#updateconfirmpassword').value;


if (getCurrentemail === "" || getUpdatepassword === "" || getUpdateconfirmpassword === ""){
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Required to fill out all fields!",
    customClass: {
        popup: 'custom-swal-popup' // Assign a custom class
    }
  });
  
}else if (getUpdatepassword.length < 6){
  Swal.fire("Password is too short");

}else if (getUpdateconfirmpassword == !getUpdatepassword){
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: "Password does not match",
    customClass: {
        popup: 'custom-swal-popup' // Assign a custom class
    }
  });
} else{

// let myHeaders = new Headers();
//       myHeaders.append("Content-Type", "application/json");



let formData = new FormData ();
formData.append("email", getCurrentemail),
formData.append("password", getUpdatepassword),
formData.append("password_confirmation", getUpdateconfirmpassword);

let requestOptions = {
  method: 'post',
  headers:{
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${token}`
  },
  body: formData
}

fetch("https://accosmart.com.ng/yorubalearning/api/admin/admin_update", requestOptions)
.then((response)=> response.json())
.then((result)=>{
  console.log(result)
})


.catch((error) =>("error", error))
}

}
