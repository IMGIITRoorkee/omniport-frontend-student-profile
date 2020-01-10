import React from "react";
import style from "../../styles.css";
import ReactCrop from 'react-image-crop';

import {
	Button,
	Icon,
	Segment
  } from "semantic-ui-react";


const description_style = {color: 'black'};
const imageStyle = {
	'max-height':'100%',
	'max-width':'100%'
};

export class Crop extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		fileName: 'profile',
		crop: {
			aspect: 1
		},
		croppedImageUrl: "",
		crop_image: ""
	  }
	}

	onImageLoaded = (image, pixelCrop) => {
		this.imageRef = image;
	}

	onCropComplete = (crop, pixelCrop) => {
		this.makeClientCrop(crop, pixelCrop)
	}

	onCropChange = crop => {
		this.setState({ crop })
	}

	async makeClientCrop (crop, pixelCrop) {
		if (this.imageRef && crop.width && crop.height) {
		  const croppedImageUrl = await this.getCroppedImg(
			this.imageRef,
			pixelCrop,
			this.state.fileName
		  )
		  this.setState({ croppedImageUrl })
		}
	}

	getCroppedImg (image, pixelCrop, fileName) {
		const canvas = document.createElement('canvas')
		canvas.width = pixelCrop.width
		canvas.height = pixelCrop.height
		const ctx = canvas.getContext('2d')
	
		ctx.drawImage(
		  image,
		  pixelCrop.x,
		  pixelCrop.y,
		  pixelCrop.width,
		  pixelCrop.height,
		  0,
		  0,
		  pixelCrop.width,
		  pixelCrop.height
		)
	
		return new Promise((resolve, reject) => {
		  canvas.toBlob(blob => {
			if (!blob) {
			  // reject(new Error('Canvas is empty'));
			  return
			}
			blob.name = fileName
			window.URL.revokeObjectURL(this.fileUrl)
			this.fileUrl = window.URL.createObjectURL(blob)
			this.setState({
			  crop_image: blob
			})
			// Here the cropped image blob is created
			resolve(this.fileUrl)
		  }, 'image/jpeg')
		})
	}


	handleSubmit = e => {
		const {crop_image, croppedImageUrl} = this.state;
		const {setImage} = this.props;
		setImage(
			crop_image,
			croppedImageUrl
		)
	}


	render() {
		const {handleSubmit} = this;
		const {crop} = this.state;
		const {src, cancelCrop} = this.props;
		return (
		<Segment basic>
		  <Segment attached="top" styleName="style.headingBox">
			<h3 styleName="style.heading">Crop Image</h3>
			<Icon
			  color="grey"
			  name="delete"
			  onClick={cancelCrop}
			/>
		  </Segment>
		  <Segment attached>
		  <h4 style={description_style}>Drag over the area of image you want to keep. After choosing the area, click 'Okay' to update the profile picture.</h4>
		  </Segment>
		  
		  <Segment attached styleName="style.formStyle">
		  <ReactCrop
            src={src}
            crop={crop}
			ruleOfThirds
			imageStyle={imageStyle}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
          />
		 </Segment>

		  <Segment attached="bottom" styleName="style.buttonBox">
            <Button onClick={handleSubmit}  color={"blue"} type="submit">
              Okay
            </Button>
          </Segment>		
		</Segment>
		);
	}
}