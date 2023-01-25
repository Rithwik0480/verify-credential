import swal from 'sweetalert'
import { handleVerify } from './App'

window.addEventListener('DOMContentLoaded', (event) => {

const dragArea = document.querySelector('.drag-area')
const dragText = document.querySelector('.drop-header')
const copyText = document.querySelector('.copy')

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
    dragArea.style.removeProperty("display")

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
    var dragArea = document.querySelector(".drag-area")
    var range = document.createRange()
    range.selectNode(dragArea)
    window.getSelection().addRange(range)
    document.execCommand("copy")
    window.getSelection().removeAllRanges()
    
    copyText.className="fa-solid fa-copy copy"
    setTimeout(function() {
        copyText.className="fa-regular fa-copy copy"
        }, 1000)

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
            app.handleVerify(fileData)
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
});
