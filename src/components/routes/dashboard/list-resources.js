// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import isEmpty from 'ramda/src/isEmpty'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

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

type Icon = {
  id: number,
  name: string,
  file: string,
}

type Props = {
  resources: {
    [string]: Array<{}>,
    icons: Array<Icon>,
  },
  final: Array<{ [string]: any }>,
  fetchResources: Function,
  deleteResource: Function,
  updateResource: Function,
}

type State = {
  tab: number,
  resourcesName: string[],
}

const FIRMWARE_OSU = 'firmwares osu'

class Resources extends React.Component<Props, State> {
  state = {
    tab: -1,
    resourcesName: [],
  }

  componentDidMount() {
    const { fetchResources } = this.props
    fetchResources()
  }

  componentDidUpdate() {
    const { resources } = this.props
    if (!isEmpty(resources) && this.state.resourcesName.length === 0) {
      const names = Object.keys(resources)
      names.push(FIRMWARE_OSU)
      names.sort()
      this.setUpNames(names)
    }
  }

  handleChange = (evt: *, tab: number) => this.setState({ tab })
  setUpNames = (resourcesName: string[]) => this.setState({ resourcesName, tab: 0 })

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

  renderTabContent = () => {
    const { tab, resourcesName } = this.state
    const { resources, deleteResource, updateResource, final } = this.props

    if (tab === -1) {
      return null
    }

    const current = resourcesName[tab]

    if (current === FIRMWARE_OSU) {
      return (
        <CollapsibleList
          resources={resources}
          type="firmware_final_versions"
          items={final}
          subItemsKey="osu_versions"
          deleteResource={deleteResource}
          updateResource={updateResource}
        />
      )
    }

    if (
      current === 'publishers' ||
      current === 'providers' ||
      current === 'categories' ||
      current === 'icons'
    ) {
      return (
        <CollapsibleList
          resources={resources}
          type={current}
          items={resources[current]}
          deleteResource={deleteResource}
          updateResource={updateResource}
        />
      )
    }

    return (
      <CollapsibleList
        resources={resources}
        type={current}
        items={resources[current]}
        subItemsKey={this.getSubItemKey(current)}
        deleteResource={deleteResource}
        updateResource={updateResource}
      />
    )
  }

  render(): React.Node {
    const { tab, resourcesName } = this.state

    return (
      <React.Fragment>
        <Paper>
          <Tabs
            value={tab}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
            scrollButtons="auto"
          >
            {resourcesName.map((name: string): React.Node => <Tab key={name} label={name} />)}
          </Tabs>
        </Paper>
        <Paper style={{ padding: 8 * 3, margin: '20px 0' }}>{this.renderTabContent()}</Paper>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: Object): Object => ({
  resources: allResourcesSelector(state),
  final: resourcesFinalFirmwareVersionsSelector(state),
})

export default connect(
  mapStateToProps,
  {
    fetchResources: fetchResourcesAction,
    deleteResource: deleteResourceAction,
    updateResource: updateResourceAction,
  },
)(Resources)
