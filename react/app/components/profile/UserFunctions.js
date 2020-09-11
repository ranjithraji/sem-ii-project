import axios from 'axios'

export const register = newUser => {
  return axios
    .post('http://localhost:5000/user/register', {
      name: newUser.name,
      phone: newUser.phone,
      email: newUser.email,
      password: newUser.password
    })
    .then(response => {
      if (response.data.message == "ok") {
        return response.data.data
      }
      else {
        alert(response.data.message)
      }
    })
}
export const update = updateUser => {
  return axios
    .put('http://localhost:5000/user/update', {
      name: updateUser.name,
      phone: updateUser.phone,
      email: updateUser.email,
      first_name: updateUser.first_name,
      last_name: updateUser.last_name,
      location: updateUser.location,
      token: updateUser.token
    })
    .then(response => {
      if (response.data.message == "ok") {
        alert('updated your profile')
        return response.data.data
      }
      else {
        alert(response.data.message)
      }
    })
    .catch(err => {
      console.log(err)
    })
}


export const login = user => {
  return axios
    .post('http://localhost:5000/user/login', {
      email: user.email,
      password: user.password
    })
    .then(response => {
      if (response.data.message == "hi") {
        localStorage.setItem('usertoken', response.data.data)
        return response.data
      }
      else {
        return alert('plz check your email or password')
      }
    })
    .catch(err => {
      console.log(err)
    })
}

export const getProfile = user => {
  return axios
    .get('http://localhost:5000/user/profile', {
      headers: { Authorization: ` ${this.getToken()}` }
    })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
    })
}

// export const product =productMe=>{
//   return axios
//   .get('http://localhost:5000/pro/productFind',{
//       size:productMe.size,
//       price:productMe.price,
//       brand:productMe.brand,
//       color:productMe.color
//   }).then(response=> {
//     console.log(response.data)
//     return response.data
//   }).catch(err=>{
//     console.log(err)
//   })
// }