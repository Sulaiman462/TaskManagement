const form = document.getElementById('click')
const nameInput=document.getElementById('name')
const emailInput=document.getElementById('email')

const phoneInput=document.getElementById('phone')
const ageInput=document.getElementById('age')
const genderInput=document.getElementById('gender')

const passwordInput=document.getElementById('pas')

form.addEventListener('click' ,signup )

async function signup(e){

    e.preventDefault()
    const obj={

        name: nameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        age: ageInput.value,
        gender: genderInput.value,
        password: passwordInput.value
        
        }
        try{
            console.log("K")
       axios.post('http://localhost:3000/signup' ,obj)
       .then((response)=>{
        if (response.status === 201){
            console.log('success');
            alert('Signup sucessfull')
            window.location.href="../Login/login.html"
             }
             else{
            passwordInput.value='';
            console.log('bye')
        }
       })
       .catch((err)=>{
        console.log(err)

       })

       
        }


        catch(err){
            if(err.response.status == 409){
                alert('user already exist')
               }
        }
    
}