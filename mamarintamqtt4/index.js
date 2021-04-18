var client  = mqtt.connect('wss://test.mosquitto.org:8081/mqtt')

var topic = $('#input-topic').val();
var payload = $('#input-payload').val();
var date = new Date()

client.on('message', function (topic, payload) {
  // message is Buffer
  console.log("Payload: "+payload.toString())
  $('#bg1').hide()
  $('#msg').append('<tr><td>' + topic + '</td><td>' + payload + '</td> <td>' + date.toDateString() + date.toLocaleTimeString() +'</td></tr>')});

$(document).ready(function(){
  $('#btn-connect').on('click',() => {
    $('#status').val('Connecting...')
    client.on('connect', function () {
      console.log('connected')
      $('#status').val('Connected')
    })    

    $('#btn-pub').on('click', () => {
      client.publish($('#input-topic').val(),$('#input-payload').val())
      $('#bg2').hide()
      $('#pub').append('<tr><td>' + $('#input-topic').val() + '</td><td>' + $('#input-payload').val() + '</td> <td>' + date.toDateString() + date.toLocaleTimeString() +'</td></tr>')
    })

    $('#btn-sub').on('click', () => {
      client.subscribe($('#input-subtopic').val())
      console.log("Subscribe to Topic: "+ $('#input-subtopic').val());
      $('#bg3').hide()
      $('#sub').append('<tr><td>'+ $('#input-subtopic').val() +'</td><td>' + date.toDateString() + date.toLocaleTimeString() + '</td></tr>')
    })
   })
 })