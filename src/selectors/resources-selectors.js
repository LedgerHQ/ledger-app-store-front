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

export const applicationsListSelector = createSelector(
  resourcesApplicationsSelector,
  (applications: Object[]): string[] => applications.map(app => app.name),
)

/**
 * TODO
 * CREATE A SELECTOR FOR EACH TYPE OF RESOURCE AND ITS LIST
 * ADD RESOURCES TO THE ALLRESOURCESELECTOR
 */

export const allResourcesSelector = createSelector(
  resourcesFirmwaresSelector,
  resourcesApplicationsSelector,
  (firmwares: Object[], applications: Object[]): Object => ({ firmwares, applications }),
)
