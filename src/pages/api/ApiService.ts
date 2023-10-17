import axios, { AxiosResponse, Method } from 'axios'
import { handleError, handleResponse } from './ApiUtils'

const httpRequest = <T>(
  method: Method,
  url: string,
  request: any,
  headers: Record<string, string> = {}
): Promise<T> => {
  // Return a promise
  return axios({
    method,
    url,
    data: request,
    headers,
  })
    .then((res: AxiosResponse<T>) => {
      const result = handleResponse(res)
      return Promise.resolve(result)
    })
    .catch((err: any) => {
      return Promise.reject(handleError(err))
    })
}

const get = <T>(
  url: string,
  request?: any,
  headers: Record<string, string> = {}
): Promise<T> => {
  let queryString = ''
  if (request && Object.keys(request).length > 0) {
    queryString += '?'
    let len = Object.keys(request).length
    let cnt = 0

    // Transform the request object into a query string
    for (let key in request) {
      cnt++
      queryString += `${key}=${request[key].toString()}`
      if (len > cnt) queryString += '&'
    }
  }
  return httpRequest('get', `${url}${queryString}`, request, headers)
}

const deleteRequest = <T>(
  url: string,
  request: any,
  headers: Record<string, string> = {}
): Promise<T> => {
  return httpRequest('delete', url, request, headers)
}

const post = <T>(
  url: string,
  request: any,
  headers: Record<string, string> = {}
): Promise<T> => {
  return httpRequest('post', url, request, headers)
}

const put = <T>(
  url: string,
  request: any,
  headers: Record<string, string> = {}
): Promise<T> => {
  return httpRequest('put', url, request, headers)
}

const patch = <T>(
  url: string,
  request: any,
  headers: Record<string, string> = {}
): Promise<T> => {
  return httpRequest('patch', url, request, headers)
}

const Api = {
  get,
  delete: deleteRequest,
  post,
  put,
  patch,
}

export default Api
