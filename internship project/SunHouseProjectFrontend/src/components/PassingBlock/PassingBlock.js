import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Interweave } from 'interweave'
import ReactPlayer from 'react-player/youtube'
import { apiUrl } from '../../config'
import './PassingBlock.scss'

const PassingBlock = ({ event }) => {
  const course = useSelector(state => state.courses.course)
  const [numberOf, setNumberOf] = useState(0)

  useEffect(() => {
    course.modules.forEach(item => {
      const lessonIndex = item.data.findIndex(lessonAsd => lessonAsd._id === event._id)
      if (lessonIndex !== -1) setNumberOf(lessonIndex + 1)
    })
  }, [course, event])

  return (
    <div className="passing">
      <div className="passing_title">
        <p>Урок № {numberOf}</p>
        <h3>{event.title}</h3>
      </div>
      <div className="passing_block">
        <div className="passing_block__title">
          <p>Содержимое занятия</p>
        </div>
        <h6 className="passing_block__subtitle">{event.title}</h6>
        {event.data.map((content, index) => {
          switch (Object.keys(content)[0]) {
            case 'text':
              // eslint-disable-next-line react/no-danger
              return (
                <div key={`${index}textDW`} className="passing_block__text">
                  <Interweave content={content.text} />
                </div>
              )
            case 'video':
              return (
                <ReactPlayer
                  url={content.video}
                  controls
                  width="730px"
                  height="400px"
                  style={{ marginBottom: '32px' }}
                />
              )
            case 'audio':
              return (
                <audio key={index} controls>
                  <source src={`${apiUrl}/uploads/${content.audio}`} />
                  <track src={content.audio} kind="captions" srcLang="en" label="english_captions" />
                </audio>
              )
            default:
              return null
          }
        })}
        {event.file && (
          <div className="passing_block__files ">
            <p className="passing_block__files-title ">Прикреплённые файлы</p>
            <p className="passing_block__files-file">
              Файл:{' '}
              <a href={`${apiUrl}/uploads/${event.file}`} target="_blank" download rel="noreferrer">
                {event.file.slice(10)}
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default PassingBlock
