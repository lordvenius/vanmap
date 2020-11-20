import React from "react";
import "../css/Home.scss";
import pic from "../media/van-3.png";

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(true);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
    let current = domRef.current;
    return () => observer.unobserve(current);
  }, []);
  return (
    <div
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
      ref={domRef}
    >
      <h1>TOP SPOTS!</h1>
      <div className="bottom">
        <div className="featured-card">
          <div className="card">
            <CardContent></CardContent>
          </div>
        </div>

        <div className="card-container">
          <div className="card">
            <CardContent></CardContent>
          </div>
          <div className="card">
            <CardContent></CardContent>
          </div>
          <div className="card">
            <CardContent></CardContent>
          </div>
          <div className="card">
            <CardContent></CardContent>
          </div>
          <div className="card">
            <CardContent></CardContent>
          </div>
          <div className="card">
            <CardContent></CardContent>
          </div>
          <div className="card">
            <CardContent></CardContent>
          </div>
          <div className="card">
            <CardContent></CardContent>
          </div>
          <div className="card">
            <CardContent></CardContent>
          </div>
          <div className="card">
            <CardContent></CardContent>
          </div>
        </div>
      </div>
    </div>
  );
}

function CardContent() {
  return (
    <>
      <img src={pic} alt="vanmap logo"></img>
      <h1>Title</h1>
      <p>
        Information about your top destinations can be displayed here. And a lot
        more, your imagination is your only limit...
      </p>
    </>
  );
}

function Home() {
  return (
    <>
      <div className="jumbotron">
        <div className="top">
          <div className="home-logo">
            <img src={pic} alt="vanmap logo"></img>
            <h1>vanMap</h1>
          </div>
          <div className="home-text">
            <p>Discover the world and save your favorite camping spots</p>
            <p>Chat with other campers and stay up to date</p>
            <p>Show of your camper and get feedback on your DIY hamock</p>
          </div>
        </div>

        <FadeInSection></FadeInSection>
      </div>
    </>
  );
}

export default Home;
