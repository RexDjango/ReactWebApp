import React, { useEffect, useState } from "react";

const noop = () => {};

export const FileInput = ({ value, onChange = noop, ...rest }) => (
  <div>
    {Boolean(value.length) && <div>Selected files: {value}</div>}
    <label>
      Click to select some files...
      <input
        {...rest}
        style={{ display: "none" }}
        type="file"
        onChange={(e) => {
          onChange([...e.target.files]);
        }}
      />
    </label>
  </div>
);

export const FileUploader = ({ onFileSelect, params }) => {
  const fileInput = React.useRef(null);
  const [hasFile, setHasFile] = useState(false);
  console.log("<<===params:", params.length);

  useEffect(() => {
    if (params.length !== 0) {
      setHasFile(true);
    }
  }, [params, setHasFile]);

  const handleFileInput = (e) => {
    // handle validation
    onFileSelect(e.target.files[0]);
  };

  return (
    <div className="file-uploader">
      {hasFile ? (
        <p>{params}</p>
      ) : (
        <input type="file" onChange={handleFileInput} />
      )}
    </div>
  );
};
