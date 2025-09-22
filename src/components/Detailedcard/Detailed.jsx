import React, { useEffect, useState } from 'react'
import "./Detail.css"
import { useParams } from 'react-router'
import Navbar from '../Navbar/Navbar.jsx';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from 'react-router';
import Loading from '../loadingpage/Loading.jsx';

function Detailed() {
  const { id } = useParams()
  const [cardDetails, setCardDetails] = useState(null)
  const [selectedSong, setSelectedSong] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const cardindetail = () => {
    setIsLoading(true)
    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
    const options = { method: "GET" }

    const fn = async () => {
      const response = await fetch(url, options);
      const data = await response.json()

      if (response.ok) {
        const result = {
          name: data.name,
          description: data.description,
          imageUrl: data.images[0].url,
          songDetails: data.tracks.items.map(i => ({
            previewUrl: i.track.preview_url,
            songName: i.track.name,
            albumName: i.track.album.name,
            songreleaseDate: i.track.album.release_date,
            songImageUrl: i.track.album.images[0].url,
            artistName: i.track.artists[0].name,
            duration:
              Math.floor(i.track.duration_ms / 60000) + ":" +
              String(Math.floor((i.track.duration_ms % 60000) / 1000)).padStart(2, '0')
          }))
        }
        setCardDetails(result)
        setIsLoading(false)
      }
    }
    fn()
  }

  useEffect(cardindetail, [id])

  return (
    <>
      {isLoading && <Loading />}
      <Navbar />

      <div className='detailed-card-main-container'>
        <Link to={"/"}>
          <div className='back-btn-container'>
            <ArrowLeftIcon className='back-icon' />
            <h1 className='back-head'>Back</h1>
          </div>
        </Link>

        {cardDetails && (
          <div className='card-detailed-description-container'>
            <div className='card-img-container'>
              <img
                src={cardDetails.imageUrl}
                alt={cardDetails.name}
                className='detail-card-img'
              />
            </div>
            <div className='card-text-container'>
              <p className='editor-pick-text'>Editor's picks</p>
              <h1 className='card-name-head'>{cardDetails.name}</h1>
              <p className='card-description'>{cardDetails.description}</p>
            </div>
          </div>
        )}

        {cardDetails && (
          <div className='table-container'>
            <div className='table-header-container'>
              <span>#</span>
              <span>Track</span>
              <span>Album</span>
              <span>Time</span>
              <span>Artist</span>
              <span>Release Date</span>
            </div>

            <div className='table-row-container'>
              {cardDetails.songDetails.map((eachsong, index) => (
                <div
                  className='table-row'
                  key={index}
                  onClick={() => setSelectedSong(eachsong)}
                >
                  <span className="row-number">{index + 1}</span>
                  <span className="track-info">
                    <img
                      src={eachsong.songImageUrl}
                      alt={eachsong.songName}
                      className='song-img'
                    />
                    {eachsong.songName}
                  </span>
                  <span className="table-cell">{eachsong.albumName}</span>
                  <span className="table-cell">{eachsong.duration}</span>
                  <span className="table-cell">{eachsong.artistName}</span>
                  <span className="table-cell">{eachsong.songreleaseDate}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedSong && (
          <div className='audio-player-total-container'>
            <img src={selectedSong.songImageUrl} className='song-img-1' />
            <div className='audio-info'>
              <div className='audio-details-info'>
                <p className="now-playing">{selectedSong.songName}</p>
                <p className="artist-name">by {selectedSong.artistName}</p>
              </div>
              <audio controls autoPlay src={selectedSong.previewUrl} className='audio'></audio>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Detailed
