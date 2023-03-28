import React from 'react'
import Paragraph from '../Paragraph/Paragraph'
import CardProgram from './CardProgram/CardProgram'
import './CourseProgram.scss'

const CourseProgram = ({ teacherCheck, modules, block, onVisibilityBlock }) => (
  <div className="program-block">
    <Paragraph
      title="Программа курса"
      subtitle={block.description}
      teacherCheck={teacherCheck}
      type="blockModules"
      isVisibility={block.visibility}
      onVisibility={onVisibilityBlock}
    />
    <div className="program-block__cards">
      {modules && modules.map(item => <CardProgram key={item._id} title={item.title} content={item.data} />)}
    </div>
  </div>
)

export default CourseProgram
