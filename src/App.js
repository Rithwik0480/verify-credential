import React, {useState, useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import swal from 'sweetalert';
import style from './style.css'
import drop from './drop'
import { render } from '@testing-library/react';

function App() {
  const credentialRef = useRef()
  function handleVerify(e) {
    e.preventDefault()
    const url = "https://agent.demo.dhiway.com/api/v1/verify"
    const credential = credentialRef.current.value
    // const credential = fileData
    // credentialRef.current.value= null

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
          let count = 0;
          if(data.signature.verified === true)
              count++;
          if(data.stream.verified === true)
              count++;
          if(data.digest.verified === true)
              count++;
          if(count === 3){
              swal({
                  title: "Verified!",
                  text: "This credential has been verified",
                  icon: "success",
              });
          }
          else{
              swal({
                  title: "Not verified!",
                  text: "This credential has not been verified",
                  icon: "error",
              });
          }

      })
  }
  catch(error){
      // swal("Please make sure that you enter the VC in the correct format")
  }
    }

  
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
              <div className="col-sm-8">
                <div className="card">
                    <form onClick={handleVerify}>
                    <input type='text' ref={credentialRef}/>
                    <button type='submit'>Verify</button>
                    </form>
                </div>
              </div>
              <div className='drag-area'>
                <p className='drop-header'>Drag & Drop JSON</p>
                <input type="file" id='input-file' hidden/>
                <button className='btn btn-light' id='upload-btn'>Upload</button>
              </div>
          </div>
      </div>  
    </div>
     );
  
}

export default App;