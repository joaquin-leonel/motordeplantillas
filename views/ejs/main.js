const socket = io.connect();

let date = new Date();

const horario = date.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true })
const day=`${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;



function render(data) {
    const html = data.map((elem, index) => {
        return(`<div class="msgContenedor">
            <strong class="userTitle">${elem.author}</strong>:
            <em class="messageStyle">${elem.text}</em> 
            <em class="timeStyle">[${horario} ${day}]</em>
            </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) { render(data); });


function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    document.getElementById("texto").value = "";
    document.getElementById("namebox").style.display = "none";
    return false;
}

