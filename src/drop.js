// import app from './App'
// import swal from 'sweetalert';

// const dragArea = document.querySelector('.drag-area')
// const dragText = document.querySelector('.drop-header')

// let button = document.querySelector('#upload-btn')
// let input = document.querySelector('#input-file')
// let file;

// button.onclick = () => {
//     input.click();
// }

// //when a file is uploaded
// input.addEventListener('change', function() {
//     file = this.files[0]
//     dragArea.classList.add('active')
//     readFile()
// })


// // when file is inside drop area
// dragArea.addEventListener('dragover', (event) => {
//     event.preventDefault()
//     dragText.textContent = 'Release to Upload'
//     dragArea.classList.add('active')
// })

// // when file leaves the drag area
// dragArea.addEventListener('dragleave', ()=> {
//     dragText.textContent = 'Drag & Drop JSON'
//     dragArea.classList.remove('active')
// })

// //when the file is dropped
// dragArea.addEventListener('drop', (event)=> {
//     event.preventDefault()

//     file = event.dataTransfer.files[0]
//     readFile()
// })

// function readFile() {
//     let fileType = file.type

//     let validExtention = ['application/json']

//     if(validExtention.includes(fileType)){
//         dragText.textContent = file.name
//         let fileReader = new FileReader()

//         fileReader.onload = () => {
//             let fileData = fileReader.result
//             console.log(fileData)
//             app.handleVerify(fileData)
//         }
//         fileReader.readAsText(file)
//     }else {
//         dragText.textContent = 'Drag & Drop JSON'
//         dragArea.classList.remove('active')
//         swal({title:'The file is not a JSON',
//               text: 'Make sure the file has a ".json" extention.',
//               icon:'warning'})
//     }
// }