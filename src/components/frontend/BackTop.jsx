import React from "react";

function backTop() {
  window.onscroll = function() {
    scrollFunction()
    StickyNavigation()
  };

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.getElementById("topButton").style.display = "block";
    }else {
    document.getElementById("topButton").style.display = "none";
    }
  }
  function topFunction() {
    window.history.pushState("", "", '/');
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  function StickyNavigation() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      document.querySelector("#topnav").classList.add("sticky");
    }else {
    document.querySelector("#topnav").classList.remove("sticky");
    }
  }
  
  return (
    <button onClick={(e) => topFunction(e)} id="topButton" title="Back To Top">Back To Top</button>
  );
}

export default backTop;