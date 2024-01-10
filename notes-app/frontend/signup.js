
function toggleForms() {
  var loginForm = document.getElementById('loginForm');
  var signupForm = document.getElementById('signupForm');

  loginForm.style.display = loginForm.style.display === 'none' ? 'block' : 'none';
  signupForm.style.display = signupForm.style.display === 'none' ? 'block' : 'none';
}

// Registration

// const registerUser=()=>{
//     fetch("https://handsome-ray-fatigues.cyclic.app/user/register",{
//         method:"POST",
//         headers:{
//             "Content-type":"application/json"
//         },
//         body:JSON.stringify({
//             name:document.getElementById("sname").value,
//             email:document.getElementById("semail").value,
//             pass:document.getElementById("spass").value
//         })
//     }).then(res=>res.json())
//     .then(data=>console.log(data))
//     .catch(err=>console.log(err))
// }
