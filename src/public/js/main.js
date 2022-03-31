//const log = document.getElementById('bienvenida');
const users = document.getElementById('usernames');
const chatForm = document.getElementById('message-form');
let message = document.getElementById('message');
const chat = document.getElementById('chat');

const socket = io();

chatForm.addEventListener('submit', e => {
    e.preventDefault();
    console.log("por ahora anda bien", message.value)
    //let msg = e//.target.elements.msg.value;
    //console.log(message.value);
    socket.emit('send message', message.value, data => {
        console.log("llega")
        var error = document.createElement('p');
        error.className = 'error';
        error.style.color = 'red';
        error.innerHTML = data;
        chat.appendChild(error);
    })
    message.value = " ";
});

socket.on('new message', function (data) {
    const div = document.createElement('div');
    const b = document.createElement('b');
    const contenedor = document.createElement('div');
    //console.log(data.nick);
    b.innerHTML = data.nick + ":";
    //b.className = 'col clearfix';
    //div.appendChild(`<p class="p-2 bg-secondary w-75 animate__animated animate__backInUp"><b>${data.nick}</b>: ${data.msg}</p>`);
    div.appendChild(b);
    div.innerHTML += data.msg;
    //div.className = 'col clearfix';
    //chat.appendChild(b);
    //contenedor.appendChild(b);
    contenedor.appendChild(div);
    contenedor.className = 'row';
    chat.appendChild(contenedor);

});


socket.on('usernames', data => {
    if (users.firstChild) {
        users.removeChild(users.firstChild);
        //console.log("elimino", contenedor);
    };
    //console.log(data);
    //console.log(data[0]);
    //let html = '';
    //let i = document.createElement("i");
    //i.innerHTML = data[0];
    //users.appendChild(i);
    //i.className = "fas fa-user"
    let contenedor = document.createElement("p");
    for (let i = 0; i < data.length; i++) {
        //console.log(data[i])
        let p = document.createElement("p");
        let icon = document.createElement("i");
        icon.className = "fas fa-user";
        p.appendChild(icon);
        //p.appendChild(icon);
        p.innerHTML += data[i];
        //contenedor.appendChild(icon);
        contenedor.appendChild(p);
        
        
        //html += "<p><i class=\"fas fa-user\"></i> ".concat(data[i],"</p>");
        
    }
    users.appendChild(contenedor);
    //users.appendChild(i);
})


socket.on('whisper', data => {
    const nick = document.createElement('b');
    const msg = document.createElement('p');
    nick.innerHTML = data.nick + ': ';
    msg.appendChild(nick);
    msg.innerHTML += data.msg;
    msg.className = 'whisper';
    chat.appendChild(msg);
});

/**
 * var app = {


    welcome: function(){
        var socket = io('roberto', { transports: ['websocket'] });

        socket.on('connect', () =>{
            console.log(socket);
            socket.emit('join', {hola: "hola"});
        });

    }
}
 */


//log.addEventListener('open', e => {
//    console.log("hola");
//    socket.emit('inicio secion' , 4);
//});

//socket.on
//console.log(socket);