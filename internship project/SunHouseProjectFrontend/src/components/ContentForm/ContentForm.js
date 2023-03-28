import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactPlayer from 'react-player/youtube'
import { useDispatch } from 'react-redux'
import { Interweave } from 'interweave'
import { ToastAlert } from '../UI/Toast/ToastAlert'
import FilesUploader from '../FilesUploader/FilesUploader'
import AddContentBlock from '../AddContentBlock/AddContentBlock'
import SunEditorWYSIWYG from '../UI/SunEditorWYSIWYG/SunEditorWYSIWYG'
import VideoInput from '../VideoInput/VideoInput'
import MainButton from '../UI/MainButton/MainButton'
import { apiUrl } from '../../config'
import AudioPlayer from '../UI/AudioPlayer/AudioPlayer'
import { deleteLessonRequest } from '../../store/actions/lessonsActions'
import { deleteTaskRequest } from '../../store/actions/tasksActions'
import './ContentForm.scss'

const ContentForm = ({ contentData, contentId, handleSave }) => {
  const { courseId } = useParams()
  const dispatch = useDispatch()
  const [data, setData] = useState([{ title: contentData.title }, ...contentData.data])
  const [lastFile, setLastFile] = useState('')
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    if (data.length) {
      const index = data.length - 1
      const dataLastFile = data[index]

      if (Object.keys(dataLastFile)[0] === 'file') {
        const { file } = data.splice(index, 1)[0]
        setLastFile(file)
      }
    }
  }, [data])

  const handleAddContent = type => {
    setData([...data, { [type]: '' }])
  }

  const inputChangeHandler = (e, index) => {
    setData(prevState => {
      const contentCopy = {
        ...prevState[index],
        text: e,
      }

      return prevState.map((content, i) => {
        if (index === i) {
          return contentCopy
        }
        return content
      })
    })
  }

  const videoChangeHandler = (e, index) => {
    const { value } = e.target

    setData(prevState => {
      const contentCopy = {
        ...prevState[index],
        video: value,
      }

      return prevState.map((content, i) => {
        if (index === i) {
          return contentCopy
        }
        return content
      })
    })
  }

  const fileChangeHandler = (e, index) => {
    const file = e.target.files[0]

    setData(prevState => {
      const contentCopy = {
        ...prevState[index],
        audio: file,
      }

      return prevState.map((content, i) => {
        if (index === i) {
          return contentCopy
        }
        return content
      })
    })
  }

  const lastFileChangeHandler = e => {
    const maxSize = 2147483648
    const fileSize = e.target.files[0].size

    if (fileSize > maxSize) {
      return ToastAlert({
        icon: 'error',
        title: 'Выберите файл не более 2 гигабайт',
        timer: 3000,
      })
    }

    const file = e.target.files[0]
    return setLastFile(file)
  }

  const onClickSave = () => {
    const formData = new FormData()
    let checkContent = true
    let checkVideoLink = true
    data.forEach(elem => {
      Object.keys(elem).forEach(key => {
        if (!elem[key]) {
          checkContent = false
          return null
        }

        if (key === 'video' && !ReactPlayer.canPlay(elem[key])) {
          checkVideoLink = false
          return null
        }

        if (key === 'audio' && typeof elem[key] !== 'string') {
          return formData.append(key, elem[key])
        }

        return null
      })
    })

    if (!checkContent) {
      return ToastAlert({
        icon: 'error',
        title: 'Заполните все поля!',
        timer: 2000,
      })
    }

    if (!checkVideoLink) {
      return ToastAlert({
        icon: 'error',
        title: 'Ссылка на видео не действительна',
        timer: 2000,
      })
    }

    if (lastFile) {
      if (typeof lastFile !== 'string') {
        formData.append('file', lastFile)
      }
      formData.append('payload', JSON.stringify([...data, { file: lastFile }]))
    } else {
      formData.append('payload', JSON.stringify(data))
    }

    return handleSave({ courseId, contentId, data: formData })
  }

  const handlePreview = () => {
    setPreview(!preview)
  }

  const handleClickDelete = () => {
    switch (contentData.type) {
      case 'lesson':
        dispatch(deleteLessonRequest({ lessonId: contentData._id, courseId }))
        break
      case 'task':
        dispatch(deleteTaskRequest({ taskId: contentData._id, courseId }))
        break
      default:
        break
    }
  }

  return (
    <>
      {contentData && (
        <>
          <div className="content-form">
            <h1 className="content-form__title">{contentData?.title}</h1>
            <button type="button" className="content-form__remove" onClick={handleClickDelete}>
              <i>
                <svg width="12" height="16" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.15273 0.0750122C7.42148 0.253137 6.82617 0.759387 6.41367 1.56095L6.1793 2.01564H4.65586C3.01992 2.01564 2.86523 2.03439 2.38711 2.26876C1.74492 2.58751 1.23867 3.2297 1.06992 3.94689C0.971484 4.35939 0.971484 5.53126 1.06992 5.71876C1.22461 6.01876 0.568359 6.00001 9.99961 6.00001C19.4309 6.00001 18.7746 6.01876 18.9293 5.71876C19.0277 5.53126 19.0277 4.35939 18.9293 3.94689C18.7605 3.2297 18.2543 2.58751 17.6121 2.26876C17.134 2.03439 16.9793 2.01564 15.3434 2.01564H13.8199L13.5855 1.56095C13.1684 0.750012 12.5777 0.24845 11.823 0.0703249C11.4059 -0.0281129 8.56523 -0.0234256 8.15273 0.0750122Z"
                    fill="#D1D1D6"
                  />
                  <path
                    d="M2.37678 7.01719C2.32053 7.02656 2.2174 7.10156 2.1424 7.17656L2.00647 7.31719V14.1469C2.00647 21.8719 1.97365 21.2297 2.39084 22.0781C2.57365 22.4531 2.68147 22.5938 3.03772 22.95C3.41272 23.3297 3.52053 23.4094 3.95178 23.6156C4.22365 23.7469 4.56115 23.8781 4.70178 23.9156C4.90803 23.9625 5.94397 23.9766 9.99865 23.9766C14.0533 23.9766 15.0893 23.9625 15.2955 23.9156C15.4362 23.8781 15.7737 23.7469 16.0455 23.6156C16.4768 23.4094 16.5846 23.3297 16.9596 22.95C17.3158 22.5938 17.4237 22.4531 17.6065 22.0781C18.0237 21.2297 17.9908 21.8719 17.9908 14.1469V7.3125L17.8362 7.1625L17.6862 7.00781L10.0783 7.00312C5.89709 6.99844 2.42834 7.00781 2.37678 7.01719ZM5.82678 8.14687C5.91584 8.23594 5.9674 8.34844 5.99084 8.48906C6.0049 8.60156 6.01428 11.3859 6.0049 14.6719C5.99084 20.3766 5.98615 20.6531 5.90647 20.775C5.72365 21.0469 5.27365 21.0469 5.09084 20.775C5.01115 20.6531 5.00647 20.3766 4.9924 14.6719C4.98303 11.3859 4.9924 8.60156 5.00647 8.48906C5.04865 8.19844 5.23615 8.01562 5.49865 8.01562C5.64865 8.01562 5.72365 8.04375 5.82678 8.14687ZM8.82678 8.14687C8.91584 8.23594 8.9674 8.34844 8.99084 8.48906C9.0049 8.60156 9.01428 11.3859 9.0049 14.6719C8.99084 20.3766 8.98615 20.6531 8.90647 20.775C8.72365 21.0469 8.27365 21.0469 8.09084 20.775C8.01115 20.6531 8.00646 20.3766 7.9924 14.6719C7.98303 11.3859 7.9924 8.60156 8.00646 8.48906C8.04865 8.19844 8.23615 8.01562 8.49865 8.01562C8.64865 8.01562 8.72365 8.04375 8.82678 8.14687ZM11.8268 8.14687C11.9158 8.23594 11.9674 8.34844 11.9908 8.48906C12.0049 8.60156 12.0143 11.3859 12.0049 14.6719C11.9908 20.3766 11.9862 20.6531 11.9065 20.775C11.7237 21.0469 11.2737 21.0469 11.0908 20.775C11.0112 20.6531 11.0065 20.3766 10.9924 14.6719C10.983 11.3859 10.9924 8.60156 11.0065 8.48906C11.0487 8.19844 11.2362 8.01562 11.4987 8.01562C11.6487 8.01562 11.7237 8.04375 11.8268 8.14687ZM14.8268 8.14687C14.9158 8.23594 14.9674 8.34844 14.9908 8.48906C15.0049 8.60156 15.0143 11.3859 15.0049 14.6719C14.9908 20.3766 14.9862 20.6531 14.9065 20.775C14.7237 21.0469 14.2737 21.0469 14.0908 20.775C14.0112 20.6531 14.0065 20.3766 13.9924 14.6719C13.983 11.3859 13.9924 8.60156 14.0065 8.48906C14.0487 8.19844 14.2362 8.01562 14.4987 8.01562C14.6487 8.01562 14.7237 8.04375 14.8268 8.14687Z"
                    fill="#D1D1D6"
                  />
                </svg>
              </i>
            </button>
            <p className="content-form__editor-title">Содержимое занятия</p>
            {data.map((content, index) => {
              switch (Object.keys(content)[0]) {
                case 'text':
                  return (
                    <div key={`${index}textDW`}>
                      {preview ? (
                        <div className="content-form__text">
                          <Interweave content={content.text} />
                        </div>
                      ) : (
                        <div className="content-form__editor content-form__item">
                          <SunEditorWYSIWYG setContents={content.text} onChange={e => inputChangeHandler(e, index)} />
                        </div>
                      )}
                    </div>
                  )
                case 'video':
                  return preview ? (
                    <div key={`${index}videoDWA`} className="video-input">
                      <ReactPlayer url={content.video} controls config={{ origin: 'http://localhost:3000' }} />
                    </div>
                  ) : (
                    <VideoInput
                      key={`${index}videoDwa`}
                      value={content.video}
                      onChange={e => videoChangeHandler(e, index)}
                    />
                  )
                case 'audio':
                  return (
                    <div key={`${index}audioDWA`}>
                      {preview ? (
                        <AudioPlayer audio={content.audio} />
                      ) : (
                        <FilesUploader
                          title={typeof content.audio === 'string' && content.audio}
                          type="audio"
                          className="content-form__item"
                          onChange={fileChangeHandler}
                          index={index}
                        />
                      )}
                    </div>
                  )
                default:
                  return null
              }
            })}
            {!preview && <AddContentBlock addContent={handleAddContent} className="content-form__item" />}
            {(!preview || contentData.file) && (
              <div className="content-form__files ">
                <p className="content-form__files-title ">Прикреплённые файлы</p>
                {contentData.file && (
                  <p className="content-form__files-file">
                    Файл:{' '}
                    <a href={`${apiUrl}/uploads/${contentData.file}`} target="_blank" download rel="noreferrer">
                      {contentData.file}
                    </a>
                  </p>
                )}
                {!preview && <FilesUploader type="file" onChange={lastFileChangeHandler} />}
              </div>
            )}
          </div>
          <div className="content-form__buttons">
            <MainButton
              className="WhiteButton content-form__button"
              type="button"
              onClick={handlePreview}
              text={!preview ? 'Предосмотр' : 'Редактирование'}
            />
            <MainButton
              className="GreenButton content-form__button"
              type="button"
              onClick={onClickSave}
              text="Сохранить"
            />
          </div>
        </>
      )}
    </>
  )
}

export default ContentForm
