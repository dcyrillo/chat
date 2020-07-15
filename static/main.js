const app = new Vue({
    el: '#app',
    data: {
     userId: '',
     text: '',
     jobId:'',
     title: 'Chat: Job Id',
     userType:'',
     messages: [],
     socket: null
    },
    methods: {
     sendMessage() {
      if(this.validateInput()) {
       const message = {
       userId: this.userId,
       text: this.text,
       jobId:this.jobId,
       userType:this.userType
      }
      const msg= {
        userId: '333', text: 'iu', jobId: 'eee', userType: 'customer'
      }
      this.socket.emit('historic',msg)
      this.socket.emit('msgToServer', message)
      this.text = ''
     }
    },
    receivedMessage(message) {
     this.messages.push(message)
    },
    validateInput() {
     return this.userId.length > 0 && this.text.length > 0
    }
   },
    created() {
     this.socket = io('http://localhost:3000')
     this.socket.on('historic', (message) => {
        this.receivedMessage(message)
       })
     this.socket.on('msgToClient', (message) => {
      this.receivedMessage(message)
     })
    }
   })