var emojis = '😀 😁 😂 🤣 😃 😄 😅 😆 😉 😊 😋 😎 😍 😘 🥰 😗 😙 😚 ☺️ 🙂 🤗 🤩 🤔 🤨 😐 😑 😶 🙄 😏 😣 😥 😮 🤐 😯 😪 😫 😴 😌 😛 😜 😝 🤤 😒 😓 😔 😕 🙃 🤑 😲 ☹️ 🙁 😖 😞 😟 😤 😢 😭 😦 😧 😨 😩 🤯 😬 😰 😱 🥵 🥶 😳 🤪 😵 😡 😠 🤬 😷 🤒 🤕 🤢 🤮 🤧 😇 🤠 🤡 🥳 🥴 🥺 🤥 🤫 🤭 🧐 🤓 😈 👿 👹 👺 💀 👻 👽 🤖 💩 😺 😸 😹 😻 😼 😽 🙀 😿 😾';
var emoji = emojis.split(' ');
console.log(emoji[1]);
var editableArea = $('#pesan');
var slempitan, selection;
var range = 0;
editableArea.on('keyup mouseup', function() {
  selection = window.getSelection();
  slempitan = selection.focusOffset;
  range = selection.getRangeAt(0)
});
    for (var i = 0; i < emoji.length; i++) {
      $('#emojisbtn').append('<input type="button" class="emojibtn" id="aba'+i+'" value="'+emoji[i]+'">')
      $('#aba'+i).click(function(){
        var pet = $(this).val();
        var span = document.createTextNode(pet);
        range.insertNode(span);
      });

    }
$(function() {
  $(document).click(function(e) {
    console.log(e.target.className);
    if ( e.target.id == 'emojisbtn' || e.target.id == 'titleemoji' || e.target.className == "emojibtn" || e.target.id == 'menuemoji') {
        $('#menuemoji').show()
        console.log('how')
    }else if(e.target.id == 'emoji' || e.target.className == "far fa-grin"){
      $('#menuemoji').toggle()
    } else {
        $('#menuemoji').hide()
    }
  })
})
//sticker
