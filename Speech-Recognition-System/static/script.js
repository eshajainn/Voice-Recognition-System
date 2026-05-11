// Upload WAV
function uploadAudio(){

let file=document.getElementById("audioFile").files[0]
let language=document.getElementById("language").value

if(!file){
alert("Upload WAV file")
return
}

let formData=new FormData()

formData.append("audio",file)
formData.append("language",language)

fetch("/transcribe",{
method:"POST",
body:formData
})
.then(res=>res.json())
.then(data=>{
document.getElementById("result").innerText=data.text
})

}


// MICROPHONE SPEECH

function startRecording(){

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

const recognition = new SpeechRecognition()

let language=document.getElementById("language").value

recognition.lang = language

recognition.start()

recognition.onresult = function(event){

let text = event.results[0][0].transcript

document.getElementById("result").innerText = text

}

}


// COPY RESULT

function copyText(){

let text=document.getElementById("result").innerText

navigator.clipboard.writeText(text)

alert("Copied!")

}


// TRANSLATE TEXT

async function translateText(){

let text=document.getElementById("result").innerText
let target=document.getElementById("translateLang").value

let url=`https://api.mymemory.translated.net/get?q=${text}&langpair=en|${target}`

let response=await fetch(url)

let data=await response.json()

document.getElementById("translation").innerText=data.responseData.translatedText

}


// TEXT TO SPEECH

function speakText(){

let text=document.getElementById("textInput").value

let language=document.getElementById("speechLang").value

let speech=new SpeechSynthesisUtterance(text)

speech.lang=language

window.speechSynthesis.speak(speech)

}