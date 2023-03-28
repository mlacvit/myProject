import React from 'react'
import SunEditor from 'suneditor-react'
import 'suneditor/dist/css/suneditor.min.css'
import './SunEditorWYSIWYG.scss'

const SunEditorWYSIWYG = props => (
  <SunEditor
    setContents={props.setContents}
    onChange={props.onChange}
    name={props.name}
    setOptions={{
      minHeight: 220,
      buttonList: [['font', 'formatBlock', 'fontSize', 'align', 'fontColor', 'table', 'list', 'image']],
      showPathLabel: false,
      resizeEnable: false,
      charCounter: true,
      charCounterLabel: 'Количество символов:',
      font: ['Gilroy', 'Arial', 'Comic Sans MS', 'Courier New', 'Impact', 'Georgia', 'Trebuchet MS', 'Verdana'],
    }}
    setDefaultStyle="font-family: Gilroy; font-size: 14px;"
  />
)

export default SunEditorWYSIWYG
