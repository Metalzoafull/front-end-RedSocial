module.exports = function (io) {
    //console.log("user");

    let users = {};


    io.on('connection', socket => {

        if(socket.request.user){
            let userName = socket.request.user.email;
            socket.nickname = userName;
            //nickNames.push(socket.nickname);
            users[socket.nickname] = socket;
            //console.log("nuevo usuario conectado");
            //io.sockets.emit('usernames', nickNames);
            updateNickNames();


            //console.log(socket.request.user);
        };

        socket.on('send message', function (data, cb){

            var msg = data.trim();

            if (msg.substr(0, 3) === '/w '){
                msg = msg.substr(3);
                const index = msg.indexOf(' ');
                if (index !== -1) {
                    var name = msg.substring(0, index);
                    var msg = msg.substring(index + 1);
                    if (name in users) {
                        users[name].emit('whisper', {
                            msg,
                            nick: socket.nickname
                        });
                        
                    } else {
                        cb('Error! Please enter a valid user');
                    }
                    
                } else {
                    cb('Error! Pease enter your message');
                }
            } else {
                io.sockets.emit('new message', {nick: socket.nickname, msg: data});
            }

            
        });

        socket.on('disconnect', data =>{
            if(!socket.nickname) return;
            //nickNames.splice(nickNames.indexOf(socket.nickname), 1);
            delete users[socket.nickname];
            updateNickNames();

        });
        


        function updateNickNames() {
            io.sockets.emit('usernames', Object.keys(users));
            
        }

        /*socket.on('join', function(data) {
            console.log(data);
        })*/

        //console.log("aqui empieza");

        
    });
    
}