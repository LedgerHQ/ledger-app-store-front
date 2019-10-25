/* eslint-disable no-shadow */

const fetch = require('node-fetch')
const fs = require('fs')
const semver = require('semver')

if (!process.env.APP_STORE_TOKEN) {
  throw new Error('You need a APP_STORE_TOKEN env var')
}

const API_URL = 'https://manager.api.live.ledger.com/api'

async function fetchJSON(endpoint) {
  const url = `${API_URL}${endpoint}`
  const res = await fetch(url, {
    headers: {
      authorization: `Token ${process.env.APP_STORE_TOKEN}`,
    },
  })
  const data = await res.json()
  return data
}

async function main() {
  const [apps, providers, firmwares] = await Promise.all([
    fetchJSON('/applications'),
    fetchJSON('/providers'),
    fetchJSON('/firmwares'),
  ])

  apps.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1))

  const final = providers.map(provider => {
    const providerID = provider.id
    return {
      provider: providerID,
      firmwares: firmwares.map(firmware => {
        const finals = firmware.se_firmware_final_versions
        finals.sort((a, b) => {
          const vA = semver.valid(a.name) ? a.name : a.version
          const vB = semver.valid(b.name) ? b.name : b.version
          return semver.gt(vA, vB) ? 1 : semver.lt(vA, vB) ? -1 : 0 // eslint-disable-line no-nested-ternary
        })
        return {
          name: firmware.name,
          finals: finals.filter(final => final.providers.find(p => p === providerID)).map(final => {
            const allAppVersions = apps.reduce((acc, app) => {
              app.application_versions.forEach(appVersion => {
                const identifier = `${appVersion.name} ${appVersion.version}`
                if (!appVersion.providers.find(p => p === providerID)) {
                  return
                }
                if (!appVersion.se_firmware_final_versions.find(f => f === final.id)) {
                  return
                }
                acc.push(identifier)
              })
              return acc
            }, [])
            return {
              version: final.name,
              applications: allAppVersions,
            }
          }),
        }
      }),
    }
  })

  let res = [
    `"Extracted on ${new Date().toISOString()}`,
    '',
    `"PROVIDER","FIRMWARE","FINAL","APPLICATIONS"`,
  ]

  final.forEach(provider => {
    provider.firmwares.forEach(firmware => {
      firmware.finals.forEach(final => {
        res.push(
          [
            `"${provider.provider}"`,
            `"${firmware.name}"`,
            `"${final.version}"`,
            `"${final.applications.join(' | ')}"`,
          ].join(','),
        )
      })
    })
  })

  res = `${res.join('\n')}\n`

  const fileName = `extract-${new Date().toISOString().substr(0, 10)}.csv`
  fs.writeFileSync(fileName, res)
  console.log(`saved ${fileName}`) // eslint-disable-line no-console
}

main()
