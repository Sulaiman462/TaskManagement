const forgetPass = document.getElementById('forgetPassword-form');
const emailInput = document.querySelector('#email');
console.log("JJ")
  
clickme.addEventListener('click' , sendEmail);

 function sendEmail(e){
    e.preventDefault();
    const UserObj = {
        email: emailInput.value
    }
    console.log(UserObj);


    axios.post('http://localhost:3000/password/forgotpassword' , UserObj)
    .then(res=>{
console.log(res)
    })
    .catch(err=>{
        console.log(err)
    })

}