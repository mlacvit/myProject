import React from 'react'
import ReactAudioPlayer from 'react-audio-player'
import { apiUrl } from '../../../config'
import './AudioPlayer.scss'

const AudioPlayer = ({ audio }) => (
  <div className="audio-player">
    <div />
    <ReactAudioPlayer src={`${apiUrl}/uploads/${audio}`} controls style={{ marginBottom: '20px' }} />
  </div>
)

export default AudioPlayer
