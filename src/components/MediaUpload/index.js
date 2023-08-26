import React, { useRef } from "react";
import { Grid, IconButton, useMediaQuery, Typography } from "@mui/material";
import { ReactComponent as ClearIcon } from "../../assets/icons/clear.svg";
import icons from "../../assets";
import "./style.scss";

const ImageUploader = ({
  fileType = "image",
  selectedFile,
  setSelectedFile,
  title,
}) => {
  const mobile = useMediaQuery("(max-width: 600px)");
  const fileInputRef = useRef(null);

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && isFileTypeAllowed(file)) {
      const fileUrl = URL.createObjectURL(file);

      setSelectedFile({
        ...selectedFile,
        file,
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)}mb`,
        fileType: file.type,
        fileUrl,
      });
    }
  };

  const removeSelectedFile = (event) => {
    event.stopPropagation();
    setSelectedFile(null);
  };

  const isFileTypeAllowed = (file) => {
    const allowedTypes = getFileAcceptValue(fileType).split(",");
    const fileTypeRegex = new RegExp(allowedTypes.join("|"), "i");
    return fileTypeRegex.test(file.type);
  };

  const getFileAcceptValue = () => {
    switch (fileType) {
      case "image":
        return "image/*";
      case "video":
        return "video/*";
      case "audio":
        return "audio/*";
      default:
        return "application/pdf";
    }
  };

  return (
    <>
      <Typography
        variant="h6"
        mb={{ xs: 1, sm: 2 }}
        sx={{ fontSize: mobile && "14px" }}
      >
        {title}
      </Typography>
      <Grid
        className="media-upload-container"
        onClick={() =>
          (fileType === "pdf" || !selectedFile?.fileUrl) && handleFileUpload()
        }
        container
        direction="column"
        alignItems="center"
      >
        {selectedFile?.fileUrl ? (
          <>
            <Grid
              component="span"
              className="remove-image"
              onClick={removeSelectedFile}
            >
              <IconButton>
                <ClearIcon />
              </IconButton>
            </Grid>
            {fileType === "image" ? (
              <img
                src={selectedFile.fileUrl}
                alt="Uploaded"
                className="--image"
              />
            ) : fileType === "video" ? (
              <video controls className="--video">
                <source
                  src={selectedFile.fileUrl}
                  type={selectedFile.fileType}
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <>
                <Grid component="span" className="icon" mb={2}>
                  <img
                    src={icons.pdfIcon}
                    alt="Upload Icon"
                    className="icon-image"
                  />
                </Grid>
                <Grid component="span" className="file-name">
                  {selectedFile.fileName}
                </Grid>
                <Grid component="span" className="file-size">
                  {selectedFile.fileSize}
                </Grid>
              </>
            )}
          </>
        ) : (
          <>
            <Grid component="span" className="icon" mb={2}>
              <img
                src={fileType === "pdf" ? icons.pdfIcon : icons.mediaUploadIcon}
                alt="Upload Icon"
                className="icon-image"
              />
            </Grid>

            <Grid component="span" className="text">
              {`Click to upload ${!mobile ? "or drop a file" : ""}`}
            </Grid>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={getFileAcceptValue()}
          style={{ display: "none" }}
          onChange={handleFileChange}
          onClick={(e) => (e.target.value = null)}
        />
      </Grid>
    </>
  );
};

export default ImageUploader;
