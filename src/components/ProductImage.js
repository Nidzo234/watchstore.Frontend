import ReactImageMagnify from 'react-image-magnify';
import './ProductImage.css'
export default function ProductImage({image}){
  
  return (
    <div style={{
        width: "500px",
    }}>
        <ReactImageMagnify {...{
        smallImage: {
            alt: 'Wristwatch by Ted Baker London',
            isFluidWidth: true,
            src: image
        },
        largeImage: {
            src: image,
            width: 1400,
            height: 1400
          
        },
        enlargedImagePosition: 'over'
        
    }} />
    </div>
    
  );
}