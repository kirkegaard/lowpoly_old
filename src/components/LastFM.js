import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompactDisc } from '@fortawesome/free-solid-svg-icons';

const LastFM = ({apikey, username, limit = 3}) => {
  const [latestArtists, setLatestArtists] = useState();
  const endpoint = `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${username}&period=7day&limit=${limit}&api_key=${apikey}&format=json`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error('error');
      })
      .then(data => setLatestArtists(data.topartists.artist))
      .catch(() => {
        setLatestArtists({error: 'I dont know?!'})
      });
  }, [endpoint]);

  if (!latestArtists) {
    return <span><FontAwesomeIcon icon={faCompactDisc} spin /></span>;
  }

  const latest = latestArtists
    .map((item, index) => {
      return (
        <a
          key={index}
          title={`Played: ${item.playcount}`}
          href={item.url}
        >
          {item.name}
        </a>
      )
    })
    .reduce((prev, curr) => {
      const sep = (curr.key === `${latestArtists.length - 1}`) ? ' & ' : ', ';
      return [prev, sep, curr]
    });

  return (
    <React.Fragment>
      {latest}.
    </React.Fragment>
  );
};

export default LastFM;