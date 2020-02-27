import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faInstagram, faTwitter, faTumblr, faGithub, faBehance, faFacebook, faLastfm } from "@fortawesome/free-brands-svg-icons";
import { Random } from "../utils/Random";
import LastFM from "./LastFM";
import "./Header.scss";

const links = [
  {
    icon: <FontAwesomeIcon icon={faGithub} />,
    url: "https://github.com/kirkegaard"
  },
  {
    icon: <FontAwesomeIcon icon={faInstagram} />,
    url: "http://instagram.com/christiank"
  },
  {
    icon: <FontAwesomeIcon icon={faLastfm} />,
    url: "http://last.fm/user/ranza"
  },
  {
    icon: <FontAwesomeIcon icon={faTwitter} />,
    url: "http://twitter.com/ranza"
  },
  {
    icon: <FontAwesomeIcon icon={faBehance} />,
    url: "http://www.behance.net/christiankirkegaard"
  },
  {
    icon: <FontAwesomeIcon icon={faTumblr} />,
    url: "http://knaegt.dk/"
  },
  {
    icon: <FontAwesomeIcon icon={faFacebook} />,
    url: "http://facebook.com/christian.kirkegaard"
  },
  {
    icon: <FontAwesomeIcon icon={faEnvelope} />,
    url: "mailto:christian@lowpoly.dk"
  }
];

const greetings = ["Hi friend", "Hi honey", "Hey buddy", "Hey man", "Hello there", "So, we meet again"];

const Header = () => {
  const greet = greetings[Random(0, greetings.length, true)];

  return (
    <header>
      <div className="container">
        <h1>{greet}</h1>
        <p>I'm Christian!</p>
        <p>I write small and fun generative graphics in various languages and frameworks like Javascript, Processing, and Open Frameworks.</p>
        <p>
          I'm obsessed with music and currently I'm listening to:
          <br />
          <LastFM username={"ranza"} limit={3} apikey={"d58933bda5ed830aee4ef6e8abbad0a9"} />
        </p>
        <p>
          Oh and I'm also a senior software developer at <a href="https://omnigame.dk">Omnigame</a>.
        </p>
        <hr />
        <ul>
          {links.map((link, index) => (
            <li key={index}>
              <a href={link.url}>{link.icon}</a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};

export default Header;
