const app = new Vue({
  el: '#app',
  data: {
    userId: '',
    text: '',
    jobId: '',
    title: 'Chat: Job Id',
    userType: '',
    messages: [],
    socket: null,
  },
  methods: {
    sendMessage() {
      if (this.validateInput()) {
        const message = {
          userId: this.userId,
          text: this.text,
          jobId: this.jobId,
          userType: this.userType,
        };
        this.socket.emit('msgToServer', message);
        this.text = '';
      }
    },

    requestHistoric() {
      if (this.jobId) {
        this.socket.emit('getHistorical', this.jobId);
      } else {
        alert('Input jobId is empty');
      }
    },
    receivedHistorical(messages) {
      this.messages = [...messages];
    },
    receivedMessage(message) {
      if (this.jobId === message.jobId) {
        this.messages.push(message);
      }
    },
    validateInput() {
      return this.userId.length > 0 && this.text.length > 0;
    },
  },

  created() {
    this.socket = io('http://localhost:3000');
    this.socket.on('msgToClient', message => {
      this.receivedMessage(message);
    });
    this.socket.on('historicalChat', message => {
      this.receivedHistorical(message);
    });
  },
});
