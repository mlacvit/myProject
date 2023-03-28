import React, { useRef, useState } from 'react'
import './FilesUploader.scss'

const FilesUploader = ({ ...props }) => {
  const inputRef = useRef()
  const [filename, setFilename] = useState('')

  const onFileChange = e => {
    if (e.target.files[0]) {
      setFilename(e.target.files[0].name)
    } else {
      setFilename('')
    }

    props.onChange(e, props.index)
  }

  const activateInput = () => {
    inputRef.current.click()
  }

  if (props.type === 'audio') {
    return (
      <div className={`audio-card uploader-block${props.className ? ` ${props.className}` : ''}`}>
        <input type="file" onChange={onFileChange} ref={inputRef} accept=".mp3" />
        <p className="uploader-block__label">{props.title || 'Перетащите .mp3 аудиофайл или нажмите для загрузки'}</p>
        <button className="MainButton GreenButton uploader-block__button" onClick={activateInput} type="button">
          Выбрать файл
        </button>
      </div>
    )
  }

  return (
    <div className={`file-card${props.className ? ` ${props.className}` : ''}`}>
      <input type="file" onChange={onFileChange} ref={inputRef} />
      <button className="file-card__button MainButton" onClick={activateInput} type="button">
        Прикрепить файл
      </button>
      <p className="file-card__placeholder">
        Любые файлы размером <br /> не более 2 гигабайт
      </p>
    </div>
  )
}

export default FilesUploader
