import React, {useState, useRef, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import swal from 'sweetalert'
import style from './style.css'
import { render } from '@testing-library/react'

export function handleVerify(data) {
  
  const url = "https://agent.demo.dhiway.com/api/v1/verify"
  const credential = data

  try{
    let vcCheck ={
      "vc": JSON.parse(credential)
    }
    const response = fetch(url, {
      credentials: "include",
      method:  'POST', 
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(vcCheck),
      })
      .then(function(response){ 
        return response.json()})
      .then(function(data){
        let count = 0
        let sign=document.querySelector(".sign")
        let stream=document.querySelector(".stream")
        let digest=document.querySelector(".digest")
        let verify=document.querySelector(".verify-svg")

        if(data.signature.verified === true){
          sign.src="success.svg"
        }
        else{
          count++
          sign.src="error.svg"

          let txt = document.querySelector(".sign-body")
          txt.style.color="red"
        }

        if(data.stream.verified === true){
          stream.src="success.svg"
        }
        else{
          count++
          stream.src="error.svg"

          let txt = document.querySelector(".stream-body")
          txt.style.color="red"
        }
        
        if(data.digest.verified === true){
          digest.src="success.svg"
        }
        else{
          count++
          digest.src="error.svg"

          let txt = document.querySelector(".digest-body")
          txt.style.color="red"
        }

        if(count>0){
          verify.src="err-header.svg"
        }else {
          verify.src="verified.svg"
        }

    })
}
catch(error){
    // swal("Please make sure that you enter the VC in the correct format")
}
  }
function App() {
useEffect(()=> {

const dragArea = document.querySelector('.drag-area')
const dragText = document.querySelector('.drop-header')
const copyText = document.querySelector('.copy')
const bin      = document.querySelector('.bin')
const dragStatus = document.querySelector('.drag-status')
const verification = document.getElementById("verification")
const signBody = document.querySelector('.sign-body')
const streamBody = document.querySelector('.stream-body')
const digestBody= document.querySelector('.digest-body')
const verifyArea = document.querySelector('.verify-area')
let file;

function isJsonString(str) {
  try {
      JSON.parse(str);
  } catch (e) {
      return false;
  }
  return true;
}

//file is pasted
dragArea.addEventListener('paste', (event) => {
    let paste = (event.clipboardData || window.clipboardData).getData('text')
    if(isJsonString(paste)){
      let formatted = JSON.stringify(JSON.parse(paste), null, 4)             
      let pTag = `${formatted}`
      handleVerify(formatted)
      dragText.textContent = pTag;
      bin.style = 'display: block';
      copyText.style = 'display: block'
      verification.hidden = false;
    }
    else{
      swal({
        title: "Not JSON!",
        text: "Make sure the credential is in JSON",
        icon: "warning",
      })
        event.preventDefault()
    }
  
})
if(dragText.textContent==""){
    bin.style = 'display: none';
    copyText.style = 'display: none'
}
// file is inside
dragArea.addEventListener('dragover', (event) => {
    event.preventDefault()
    // dragStatus.textContent = 'Release to Upload'
})

// file leaves
dragArea.addEventListener('dragleave', ()=> {
  // dragStatus.textContent = null
})

// file is dropped
dragArea.addEventListener('drop', (event)=> {
    event.preventDefault()

    file = event.dataTransfer.files[0]
    readFile()
})
verifyArea.addEventListener('drop', (event)=> {
  event.preventDefault()
  file = event.dataTransfer.files[0]
  readFile()
})

// file is copied
copyText.addEventListener("click", function() {
    let dragArea = document.querySelector(".drag-area")
    let range = document.createRange()
    range.selectNode(dragArea)
    window.getSelection().addRange(range)
    document.execCommand("copy")
    window.getSelection().removeAllRanges()
    
    copyText.className="fa-solid fa-copy icons"
    setTimeout(function() {
        copyText.className="fa-regular fa-copy icons"
        }, 1000)
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  })
 
// file is deleted
bin.addEventListener("click", function() {
  // dragArea.textContent  = ""
  window.location.reload()
  dragArea.classList.remove('active')
  bin.style = 'display: none'
  copyText.style = 'display: none'
  verification.hidden=true
})


function readFile() {
    let fileType = file.type
    let validExtention = ['application/json']

    if(validExtention.includes(fileType)){
        let fileReader = new FileReader()

        fileReader.onload = () => {
            let fileData = fileReader.result
            let formatted = JSON.stringify(JSON.parse(fileData), null, 4)            
            let pTag = `${formatted}`
            dragText.textContent = pTag
            bin.style = 'display: block'
            copyText.style = 'display: block'
            dragArea.style.removeProperty("display")
            verification.hidden = false;
            setTimeout(()=>{handleVerify(fileData)},200)
            
        }
        fileReader.readAsText(file)

    }else {
        // dragStatus.textContent = 'Drag & Drop JSON'
        dragArea.classList.remove('active')
        swal({title:'The file is not a JSON',
              text: 'Make sure the file has a ".json" extention.',
              icon:'warning'})
    }
}

//verified results
signBody.addEventListener('click',()=> {
  selection("proof",600)
})

streamBody.addEventListener('click',()=> {
  selection("CordStreamSignature2020",400)
})

digestBody.addEventListener('click', ()=> {
  selection("CordCredentialDigest2020",870)
})

function selection(targetWord,index){  

let string = dragText.textContent
let obj = JSON.parse(string);
let proof = obj.proof[0];
let highlightedProof = `<mark>${JSON.stringify(proof, null, 4)}</mark>`;
let modProof=JSON.stringify(proof, null, 4)

const text = dragText.innerHTML
const modifiedText = text.replace(modProof, highlightedProof)

console.log(modProof)
console.log(highlightedProof)

dragText.innerHTML=modifiedText
let position = dragText.innerHTML.indexOf(targetWord)
dragArea.scrollTop = position-index

}

})
  return (
    <div className='f-screen'>
      <div>
      <img className='p-3' src='Group 6685.svg' />
      <a href='https://cord.network/' className='links p-3'>About CORD</a>
      <a href='https://dhiway.com/markstudio/' className='links p-3'>About #Mark Studio</a>
      </div>
      <div>
        <div className='vc-img col-md-12'>
          <img className='heading' src='vc.svg'></img>
        </div>
        <div className='bottom-contents'> 
          <div className='outer-area'>
            <div className='col-md-12 d-flex'>
              <div className='col-md-12 position-relative'>
                <p className='outer-text pe-none'>Copy paste or Drag & drop JSON</p>
                <div className="action-buttons">
                  {/* <i className="fa-regular fa-copy copy icons" title="copy"></i> */}
                  <i class="fa-regular fa-trash-can bin icons"></i>
                </div>
              </div>
            </div> 

            <div className='inner-area'>
              <div className='drag-area' contentEditable='true'> 
              <i className="fa-regular fa-copy copy icons" title="copy"></i>
                <pre className='drop-header'>
                  <p className='drag-status'></p>
                </pre>  
              </div>
              <div className='verify-area'>
              <div id='verification' hidden>
                <div className='col-md-12 verify-header'>
                  <img src='load.svg' className='verify-svg'></img>
                </div>
                <div className='verify-body'>
                  <img className='success-svg sign'src='load.svg'></img>
                  <div className='sign-body'>
                  <p>Author Signature</p>
                  </div>
                </div>
                <br></br>
                <div className='verify-body'>
                  <img className='success-svg stream'src='load.svg'></img>
                  <div className='stream-body'>
                  <p>State</p>
                  </div>
                </div>
                <br></br>
                <div className='verify-body'>
                  <img className='success-svg digest'src='load.svg'></img>
                  <div className='digest-body'>
                  <p>Hash/Digest</p>
                  </div>
                </div>
              </div>                
              </div>
            </div>

          </div>
        </div>
      </div>  
      <div id="snackbar">Copied to clipboard</div>
    </div>
     ) 
}

export default App