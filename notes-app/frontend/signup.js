
function toggleForms() {
  var loginForm = document.getElementById('loginForm');
  var signupForm = document.getElementById('signupForm');

  loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
  signupForm.style.display = signupForm.style.display === 'none' ? 'block' : 'none';
}

// Registration

const form = document.getElementById("formm");
    form.addEventListener("submit",(e)=>{
        e.preventDefault();
    })
    const registerUser=()=>{
    
    fetch("https://handsome-ray-fatigues.cyclic.app/user/register",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            name:document.getElementById("sname").value,
            email:document.getElementById("semail").value,
            pass:document.getElementById("spass").value
        })
    }).then((res) => res.json())
    .then((data) => {
      console.log(data);
      localStorage.setItem('user', JSON.stringify(data.user.name));
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    })
    .catch((err) => console.log(err));
}


// Login
const loginForm = document.getElementById("loginForm");
loginForm.addEventListener("submit",(e)=>{
        e.preventDefault();
    })
    const loginUser = () => {
        fetch("https://handsome-ray-fatigues.cyclic.app/user/login", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            email: document.getElementById("lemail").value,
            pass: document.getElementById("lpass").value,
            
          }),

        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            localStorage.setItem("token",data.token)
            localStorage.setItem('user', JSON.stringify(data.user.name));
            setTimeout(() => {
              window.location.href = "index.html";

            }, 2000);
          })
          .catch((err) => console.log(err));
      };

    //   Displaying notes
    