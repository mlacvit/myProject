import { createAction } from '@reduxjs/toolkit'

export const historyPush = createAction('history/push')
export const historyReplace = createAction('history/replace')
