export default function Carousel() {
  return (
    <>
      <div id="maincarousel" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={"./../services.jpg"} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="./../nasa.jpg" className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src="./../research.jpg" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#maincarousel"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#maincarousel"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}
