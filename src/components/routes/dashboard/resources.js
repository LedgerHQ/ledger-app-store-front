// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

import Table from '../../common/table'
import CollapsibleList from '../../common/list/collapsible-list'
import {
  resourcesApplicationsSelector,
  resourcesFirmwaresSelector,
} from '../../../selectors/resources-selectors'

type Props = {
  applications: Object[],
  firmwares: Object[],
}

type State = {}

class Resources extends React.Component<Props, State> {
  props: Props
  state: State

  render(): React.Node {
    const { applications, firmwares } = this.props

    return (
      <React.Fragment>
        <section>
          <Paper>
            <div className="title">
              <Typography variant="title" color="secondary">
                Applications
              </Typography>
            </div>
            <CollapsibleList items={applications} subItemsKey="app_version" />
          </Paper>
        </section>
        <section>
          <Paper>
            <div className="title">
              <Typography variant="title" color="secondary">
                Firmwares Versions
              </Typography>
            </div>
            <Table items={firmwares} />
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
  applications: resourcesApplicationsSelector(state) || [],
  firmwares: resourcesFirmwaresSelector(state) || [],
})

export default connect(mapStateToProps)(Resources)
