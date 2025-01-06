

export default Login = defineStore ("login" , {
    state: () => ({
        count: 0,
        data: null,
      }),
    
      actions: {
        async post() {
            const [response, err] = await axios.post('http://localhost:3000/api/v1/user/sanpham', {
                email: this.e,
                password: this.p,
            });
            this.data = response.data;
            console.log('API call response:', response.data);      
        }
      }
})