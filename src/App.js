import React,{useEffect,useState}  from "react";
import Axios from "axios"
import Loader from "./Comopnents/Loading"
import Movie from "./Comopnents/Movie"
import api from "./api";
function App() {
    //used to control spinner or loader 
    const [spinner,setSpinner]=useState(false)
    //to store movies data in an array object form
    const [movies,setMovies]=useState([])
    //used to remember page number
    const [page,setPage]=useState(0)
    //used to load the spinner on load of the page
    useEffect(()=>{    
        setSpinner(true)
        loadMovies(4,"action",1080,"rating",1)
        },[])
    function changeMenu(e){
        //to get current active container
        var activeContainer=document.querySelector(".active-movie")
        //promising function is used because we need to toggle class after the function returned something
        var promise =new Promise((res,rej)=>{
            var pageNumber=1
            var genre=e.target.textContent.toLowerCase()
            if(e.target.id==="show-more"){
                pageNumber=page+1
                genre=activeContainer.textContent
            }
            var result=loadMovies(4,genre,1080,"rating",pageNumber)
            if(result){
                res(true)
            }else{
                rej(false)
            }
        })
        //handling promise
        promise
        .then(res=>{
            if(activeContainer && e.target.id!=="show-more"){
                activeContainer.classList=[""]
                e.target.classList=["active-movie"]
            }
        })
        .catch(err=>{console.log(err)})
    }
    //loadMovie is used to load movie details from the api
    function loadMovies(limit,genre,quality,sort_by,pageNumber){
        setSpinner(true)
        //requesting to the api
        Axios.get(api+"/list_movies.json?page="+pageNumber+"&limit="+limit+"&genre="+genre+"&quality="+quality+"&sort_by="+sort_by)
        .then(res=>{
            //if the response container data.data
            if(res.data.data){
                //updating page number 
                setPage(res.data.data.page_number)
                if(res.data.data.page_number===1){
                    //updating movies array
                    setMovies(res.data.data.movies)
                }else{
                    //if pagenumber load more button is clicked this statement will work
                    setMovies([...movies,...res.data.data.movies])
                }
            }
        })
        .catch(err=>{console.log(err)})
        .finally(()=>{setSpinner(false)})
        return true
    }
  return (
    <div className="">
       {spinner? <Loader/>:""}
        <button className="scroll-top scroll-to-target" data-target="html">
            <i className="fas fa-angle-up"></i>
        </button>
        <header>
            <div id="sticky-header" className="menu-area transparent-header">
                <div className="container custom-container">
                    <div className="row">
                        <div className="col-12">
                            <div className="mobile-nav-toggler"><i className="fas fa-bars"></i></div>
                            <div className="menu-wrap">
                                <nav className="menu-nav show">
                                    <div className="logo">
                                        <a href="index-2.html">
                                            <img src="./img/logo/logo.png" alt="Logo"/>
                                        </a>
                                    </div>
                                    <div className="navbar-wrap main-menu d-none d-lg-flex">
                                        <ul className="navigation">
                                            <li className="active menu-item-has-children"><a href="/">Home</a>
                                                <ul className="submenu">
                                                    <li className="active"><a href="index-2.html">Home One</a></li>
                                                    <li><a href="index-3.html">Home Two</a></li>
                                                </ul>
                                            </li>
                                            <li className="menu-item-has-children"><a href="/">Movie</a>
                                                <ul className="submenu">
                                                    <li><a href="movie.html">Movie</a></li>
                                                    <li><a href="movie-details.html">Movie Details</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="tv-show.html">tv show</a></li>
                                            <li><a href="pricing.html">Pricing</a></li>
                                            <li className="menu-item-has-children"><a href="/">blog</a>
                                                <ul className="submenu">
                                                    <li><a href="blog.html">Our Blog</a></li>
                                                    <li><a href="blog-details.html">Blog Details</a></li>
                                                </ul>
                                            </li>
                                            <li><a href="contact.html">contacts</a></li>
                                        </ul>
                                    </div>
                                    <div className="header-action d-none d-md-block">
                                        <ul>
                                            <li className="header-search"><a href="/" data-toggle="modal" data-target="#search-modal"><i className="fas fa-search"></i></a></li>
                                            <li className="header-lang">
                                                <form action="#">
                                                    <div className="icon"><i className="flaticon-globe"></i></div>
                                                    <select id="lang-dropdown">
                                                        <option value="">En</option>
                                                        <option value="">Au</option>
                                                        <option value="">AR</option>
                                                        <option value="">TU</option>
                                                    </select>
                                                </form>
                                            </li>
                                            <li className="header-btn"><a href="/" className="btn">Sign In</a></li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>

                            <div className="mobile-menu">
                                <div className="close-btn"><i className="fas fa-times"></i></div>

                                <nav className="menu-box">
                                    <div className="nav-logo"><a href="index-2.html"><img src="./img/logo/logo.png" alt="" title=""/></a>
                                    </div>
                                    <div className="menu-outer">
                                    </div>
                                    <div className="social-links">
                                        <ul className="clearfix">
                                            <li><a href="/"><span className="fab fa-twitter"></span></a></li>
                                            <li><a href="/"><span className="fab fa-facebook-square"></span></a></li>
                                            <li><a href="/"><span className="fab fa-pinterest-p"></span></a></li>
                                            <li><a href="/"><span className="fab fa-instagram"></span></a></li>
                                            <li><a href="/"><span className="fab fa-youtube"></span></a></li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                            <div className="menu-backdrop"></div>
                            <div className="modal fade" id="search-modal" tabIndex="-1" role="dialog" aria-hidden="true">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <form>
                                            <input type="text" placeholder="Search here..."/>
                                            <button><i className="fas fa-search"></i></button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </header>
        <main>
            <section className="banner-area banner-bg" data-background="./img/banner/banner_bg01.jpg">
                <div className="container custom-container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-8">
                            <div className="banner-content">
                                <h6 className="sub-title wow fadeInUp" data-wow-delay=".2s" data-wow-duration="1.8s">Movflx</h6>
                                <h2 className="title wow fadeInUp" data-wow-delay=".4s" data-wow-duration="1.8s">Unlimited <span>Movie</span>, TVs Shows, & More.</h2>
                                <div className="banner-meta wow fadeInUp" data-wow-delay=".6s" data-wow-duration="1.8s">
                                    <ul>
                                        <li className="quality">
                                            <span>Pg 18</span>
                                            <span>hd</span>
                                        </li>
                                        <li className="category">
                                            <a href="/">Romance,</a>
                                            <a href="/">Drama</a>
                                        </li>
                                        <li className="release-time">
                                            <span><i className="far fa-calendar-alt"></i> 2021</span>
                                            <span><i className="far fa-clock"></i> 128 min</span>
                                        </li>
                                    </ul>
                                </div>
                                <a href="https://www.youtube.com/watch?v=R2gbPxeNk2E" className="banner-btn btn popup-video wow fadeInUp" data-wow-delay=".8s" data-wow-duration="1.8s"><i className="fas fa-play"></i> Watch Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="top-rated-movie tr-movie-bg" data-background="./img/bg/tr_movies_bg.jpg">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="section-title text-center mb-50">
                                {/* <span className="sub-title">Top</span> */}
                                <h2 className="title">Top Rated Movies</h2>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center" >
                        <div className="col-lg-8">
                            <div className="tr-movie-menu-active text-center">
                                <button onClick={changeMenu} className="active-movie" >Action</button>
                                <button onClick={changeMenu} >Adventure</button>
                                <button onClick={changeMenu}>documentary</button>
                                <button onClick={changeMenu}>Romance</button>
                                <button onClick={changeMenu}>Comedy</button>
                            </div>
                        </div>
                    </div>
                    {
                    movies.length!==0
                    ?
                    <div className="row tr-movie-active" style={{height:"100%!important"}}>
                    {
                        movies.map((movie)=>{
                            var quality=[false,false,false,false]
                            movie.torrents.map((torrent)=>{
                                if(torrent.quality==="720p"){
                                    quality[0]=torrent.url
                                }
                                if(torrent.quality==="2160p"){
                                    quality[2]=torrent.url
                                } 
                                if(torrent.quality==="1080p"){
                                    quality[1]=torrent.url
                                }
                            })
                            return(
                                <Movie
                                    key={movie.id}
                                    imageSrc={movie.large_cover_image}
                                    date={movie.year}
                                    title={movie.title}
                                    fourK={quality[2]}
                                    seven20={quality[0]}
                                    ten80={quality[1]}
                                    duration={movie.runtime}
                                    rating={movie.rating}
                                />
                            )
                        })
                    }
                    </div>
                :
                    <div className="row justify-content-center">
                        <div className="col-lg-3">
                            <div  className="tr-movie-menu-active text-center">
                                <h3  className="active-movie">No movies found</h3>
                            </div>
                        </div>
                    </div>
                    }
                    {
                        movies.length!==0
                        ?
                        <div className="row justify-content-center">
                            <div className="col-lg-3">
                                <div  className="tr-movie-menu-active text-center">
                                    <button id="show-more" onClick={changeMenu} className="active-movie">Show more</button>
                                </div>
                            </div>
                        </div>
                        :
                        ""
                    }
                </div>
            </section>
        </main>
        <footer>
            <div className="footer-top-wrap">
                <div className="container">
                    <div className="footer-menu-wrap">
                        <div className="row align-items-center">
                            <div className="col-lg-3">
                                <div className="footer-logo">
                                    <a href="index-2.html"><img src="./img/logo/logo.png" alt=""/></a>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="footer-menu">
                                    <nav>
                                        <ul className="navigation">
                                            <li><a href="index-2.html">Home</a></li>
                                            <li><a href="index-2.html">Movie</a></li>
                                            <li><a href="index-2.html">tv show</a></li>
                                            <li><a href="index-2.html">pages</a></li>
                                            <li><a href="pricing.html">Pricing</a></li>
                                        </ul>
                                        <div className="footer-search">
                                            <form action="#">
                                                <input type="text" placeholder="Find Favorite Movie"/>
                                                <button><i className="fas fa-search"></i></button>
                                            </form>
                                        </div>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="footer-quick-link-wrap">
                        <div className="row align-items-center">
                            <div className="col-md-7">
                                <div className="quick-link-list">
                                    <ul>
                                        <li><a href="/">FAQ</a></li>
                                        <li><a href="/">Help Center</a></li>
                                        <li><a href="/">Terms of Use</a></li>
                                        <li><a href="/">Privacy</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className="footer-social">
                                    <ul>
                                        <li><a href="/"><i className="fab fa-facebook-f"></i></a></li>
                                        <li><a href="/"><i className="fab fa-twitter"></i></a></li>
                                        <li><a href="/"><i className="fab fa-pinterest-p"></i></a></li>
                                        <li><a href="/"><i className="fab fa-linkedin-in"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="copyright-wrap">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                            <div className="copyright-text">
                                <p>Copyright &copy; 2021. All Rights Reserved By <a href="index-2.html">Movflx</a></p>
                            </div>
                        </div>
                        <div className="col-lg-6 col-md-6">
                            <div className="payment-method-img text-center text-md-right">
                                <img src="./img/images/card_img.png" alt="./img"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>		
    </div>
  );
}

export default App;
