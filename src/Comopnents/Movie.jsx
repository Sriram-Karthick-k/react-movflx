import React from "react"

export default function Movie(props) {
  return (
    <div className="col-xl-3 col-lg-4 col-sm-6 grid-item grid-sizer .cat-one">
      <div className="movie-item mb-60">
        <div className="movie-poster">
          <div><img src={props.imageSrc ? props.imageSrc : "./img/logo/logo.png"} alt="" /></div>
        </div>
        <div className="movie-content">
          <div className="top">
            <h5 className="title"><a href="movie-details.html">{props.title}</a></h5>
            <span className="date">{props.date}</span>
          </div>
          <div className="bottom">
            <ul>
              {props.fourK ? <a href={props.fourK}><li><span className="quality">4K</span></li></a> : <li><span className="quality none">4K</span></li>}
              {props.ten80 ? <a href={props.ten80}><li><span className="quality">1080p</span></li></a> : <li><span className="quality none">1080p</span></li>}
              {props.seven20 ? <a href={props.seven20}><li><span className="quality">1080p</span></li></a> : <li><span className="quality none">720p</span></li>}

              <li>
                <span className="duration"><i className="far fa-clock"></i> {props.duration}</span>
                <span className="rating"><i className="fas fa-thumbs-up"></i>{props.rating}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div >
  )
}
