import "./Newreledetail.css"
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../Navbar/Navbar';
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { Link } from 'react-router-dom';
import Loading from '../loadingpage/Loading';

function Newreledetail() {
  const { id } = useParams();
  const [albumDetails, setAlbumDetails] = useState(null)
  const [selectedSong, setSelectedSong] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const newReleasefun = () => {
    setIsLoading(true)
    const url = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`

    const fn = async () => {
      const response = await fetch(url)
      const data = await response.json()

      if (response.ok) {
        const result = {
          name: data.name,
          popularity: data.popularity,
          releaseDate: data.release_date,
          imageUrl: data.images[0].url,
          artistName: data.artists[0].name,
          songDetails: data.tracks.items.map((i) => ({
            songDuration:
              Math.floor(i.duration_ms / 60000) + ":" +
              String(Math.floor((i.duration_ms % 60000) / 1000)).padStart(2, '0'),
            songUrl: i.preview_url,
            songName: i.name,
          })),
        }
        setAlbumDetails(result)
        setIsLoading(false)
      }
    }
    fn()
  }

  useEffect(newReleasefun, [id])

  return (
    <>
      {isLoading && <Loading />}
      <Navbar />
      <div className='newrelease-card-main-container-2'>
        <Link to={"/"}>
          <div className='back-btn-container-2'>
            <ArrowLeftIcon className='back-icon-2' />
            <h1 className='back-head-2'>Back</h1>
          </div>
        </Link>

        {albumDetails && (
          <div className='card-detailed-description-container-2'>
            <div className='card-img-container-2'>
              <img
                src={albumDetails.imageUrl}
                alt={albumDetails.name}
                className='detail-card-img-2'
              />
            </div>
            <div className='card-text-container-2'>
              <p className='editor-pick-text-2'>New Release</p>
              <h1 className='card-name-head-2'>{albumDetails.name}</h1>
              <p className='card-description-2'>
                By {albumDetails.artistName} • Released on {albumDetails.releaseDate}
              </p>
              <p className='card-description-2'>Popularity: {albumDetails.popularity}</p>
            </div>
          </div>
        )}

        {albumDetails && (
          <div className='table-container-2'>
            <div className='table-header-container-2'>
              <span>#</span>
              <span>Track</span>
              <span>Time</span>
            </div>

            <div className='table-row-container-2'>
              {albumDetails.songDetails.map((song, index) => (
                <div
                  className='table-row-2'
                  key={index}
                  onClick={() => setSelectedSong(song)}
                >
                  <span>{index + 1}</span>
                  <span className='clickable-2'>{song.songName}</span>
                  <span>{song.songDuration}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedSong && (
          <div className='audio-player-total-container-2'>
            <div className='audio-info-2'>
              <img src={albumDetails.imageUrl}
                alt={albumDetails.name} className="song-img-small"/>
                <div className='audio-details-info-2'>
                <p className="now-playing-2"> {selectedSong.songName}</p>
                <p className="artist-name-2">by {albumDetails.artistName}</p>
              </div>
              <audio controls autoPlay src={selectedSong.songUrl} className='audio-2'></audio>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Newreledetail
