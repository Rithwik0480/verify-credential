import swal from 'sweetalert';
import { handleVerify } from './App';

window.addEventListener('DOMContentLoaded', (event) => {

const dragArea = document.querySelector('.drag-area')
const dragText = document.querySelector('.drop-header')

let button = document.querySelector('#upload-btn')
let input = document.querySelector('#input-file')
let file;

dragArea.addEventListener('paste', (event) => {
    let paste = (event.clipboardData || window.clipboardData).getData('text')
    let formatted = JSON.stringify(JSON.parse(paste), null, 4)            
    let pTag = `"${formatted}"`
    handleVerify(formatted)
    dragText.textContent = pTag
    dragArea.style.removeProperty("display")

})
// when file is inside drop area
dragArea.addEventListener('dragover', (event) => {
    event.preventDefault()
    dragText.textContent = 'Release to Upload'
    dragArea.classList.add('active')
})

// when file leaves the drag area
dragArea.addEventListener('dragleave', ()=> {
    dragText.textContent = 'Drag & Drop JSON'
    dragArea.classList.remove('active')
})

//when the file is dropped
dragArea.addEventListener('drop', (event)=> {
    event.preventDefault()
    file = event.dataTransfer.files[0]
    readFile()
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
