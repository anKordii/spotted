import React, { useEffect } from "react";
import ReactGA from 'react-ga';
import { withRouter, Link } from "react-router-dom";

ReactGA.initialize('UA-218248816-4');
function Navigation() {

  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  })


  return (
    <nav className="navbar navbar-light navbar-expand-lg navigation-clean-button" id="topnav">
        <div className="container">
          <Link to={`/`} className="navbar-brand" style={{fontSize: "1.25rem", fontWeight: "bold", color: 'black'}}>Beyondlabs</Link>
          <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-2"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navcol-2">
                <ul className="navbar-nav me-auto">
                  <li>
                    <Link to={`/polityka`} style={{color: 'black'}}>polityka prywatności</Link>
                  </li>
                </ul>
                <span className="navbar-text actions">
                  <a className="p-3" rel="noreferrer" href="https://twitter.com/XanaxWasTaken" target={'_blank'}><i className="icon ion-social-twitter"></i></a>
                </span>
            </div>
        </div>
    </nav>
  );
}

export default withRouter(Navigation);