const formPesan = document.getElementById('action');
const formUser = $('#actionUserSec');
const userInput = $('#userName');
const errUser = $('#err');
const input = document.getElementById('pesan');
const container = document.getElementById('container')
const socket = io('https://fzchatapp.herokuapp.com/');
function send(){
  waktunya();
  const isipesan = input.textContent.trim();
  console.log(isipesan);
  if (isipesan !== ''  && username !== undefined) {
    socket.emit('kirimed', nl2br(escapeHtml(isipesan)));
    console.log(username);
  }else{
    console.log('err');
  }
  input.textContent = '';
}
socket.on('chat-msg', function(data){
  console.log(data);
});
socket.on('connect', function(){
  socket.emit('join', '');
  console.log();
});
socket.on('mengetik', function(data){
  const type = document.getElementById('typing');
  type.innerHTML = data;
});
var myuser;
var username;
formUser.submit(function(e){
  e.preventDefault();
  username = userInput.val();
  if (username == '') {
    errUser.html('itu diisi dulu lah bgst');
  }else{
    socket.emit('useradded', escapeHtml(username));
    userInput.val('');
    $('.userSec').hide();
    $('.mainChat').show();
    socket.on('connected', function(d){
      myuser = d.id;
      $('#container').append('<div class="join">'+d.user + ' has joined the chat</div>');
    });
  }
});
formPesan.addEventListener('submit', function(e){
  e.preventDefault();
  send();
});
function getCaret(el) {
    if (el.selectionStart) {
        return el.selectionStart;
    } else if (document.selection) {
        el.focus();
        var r = document.selection.createRange();
        if (r == null) {
            return 0;
        }
        var re = el.createTextRange(), rc = re.duplicate();
        re.moveToBookmark(r.getBookmark());
        rc.setEndPoint('EndToStart', re);
        return rc.text.length;
    }
    return 0;
}
function nl2br (str, is_xhtml) {
    if (typeof str === 'undefined' || str === null) {
        return '';
    }
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}
var timeout;
var typing = false;
function waktunya() {
  typing = false;
  socket.emit('typing', {typing:false});
}
$('#pesan').keypress(function(event){
  if (event.which == 13 && event.shiftKey === false) {
    send();
    return false;
  }
  if (event.which !== 13) {
    typing = true
    socket.emit('typing', {user:username, typing:true});
    clearTimeout(timeout)
    timeout=setTimeout(waktunya, 5000)
  }else{
    waktunya();
  }
});
socket.on('tampilTyping', data =>{
  if (data.typing == true) {
    $('#typing').html(`<div class='type'>${data.user} <img src="https://tagy.io/images/Landing_page/tenor.gif"></div>`);
  }else{
    $('#typing').html('');
  }
});
socket.on('kirimed', function(data){
  console.log(data.id + '|' + myuser);
  if (data.name == undefined) {
    $('#container').append("<div class='"+ data.class +" radius'>" + data.msg + "</div>");
  }
  if (data.name) {
    $('#container').append("<div class='"+ data.class +" radius'>" + "<div class='name'>" +data.name + ' </div> ' + data.msg +"</div>");
  }
    $('#container')[0].scrollTop = $('#container')[0].scrollHeight;
});
$('#pesan').focus(function(){

})
function escapeHtml(text) {
  var map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };

  return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
