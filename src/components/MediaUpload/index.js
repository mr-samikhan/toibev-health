import React, { useEffect, useRef, useState } from 'react'
import { Grid, Box, IconButton, Typography, useMediaQuery } from '@mui/material'

//imports
import './style.scss'
import icons from '../../assets'
import { ReactComponent as ClearIcon } from '../../assets/icons/clear.svg'

const ImageUploader = ({
  index,
  title,
  onChange,
  onRemoveFile,
  selectedFile,
  isLanguageForm,
  setSelectedFile,
  fileType = 'image',
  onAddLanguageAudio,
  handleImageRemove,
}) => {
  const mobile = useMediaQuery('(max-width: 600px)')
  const fileInputRef = useRef(null)
  const audioRef = useRef(new Audio())

  const handleFileUpload = () => {
    fileInputRef.current.click()
  }

  const [playAudio, setPlayAudio] = useState(false)

  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file && isFileTypeAllowed(file)) {
      const fileUrl = URL.createObjectURL(file)

      setSelectedFile({
        ...selectedFile,
        file,
        fileName: file.name,
        fileSize: `${(file.size / (1024 * 1024)).toFixed(2)}mb`,
        fileType: file.type,
        fileUrl,
      })
      if (isLanguageForm) {
        onAddLanguageAudio(index, file, fileType)
      }
    }
  }

  const removeSelectedFile = (event) => {
    event.stopPropagation()
    setSelectedFile(null)
    audioRef.current.pause()
    audioRef.current.src = ''
    if (isLanguageForm) {
      onRemoveFile(index, fileType)
    }
  }

  const isFileTypeAllowed = (file) => {
    const allowedTypes = getFileAcceptValue(fileType).split(',')
    const fileTypeRegex = new RegExp(allowedTypes.join('|'), 'i')
    return fileTypeRegex.test(file.type)
  }

  const getFileAcceptValue = () => {
    switch (fileType) {
      case 'image':
        return 'image/*'
      case 'video':
        return 'video/*'
      case 'audio':
        return 'audio/*'
      default:
        return 'application/pdf'
    }
  }

  const [sliderValue, setSliderValue] = useState(null)

  const onPlayAudio = () => {
    setPlayAudio(true)
    audioRef.current.src = selectedFile.fileUrl
    //get audio slider value
    audioRef.current.currentTime = 0
    audioRef.current.volume = 0.1
    audioRef.current.playbackRate = 1
    audioRef.current.ontimeupdate = () => {
      const sliderValue =
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      setSliderValue(sliderValue)
    }
    //end

    //when audio ends
    audioRef.current.onended = () => {
      setPlayAudio(false)
      setSliderValue(0)
    }
    //end
    audioRef.current.play()
  }

  const onPauseAudio = () => {
    setPlayAudio(false)
    audioRef.current.pause()
  }

  const onAudioClick = () => {
    if (playAudio) {
      onPauseAudio()
    } else {
      onPlayAudio()
    }
  }

  useEffect(() => {
    return () => {
      audioRef.current.pause()
      audioRef.current.src = ''
    }
  }, [])

  //audio slider
  const RenderDurationSlider = () => {
    return (
      <Box
        height={4}
        width={160}
        borderRadius={30}
        position="relative"
        sx={{ background: 'rgba(59, 125, 125, 0.30)' }}
      >
        <Box
          height={4}
          borderRadius={30}
          bgcolor="#3B7D7D"
          position="absolute"
          width={`${sliderValue}%`}
        ></Box>
      </Box>
    )
  }

  return (
    <>
      <Typography
        variant="h6"
        mb={{ xs: 1, sm: 2 }}
        sx={{ fontSize: mobile && '14px' }}
      >
        {title}
      </Typography>
      <Grid
        className="media-upload-container"
        onClick={() =>
          (fileType === 'pdf' || !selectedFile?.fileUrl) && handleFileUpload()
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
              onClick={handleImageRemove || removeSelectedFile}
            >
              <IconButton>
                <ClearIcon />
              </IconButton>
            </Grid>
            {fileType === 'image' ? (
              <img
                src={selectedFile.fileUrl}
                alt="Uploaded"
                className="--image"
              />
            ) : fileType === 'video' ? (
              <video controls className="--video">
                <source
                  src={selectedFile.fileUrl}
                  type={selectedFile.fileType}
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <>
                <Box position="relative">
                  <Grid component="span" className="icon" mb={2}>
                    {fileType === 'audio' && (
                      <>
                        <IconButton
                          onClick={() => onAudioClick()}
                          sx={{ position: 'absolute', right: 90 }}
                        >
                          <img
                            width={30}
                            height={30}
                            alt="Upload Icon"
                            src={icons.videoCircleIcon}
                          />
                        </IconButton>
                      </>
                    )}
                    <img
                      alt="Upload Icon"
                      className="icon-image"
                      src={
                        fileType === 'audio'
                          ? icons.microphoneIcon
                          : icons.pdfIcon
                      }
                    />
                  </Grid>
                </Box>
                <Grid component="span" className="file-name">
                  {selectedFile.fileName}
                </Grid>
                <Grid component="span" className="file-size">
                  {selectedFile.fileSize}
                </Grid>
                <Grid component="span" className="file-size" mt={2}>
                  <RenderDurationSlider />
                </Grid>
              </>
            )}
          </>
        ) : (
          <>
            <Grid component="span" className="icon" mb={2}>
              <img
                src={
                  fileType === 'pdf'
                    ? icons.pdfIcon
                    : fileType === 'audio'
                    ? icons.microphoneIcon
                    : icons.mediaUploadIcon
                }
                alt="Upload Icon"
                className="icon-image"
              />
            </Grid>

            <Grid component="span" className="text">
              {`Click to upload ${!mobile ? 'or drop a file' : ''}`}
            </Grid>
          </>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept={getFileAcceptValue()}
          style={{ display: 'none' }}
          onChange={onChange || handleFileChange}
          onClick={(e) => (e.target.value = null)}
        />
      </Grid>
    </>
  )
}

export default ImageUploader
