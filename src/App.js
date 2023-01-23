import React, { useState, useRef, useCallback, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import swal from 'sweetalert';
import style from './style.css'
// import drop from './drop'
import { render } from '@testing-library/react';
import { useDropzone } from 'react-dropzone';

function App() {
  useEffect(()=>{
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success!
      function handleJSONDrop(evt) {
        evt.stopPropagation();
        evt.preventDefault();

        var files = evt.dataTransfer.files;
        console.log("files",files)
          // Loop through the FileList and read
          for (var i = 0, f; f = files[i]; i++) {
      
            // Only process json files.
              if (!f.type.match('application/json')) {
              continue;
            }
      
            var reader = new FileReader();
      
            // Closure to capture the file information.
            reader.onload = (function(theFile) {
              return function(e) {
                let p = JSON.parse(e.target.result);
                console.log("p",p)
              };
            })(f);
            reader.readAsText(f);
          }
      }
    
      function handleDragOver(evt) {
        console.log("Cad")
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
      }
    
      // Setup the dnd listeners.
      var dropZone = document.getElementsByTagName('textarea')[0];
      dropZone.addEventListener('dragover', handleDragOver, false);
      dropZone.addEventListener('drop', handleJSONDrop, false);
      
    
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  },[])

  const credentialRef = useRef()
  function handleVerify(e) {
    e.preventDefault()
    const url = "https://agent.demo.dhiway.com/api/v1/verify"
    const credential = credentialRef.current.value
    // const credential = fileData
    // credentialRef.current.value= null

    try {
      let vcCheck = {
        "vc": JSON.parse(credential)
      }
      const response = fetch(url, {
        credentials: "include",
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vcCheck),
      })
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
          let count = 0;
          if (data.signature.verified === true)
            count++;
          if (data.stream.verified === true)
            count++;
          if (data.digest.verified === true)
            count++;
          if (count === 3) {
            swal({
              title: "Verified!",
              text: "This credential has been verified",
              icon: "success",
            });
          }
          else {
            swal({
              title: "Not verified!",
              text: "This credential has not been verified",
              icon: "error",
            });
          }

        })
    }
    catch (error) {
      // swal("Please make sure that you enter the VC in the correct format");
    }
  }

  ;


  return (
    <div className='f-screen'>
      <div>
        <img className='p-3' src='https://cdn-clebp.nitrocdn.com/cWNDIHLSkFLqhtZapRjEKdXMJezUGxxk/assets/static/optimized/rev-cd5f479/wp-content/uploads/2020/10/cropped-horizontal-140x46.png' />
        <a href='https://cord.network/' className='links p-3'>About CORD</a>
        <a href='https://dhiway.com/markstudio/' className='links p-3'>About #Mark Studio</a>
      </div>
      <div>
        <h1 className='heading'>Verify Credential</h1>
        <div className='bottom-contents'>
          <textarea className='drag-area' id="drag-textarea" placeholder='Drag & drop or copy paste the json'></textarea>
          <div className='position-relative'>

            {/* <div {...getRootProps({ className: 'dropzone' })} onClick={(e) => e.stopPropagation()}>
              <input {...getInputProps()} />
              <p className='text-black'>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <textarea className="container">

            </textarea> */}
          </div>


        </div>
      </div>
    </div>
  );

}

export default App;