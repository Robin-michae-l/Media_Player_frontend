import React, { useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { addToCategory, deleteACategory, getAVideo, getAllCategory, updateCategory } from "../services/allAPI";
import 'react-toastify/dist/ReactToastify.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import VideoCard from "./VideoCard";

function Category() {

  const [show, setShow] = useState(false);
  const [CategoryName,setCategoryName]=useState("")
  const [category,setCategory]=useState([])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //fn to add category

  const handleAddCategory=async()=>{
    console.log(CategoryName);
    if(CategoryName){

      let body={
        CategoryName,
        allVideos:[]
      }

      const response=await addToCategory(body)
      console.log(response);
      if(response.status>=200 && response.status<300){
        toast.success('Category added successfully')
        //get all category

        allCategory()
        //to empty the state
        setCategoryName("")

        //close Modal
        handleClose()
      }
      else{
        toast.error('Something went wrong.Please try again')
      }

    }
    else{
      toast.warning('Please fill the category Name')
    }
  }

  //fn to get all categories

  const allCategory=async()=>
  {
    const {data}=await getAllCategory()
   /*  console.log(data); */
   setCategory(data)
  }
  console.log(category);


  //fn to delete category

  const removeCategory=async(id)=>{

    await deleteACategory(id)

    //to get the remaining category

    allCategory()

  }

  //fn to prevent refresh

  const dragOver=(e)=>{
    e.preventDefault()
  }

  //fn to drop video card to category

  const videoDrop=async(e,categoryid)=>{
  console.log(`Category in which videocard is dropped:${categoryid}`);
  let videoId=e.dataTransfer.getData("videoID")
  console.log(videoId);  

  //api to get a video

         const {data}= await getAVideo(videoId)
         console.log(data);

         let selectedcategory=category.find((item)=>item?.id==categoryid)
        
         selectedcategory.allVideos.push(data)
         console.log(selectedcategory);

         await updateCategory(categoryid,selectedcategory)

         allCategory()


  
  }

  

  
  useEffect(()=>{
    allCategory()
  },[])
  return (
    <>
      <div className="d-grid ms-3">
        <button onClick={handleShow} className="btn btn-warning">Add New Category</button>
      </div>

      {category?.length>0?
      category?.map((item)=>(
     <div className="m-5 border border-secondary p-3 rounded" droppable onDragOver={(e)=>dragOver(e)} onDrop={(e)=>videoDrop(e,item?.id)} >

        <div className="d-flex justify-content-between align-items-center">
        <h6>{item.CategoryName}</h6>

        <button onClick={()=>removeCategory(item?.id)} className="btn btn-danger"><i class="fa-solid fa-trash"></i></button>


          </div>

          <Row>
          <Col>
            {
              item?.allVideos.length>0?
              item?.allVideos.map((card)=>(<VideoCard displayvideo={card}/>))
              : <p>Nothing to Display</p>
            }

        
            </Col>
          

          </Row>

            

      </div>

      ))
        
      : <p className="fw-bolder fs-5 text-danger m-3">Nothing to Display</p>

      }

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="border border-secondary rounded p-3">
          <Form.Group className="mb-3" controlId="formBasicEmail">
           <Form.Label>Category Name</Form.Label>
              <Form.Control type="text " placeholder="Enter Category Name" onChange={(e)=>setCategoryName(e.target.value)} />
            </Form.Group>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleAddCategory} variant="warning">Add</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer position="top-center" theme="colored" autoClose={2000}/>
    </>
  );
}

export default Category;
