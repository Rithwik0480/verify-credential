import React, {useState, useRef, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import swal from 'sweetalert'
import style from './style.css'
import drop from './drop'
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
        if(data.signature.verified === true)
            count++
        if(data.stream.verified === true)
            count++
        if(data.digest.verified === true)
            count++
        if(count === 3){
            swal({
                title: "Verified!",
                text: "This credential has been verified",
                icon: "success",
            })
        }
        else{
            swal({
                title: "Not verified!",
                text: "This credential has not been verified",
                icon: "error",
            })
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

let button = document.querySelector('#upload-btn')
let input = document.querySelector('#input-file')
let file

//file is pasted
dragArea.addEventListener('paste', (event) => {
    let paste = (event.clipboardData || window.clipboardData).getData('text')
    let formatted = JSON.stringify(JSON.parse(paste), null, 4)            
    let pTag = `"${formatted}"`
    handleVerify(formatted)
    dragText.textContent = pTag

})
// file is inside drop area
dragArea.addEventListener('dragover', (event) => {
    event.preventDefault()
    dragText.textContent = 'Release to Upload'
    dragArea.classList.add('active')
})

// file leaves the drag area
dragArea.addEventListener('dragleave', ()=> {
    dragText.textContent = 'Drag & Drop JSON'
    dragArea.classList.remove('active')
})

// file is dropped
dragArea.addEventListener('drop', (event)=> {
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
  })
 
// file is deleted
bin.addEventListener("click", function() {
  let dragArea = document.querySelector(".drag-area")
  dragArea.textContent=null
  dragArea.classList.remove('active')
})


function readFile() {
    let fileType = file.type

    let validExtention = ['application/json']

    if(validExtention.includes(fileType)){
        let fileReader = new FileReader()

        fileReader.onload = () => {
            let fileData = fileReader.result
            handleVerify(fileData)
            let formatted = JSON.stringify(JSON.parse(fileData), null, 4)            
            let pTag = `"${formatted}"`
            dragText.textContent = pTag

            dragArea.style.removeProperty("display")
            handleVerify(fileData)
        }
        fileReader.readAsText(file)
    }else {
        dragText.textContent = 'Drag & Drop JSON'
        dragArea.classList.remove('active')
        swal({title:'The file is not a JSON',
              text: 'Make sure the file has a ".json" extention.',
              icon:'warning'})
    }
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
          {/* <h1 className='heading'>Verify Credential</h1> */}
        </div>
        <div className='bottom-contents'> 
          <div className='outer-area'>
            <div className='col-md-12 d-flex'>
              <div className='col-md-8'>
                <p className='outer-text pe-none'>Drag & Drop JSON</p>
              </div>
              <div className='col-md-4'>
                <i className="fa-regular fa-copy copy icons" title="copy"></i>
                <i class="fa-regular fa-trash-can bin icons"></i>
              </div>
               </div>          
              <div className='drag-area' contentEditable='true'> 
              <p className='drop-header' contentEditable="false"></p>  
            </div>
          </div>
        </div>
      </div>  
    </div>
     ) 
}

export default App