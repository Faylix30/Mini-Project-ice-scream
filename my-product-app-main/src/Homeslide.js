import Carousel from 'react-bootstrap/Carousel';

function Homeslide() {
  return (
    <>
    <Carousel style={{maxWidth:'100%'}} fade='true' pause='off' variant='dark'>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src="https://images4.alphacoders.com/101/thumb-1920-1012961.jpg"
          alt="First slide"
          style={{
            maxHeight:'48em'
          }}
        />
        <Carousel.Caption>
          <h3>Ice cream</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <img
          className="d-block w-100"
          src="https://images6.alphacoders.com/434/thumb-1920-434581.jpg"
          alt="Second slide"
          style={{
            maxHeight:'48em'
          }}
        />
        <Carousel.Caption>
        <h3>Ice cream</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={3000} >
        <img
          className="d-block w-100"
          src="https://images5.alphacoders.com/717/717597.jpg"
          alt="Third slide"
          style={{
            maxHeight:'48em'
          }}
        />
        <Carousel.Caption>
        <h3>Ice cream</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  );
}

export default Homeslide;