import { useState } from "react";
import "./Header.css";

const Header = () => {
  const [apiLinks, setApiLinks] = useState([]);
  const [apiLinksTexts, setApiLinksTexts] = useState([]);
  const [style, setStyle] = useState("hide");
  const url =
    "https://en.wikipedia.org/w/api.php?&origin=*&format=json&action=opensearch&search=";

  const makeApiCall = (e) => {
    let str = e.target.value;
    try {
      fetch(url + str)
        .then((data) => data.json())
        .then((res) => {
          setApiLinks(res[3]);
          setApiLinksTexts(res[1]);
        });
    } catch (err) {
      setStyle("show");
      setTimeout(() => {
        setStyle("hide");
      }, 1000);
    }
  };

  var timer;

  const debounce = (e) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      makeApiCall(e);
    }, 5000);
    // console.log(e.target.value);
    makeApiCall(e);
  };
  return (
    <div className="Wrapper">
      <div className="container">
        <i className="fas fa-globe-europe"></i>
        <h1>WikipediA</h1>
        <h5>A free Encyclopedia</h5>
        <div>
          <img
            id="logo"
            src="https://logos-world.net/wp-content/uploads/2020/09/Wikipedia-Logo-2003-present.png"
            alt=""
          />
        </div>
        <input id="input" type="text" onChange={debounce} />
        <hr />
        <div className={style}>Please enter a valid keyword.</div>
      </div>
      <div className="container-two">
        {apiLinks &&
          apiLinksTexts.map((item, index) => (
            <div key={apiLinks[index]} className="suggestion">
              <a id="sugg" href={apiLinks[index]}>
                {item}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Header;
