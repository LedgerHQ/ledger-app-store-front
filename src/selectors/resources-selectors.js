// @flow
import { createSelector } from 'reselect'

export const resourcesSelector = (state: Object): Object => state.resources || {}

export const resourcesApplicationsSelector = createSelector(
  resourcesSelector,
  resources => resources.applications || [],
)

export const resourcesFirmwaresSelector = createSelector(
  resourcesSelector,
  resources => resources.firmwares || [],
)

export const resourcesErrorSelector = createSelector(
  resourcesSelector,
  resources => resources.error || '',
)

export const resourcesActiveSelector = createSelector(
  resourcesSelector,
  resources => resources.active || '',
)

export const applicationsListSelector = createSelector(
  resourcesApplicationsSelector,
  (applications: Object[]): string[] => applications.map(app => app.name) || [],
)

export const selectedApplicationSelector = createSelector(
  resourcesApplicationsSelector,
  resourcesActiveSelector,
  (applications: Object[], active: string) => applications.find(app => app.name === active) || {},
)
