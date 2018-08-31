// @fow
/* globals SyntheticEvent */

type Evt = {
  target?: {
    value: *,
  },
  currentTarget?: {
    value: *,
  },
  preventDefault?: () => void,
}

export const makeEventObject: SyntheticEvent<*> = (evt: Evt, value: *) => ({
  ...evt,
  target: {
    ...evt.target,
    ...evt.currentTarget,
    value,
  },
  currentTarget: {
    ...evt.currentTarget,
    ...evt.target,
    value,
  },
  preventDefault: evt.preventDefault || (() => null),
})

export default {
  makeEventObject,
}
