import React, { useEffect, useState } from "react";
import { apiGalleryCreate } from "./lookup";
import { FileUploader, Modal } from "../controls";

export function GalleryCreate(props) {
  const { didCreateGallery } = props;
  const editdata = props.galleryToEdit;
  const title = React.createRef();
  const mypicture = React.createRef();
  const [picture, setPicture] = useState([]);
  const descrip = React.createRef();
  const [haspicture, setHasPicture] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("<----galleryToEdit:", editdata.length);
    if (editdata.length !== 0) {
      title.current.value = editdata.title;
      descrip.current.value = editdata.discrip;
      setPicture(editdata.picture);
      setSelectedFile(editdata.picture);
      setHasPicture(true);
    }
  }, [props.galleryToEdit]);

  const handleBackendLookup = (response, status) => {
    if (status === 201 || status === 200) {
      console.log("<----didCreateGallery", response.newgallery);
      didCreateGallery(response.newgallery);
    } else {
      alert("There was an error finding your post.");
    }
  };

  useEffect(() => {
    console.log("<---selectedFile:", selectedFile);
  }, [selectedFile]);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("<--Submit click", title);
    const uploadData = new FormData();
    uploadData.append("title", title.current.value);
    uploadData.append("picture", picture, picture.name);
    uploadData.append("discrip", descrip.current.value);
    console.log("<----uploadData", uploadData);
    apiGalleryCreate(uploadData, handleBackendLookup);
    title.current.value = "";
    descrip.current.value = "";
    mypicture.current.files = "";
  };

  return (
    <form className="form" encType="multipart/form-data">
      <div className="form-group row">
        <div className="col-md-8">
          <label></label>
          <input type="text" className="form-control" ref={title} />
        </div>
        <div className="col-md-4">
          <label htmlFor="picture">Select Picture</label>
          <FileUploader
            onFileSelect={(file) => setSelectedFile(file)}
            params={picture}
          />

          {/* {haspicture ? (
            <div>{picture}</div>
          ) : (
            <input
              type="file"
              className="form-control-file"
              id="fileInput"
              onChange={(e) => setPicture(e.target.files[0])}
              ref={mypicture}
              multiple
            />
          )} */}
        </div>
      </div>
      <div className="form-group row">
        <div className="col-md-8">
          <label className="sr-only">Description</label>
          <input type="text" className="form-control" ref={descrip} />
        </div>
        <div className="col-md-4">
          <button onClick={() => setShow(true)}>Show Modal</button>
          <Modal title="My Modal" onClose={() => setShow(true)} show={show}>
            <p>This is modal body</p>
          </Modal>
          {/* <button
            onClick={handleSubmit}
            className="btn btn-primary form-control"
          >
            Save to Gallery
          </button> */}
        </div>
      </div>
    </form>
  );
}
