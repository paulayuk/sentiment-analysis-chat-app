let socket;

function init () {
 socket = io.connect("http://localhost:3000");
  $('form').submit(function(e){
      e.preventDefault(); // prevents page reloading
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });

  socket.on('chat message', function(data){
      var popupNotification = $("#popupNotification").kendoNotification().data("kendoNotification");
      if(data.sentiment.tone === "positive" || data.sentiment.tone === "neutral"){
          popupNotification.show("You are very nice");              		
      }else {
      	  popupNotification.show("Please be nice next time!");
      }

      $('#messages').append($('<li>').text(data.msg));

    });
}
    
$(init);

