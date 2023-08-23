import React, { useState } from "react";

export default function TextForm(props) {
  const [text, setText] = useState("");
  const handleUpClick = () => {
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to uppercase","success");
  };
  const handleLowClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to lowercase","success");
  };
  const handleOnChange = (event) => {
    setText(event.target.value);
  }; 
  const handleClear = () => {
    setText("");
  };
  const handleCopy = () =>{
    let text = document.getElementById("myBox");
    text.select();
    navigator.clipboard.writeText(text.value);
    document.getSelection().removeAllRanges();
    props.showAlert("Copied to clipboard","success");
  }
  return (
    <>
      <div className="container" style={{color: props.mode === 'light'?'black':'white'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            id="myBox"
            value={text}
            onChange={handleOnChange}
            rows="8"
            style={{backgroundColor: props.mode === 'light'?'white':'#565e64',
            color: props.mode === 'light'?'black':'white'}}
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>
          Convert to Uppercase
        </button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleLowClick}>
          Convert to Lowercase
        </button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleClear}>Clear All</button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy All</button>

      </div>
      <div className="container my-2" style={{color: props.mode === 'light'?'black':'white'}}>
        <h1>Text Summery</h1>
        <p>{text.split(" ").filter((element)=>{return element.length !== 0}).length} words,{text.length} characters</p>
        <p>{0.008*text.split(" ").filter((element)=>{return element.length !== 0}).length} minutes requied</p>
        <h1>Preview</h1>
        <p>{text.length>0?text:"Enter text in box to preview"}</p>
      </div>
    </>
  );
}
