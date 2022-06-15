const socket = io('ws://localhost:3000');

let send = document.querySelector('.send');
let chat = document.querySelector('.chat .center');

send.addEventListener('click' , () => {
    let writer = document.querySelector('.writer');
    let message = writer.value;
    socket.emit('message', message);
    writer.value = '';
    // sendMessage('teacher', message);
});

socket.on("connect", () => {
    console.log(socket.id);
    socket.emit('id', socket.id);
    socket.on('answer', (msg) => {
      let { user, message } = msg;
      console.log(msg);
      sendMessage(user.permission, message);
    });
});

function sendMessage(person, message) {
  chat.innerHTML += `
        <div class="content ${person == 'teacher' ? 'right' : 'left'}">
            <div class="avatar">
              <div class="teacher-image"><img class="image123" src="img/input2.png" alt=""></div>
            </div>
            <div class="wrapper">
              <div class="message">
                <p class="message-text">${message}</p>
                <time class="message-time">${new Date().getHours()} : ${new Date().getMinutes()}</time>
              </div>
            </div>
        </div>
    `
}