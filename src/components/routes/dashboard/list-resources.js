// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

import CollapsibleList from '../../common/list/collapsible-list'
import {
  allResourcesSelector,
  resourcesFinalFirmwareVersionsSelector,
} from '../../../selectors/resources-selectors'
import {
  fetchResources as fetchResourcesAction,
  deleteResource as deleteResourceAction,
  updateResource as updateResourceAction,
} from '../../../actions/resources-actions'
import { capitalizeFirst } from '../../../utils/string'

type Props = {
  resources: {
    [string]: Array<{}>,
  },
  final: Array<{ [string]: any }>,
  fetchResources: Function,
  deleteResource: Function,
  updateResource: Function,
}

type State = {}

class Resources extends React.Component<Props, State> {
  props: Props
  state: State

  componentDidMount() {
    const { fetchResources } = this.props
    fetchResources()
  }

  getSubItemKey = (key: string): string => {
    switch (true) {
      case key === 'firmwares':
        return 'se_firmware_final_versions'

      case key.endsWith('s'):
        return `${key.substring(0, key.length - 1)}_versions`

      default:
        return `${key}_versions`
    }
  }

  render(): React.Node {
    const { resources, deleteResource, updateResource, final } = this.props
    return (
      <React.Fragment>
        {Object.keys(resources)
          .sort()
          .map((key: string): React.Node => (
            <section key={key}>
              <Paper>
                <div className="title">
                  <Typography variant="title" color="secondary">
                    {capitalizeFirst(key)}
                  </Typography>
                </div>
                {key === 'publishers' || key === 'providers' || key === 'categories' ? (
                  <CollapsibleList
                    type={key}
                    items={resources[key]}
                    deleteResource={deleteResource}
                    updateResource={updateResource}
                  />
                ) : (
                  <CollapsibleList
                    type={key}
                    items={resources[key]}
                    subItemsKey={this.getSubItemKey(key)}
                    deleteResource={deleteResource}
                    updateResource={updateResource}
                  />
                )}
              </Paper>
            </section>
          ))}
        <section>
          <Paper>
            <div className="title">
              <Typography variant="title" color="secondary">
                Firmware OSU
              </Typography>
            </div>
            <CollapsibleList
              type="firmware_final_versions"
              items={final}
              subItemsKey="osu_versions"
              deleteResource={deleteResource}
              updateResource={updateResource}
            />
          </Paper>
        </section>

        <style jsx>{`
          section {
            margin: 20px 0;
          }

          .title {
            padding: 10px 12px;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: Object): Object => ({
  resources: allResourcesSelector(state),
  final: resourcesFinalFirmwareVersionsSelector(state),
})

export default connect(mapStateToProps, {
  fetchResources: fetchResourcesAction,
  deleteResource: deleteResourceAction,
  updateResource: updateResourceAction,
})(Resources)