import { Redirect, Route } from 'react-router-dom'
import React from 'react'

export const ProtectedRoute = ({ isAllowed, redirectTo, ...props }) =>
  isAllowed ? <Route {...props} /> : <Redirect to={redirectTo} />

export const CreateNewObject = teachers => {
  const newTeachers = []
  teachers.map(teacher => {
    newTeachers.push({
      user: { _id: teacher._id, avatar: teacher.image, username: teacher.name },
      description: teacher.description,
    })
    return teacher
  })
  return newTeachers
}
