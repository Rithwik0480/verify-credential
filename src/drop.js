import app from './App'

const dragArea = document.querySelector('.drag-area')
const dragText = document.querySelector('.drop-header')
let file;

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
    dragText.textContent = file.name

    let fileType = file.type

    let validExtention = ['application/json']

    if(validExtention.includes(fileType)){
        let fileReader = new FileReader()

        fileReader.onload = () => {
            let fileData = fileReader.result
            console.log(fileData)
            app.handleVerify(fileData)
        }
        fileReader.readAsText(file)
    }
    
}) 