
const form=document.getElementById('login')

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('pas');




form.addEventListener('click',login)

function login(e){
    e.preventDefault();

    const obj={
        email:emailInput.value,
        password:passwordInput.value
    }
    

    axios.post('http://localhost:3000/login',obj)

    .then(res=>{
        console.log(res.data,">>>>>>>>>>>>>>>")
            console.log("login success")
            if(res.status === 200){
                alert("User login sucessful")

                localStorage.setItem('token',res.data.token)
                window.location.href = '../Projects/task.html'
            }else{
                console.log('error')
            }
    })
    .catch(err=>{
console.log(err)
    })
}