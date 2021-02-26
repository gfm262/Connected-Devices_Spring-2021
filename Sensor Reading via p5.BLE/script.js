const UUID = '19b10010-e8f2-537e-4f6c-d104768a1214'
let myBLE;
let myCharacteristic;
let myValue = 0;
let connectButton;
let connection = 0;
let myTimer = 500;
function setup(event) {

  myBLE = new p5ble();

  connectButton = document.getElementById('connectButton');
  connectButton.addEventListener('click', BLEconnect);

  // const connectButton = createButton('Connect to BLE');
  // connectButton.mousePressed(BLEconnect);
  let thisSpan = document.getElementById('reading');
  setInterval(function(){ thisSpan.innerHTML = myValue;
     if (connection >= 1 && myValue > 0){
    connectButton.value = "CONNECTED & READING SENSOR";
    if(myValue > 1 && myValue < 25) {
      document.body.style.background = '#fafa6e'
    } else if (myValue >= 26 && myValue <=50) {
      document.body.style.background = '#c4ec74'
    } else if (myValue >= 51 && myValue <=75) {
      document.body.style.background = '#92dc7e'
    } else if (myValue >= 76 && myValue <=100) {
      document.body.style.background = '#64c987'
    } else if (myValue >= 101 && myValue <=125) {
      document.body.style.background = '#39b48e'
    } else if (myValue >= 126 && myValue <=150) {
      document.body.style.background = '#089f8f'
    } else if (myValue >= 151 && myValue <=175) {
      document.body.style.background = '#00898a'
    } else if (myValue >= 176 && myValue <=200) {
      document.body.style.background = '#08737f'
    } else if (myValue >= 201 && myValue <=219) {
      document.body.style.background = '#215d6e'
    } else if (myValue > 220) {
      document.body.style.background = '#2a4858'
    }
    }})

  // if (myValue == null){
  //   thisSpan.innerHTML = myValue;
  // } else {

//}

}



// from https://itpnyu.github.io/p5ble-website/
// Connect to a BLE device by passing the service UUID

function BLEconnect() {
  myBLE.connect(UUID, gotCharacteristics);
  connection =+ 1;


}

function gotCharacteristics(error, characteristics) {
  if (error) console.log("Error: ", error);
  console.log("Charistaristics: ", characteristics);
  myCharacteristic = characteristics[0];
  // Read the value of the first characteristic
  myBLE.read(myCharacteristic, gotValue);
}

function gotValue(error, value) {
  if (error) console.log('error: ', error);
  console.log('value: ', value);
  myValue = value;
  //setInterval(function(){ myBLE.read(myCharacteristic, gotValue) }, myTimer)
  myBLE.read(myCharacteristic, gotValue);
  return myValue;
}

window.addEventListener('DOMContentLoaded', setup);
