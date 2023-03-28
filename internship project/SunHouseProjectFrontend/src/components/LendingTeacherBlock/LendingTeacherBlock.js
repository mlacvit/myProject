import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TeachersBlock from '../TeachersBlock/TeachersBlock'
import { fetchTeachersRequest } from '../../store/actions/lendingTeachersActions'
import { CreateNewObject } from '../../utils/utils'

const LendingTeacherBlock = () => {
  const dispatch = useDispatch()
  const teachers = useSelector(state => state.teachers.teachers)
  const newTeachers = CreateNewObject(teachers)
  useEffect(() => {
    dispatch(fetchTeachersRequest())
  }, [dispatch])
  return (
    <TeachersBlock
      title="Преподаватели — <span>практикующие эксперты</span>"
      subtitle="Доверьте свое обучение специалистам"
      teachers={newTeachers}
    />
  )
}

export default LendingTeacherBlock
