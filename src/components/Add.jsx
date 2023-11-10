import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Form from "react-bootstrap/Form";
import { uploadAllvideo } from "../services/allAPI";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({setUploadVideoStatus}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const  [videos, setVideos]=useState({
    id:"",
    caption:"",
    url:"",
    embedLink:""

  })

  console.log(videos);

  const embedVideolink=(e)=>{
    const {value}=e.target
    console.log(value.slice(-11));
    const link=`https://www.youtube.com/embed/${value.slice(-11)}`
    setVideos({...videos, embedLink:link})
  }
  const handleUpload=async()=>{
    const {id,caption,url,embedLink}=videos
    if(!id || !caption || !url || !embedLink){
     toast.warning("please fill the field")
    }
    else{
      const response= await uploadAllvideo(videos)
      console.log(response);
      if(response.status>=200 && response.status<300){
        setUploadVideoStatus(response.data)
        toast.success(`${response.data.caption} is successfully uploaded`)
        //to make state into initial value
        setVideos({
          id:"",
          caption:"",
          url:"",
          embedLink:""
        })
        //to close the model
        handleClose()
      }
      else{
        console.log(response);
        toast.error('something went wrong.Try again later')
      }
    }
  } 
 
  return (
    <>
      <div className="d-flex align-items-center">
        <h5>Upload New Video</h5>
        <button onClick={handleShow} className="btn">
          <i class="fa-solid fa-cloud-arrow-up fs-5 mb-2"></i>
        </button>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <i class="fa-solid fa-film me-3"></i>Upload Videos
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Please fill the folloing form</p>
          <form className="border border-info rounded p-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text " placeholder="Enter Video Id" onChange={(e)=>setVideos({...videos,id:e.target.value})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text " placeholder="Enter Video Caption" onChange={(e)=>setVideos({...videos,caption:e.target.value})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control type="text " placeholder="Enter Video Image Url" onChange={(e)=>setVideos({...videos,url:e.target.value})} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="text "
                placeholder="Enter Youtube Video link " onChange={embedVideolink}
              />
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-warning" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="info" onClick={handleUpload}>Upload</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" theme="colored" autoClose={2000}/>
    </>
  );
}


export default Add;

