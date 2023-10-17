import { AxiosResponse } from 'axios'

export function handleResponse(response: AxiosResponse<any, any>) {
  if (
    response.status === 200 ||
    response.status === 202 ||
    response.statusText === 'OK' ||
    response.statusText === 'Created'
  )
    return response.data
  if (response.status === 400) {
    // Server side validation returns a string error message
    // parse as text instead of json.
    const error = response.statusText
    throw new Error(error)
  }
  throw new Error('Network response was not ok.')
}

// Error logging service goes here
export function handleError(error: Error) {
  console.error('API call failed. ' + error.message)
  throw error
}
