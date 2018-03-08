import 'u2f-api-polyfill'

const U2F_ERROR_CODES = {
  1: 'OTHER_ERROR',
  2: 'BAD_REQUEST',
  3: 'CONFIGURATION_UNSUPPORTED',
  4: 'DEVICE_INELIGIBLE',
  5: 'TIMEOUT',
}

export const register = ({ appId, registerRequests, registeredKeys }) =>
  new Promise(resolve => {
    window.u2f.register(appId, registerRequests, registeredKeys, deviceChallenge => {
      if (deviceChallenge.errorCode) {
        const error = new Error({
          errorCode: deviceChallenge.error,
          message: U2F_ERROR_CODES[deviceChallenge.errorCode],
        })
        return resolve(error)
      }

      return resolve(deviceChallenge)
    })
  })

// export function registerDevice(challenge, u2f) {
// const promise = new Promise((resolve, reject) => {
//   fetch('http://localhost:3000', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: {
//       challenge: JSON.stringify(challenge),
//     },
//   })
// axios
//   .post('start_registration', JSON.stringify({ email: emailData }), {
//     headers: { 'Content-Type': 'application/json' },
//   })
//   .then(res => {
//     console.log('first')
//     console.log(res)
//     console.log(u2f.register)
//     u2f.register(
//       res.data.appId,
//       res.data.registerRequests,
//       res.data.registeredKeys,
//       deviceResponse => {
//         console.log('register over')
//         if (deviceResponse.errorCode) {
//           console.log('U2F ERROR: ', U2F_ERROR_CODES[deviceResponse.errorCode])
//         } else {
//           console.log(deviceResponse)
//           console.log('Verifying registration with server...')
//           axios
//             .post(
//               'finish_registration',
//               JSON.stringify({ email: emailData, response: deviceResponse }),
//               {
//                 headers: { 'Content-Type': 'application/json' },
//               },
//             )
//             .then(data => {
//               console.log(data)
//               resolve(data.responseText)
//             })
//             .catch(data => {
//               console.log('second')
//               console.log(data)
//               resolve(data.responseText)
//             })
//         }
//       },
//     )
//   })
//   .catch(e => {
//     console.log('zero')
//     console.log(e)
//     resolve(e)
//   })
// })
// return promise
// }

export const loginU2F = () => {}

// export function loginU2F(email, u2f) {
//   const promise = new Promise((resolve, reject) => {
//     const input_team = email
//     console.log('logging with', email)
//     axios
//       .post(
//         '/start_authentication', // add domain here from args or localstorage
//         JSON.stringify({ email: input_team }),
//         {
//           headers: { 'Content-Type': 'application/json' },
//         },
//       )
//       .then(res => {
//         console.log(res, 'logining')
//         u2f.sign(res.data.appId, res.data.challenge, res.data.registeredKeys, deviceResponse => {
//           if (deviceResponse.errorCode) {
//             console.log('U2F ERROR: ', U2F_ERROR_CODES[deviceResponse.errorCode])
//             reject(U2F_ERROR_CODES[deviceResponse.errorCode])
//           } else {
//             console.log('Verifying auth with server...')
//             axios
//               .post(
//                 '/finish_authentication',
//                 JSON.stringify({ email: input_team, response: deviceResponse }),
//                 {
//                   headers: { 'Content-Type': 'application/json' },
//                 },
//               )
//               .then(res1 => {
//                 console.log(res1)
//                 resolve(res1)
//               })
//               .catch(data => {
//                 reject(data)
//               })
//           }
//         })
//       })
//       .catch(data => {
//         reject(data)
//       })
//   })
//   return promise
// },
