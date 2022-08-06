import request from '@/utils/request'
export const getAllAds = params => {
  return request({
    method: 'get',
    url: '/front/ad/space/getAllSpaces',
    params
  })
}
export const getQueryCourses = data => {
  return request({
    method: 'Post',
    url: '/boss/course/getQueryCourse',
    data
  })
}
export const getPurchaseCourse = data => {
  return request({
    method: 'get',
    url: '/front/course/getPurchaseCourse',
    data
  })
}
export const getCourseById = params => {
  return request({
    method: 'get',
    url: '/front/course/getCourseById',
    params
  })
}
export const getSessionAndLesson = params => {
  return request({
    method: 'get',
    url: '/front/course/session/getSectionAndLesson',
    params
  })
}
export const getVideoInfo = params => {
  return request({
    method: 'get',
    url: '/front/course/media/videoPlayInfo',
    params
  })
}
