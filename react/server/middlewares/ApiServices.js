

  export  async  function getImages(){
    fetch('http://localhost:5000/api/customers')
    .then(res => res.json())
    .then(imgs => this.setState({imgs}, () => console.log('images fetched...', imgs)));
    console.log(imgs);
 }
