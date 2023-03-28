import React from 'react'
import './AddContentBlock.scss'

const AddContentBlock = ({ addContent, ...props }) => (
  <div className={`add-content-block${props.className ? ` ${props.className}` : ''}`}>
    <h3 className="add-content-block__title">Добавить контент</h3>
    <div className="add-content-block__types">
      <button
        className="add-content-block__type add-content-block__type--text"
        type="button"
        onClick={() => addContent('text')}
      >
        <p className="add-content-block__type-label">Text</p>
      </button>
      <button
        className="add-content-block__type add-content-block__type--video"
        type="button"
        onClick={() => addContent('video')}
      >
        <p className="add-content-block__type-label">Video</p>
      </button>
      <button
        className="add-content-block__type add-content-block__type--audio"
        type="button"
        onClick={() => addContent('audio')}
      >
        <p className="add-content-block__type-label">Audio</p>
      </button>
    </div>
  </div>
)

export default AddContentBlock
