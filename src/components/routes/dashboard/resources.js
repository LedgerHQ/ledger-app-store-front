// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Typography from 'material-ui/Typography'

// import CollapsibleList from '../../common/list/collapsible-list'
import { allResourcesSelector } from '../../../selectors/resources-selectors'
import { fetchResources as fetchResourcesAction } from '../../../actions/resources-actions'
import { capitalizeFirst } from '../../../utils/string'

type Props = {
  resources: {
    [string]: Array<{}>,
  },
  fetchResources: Function,
}

type State = {}

class Resources extends React.Component<Props, State> {
  props: Props
  state: State

  componentDidMount() {
    const { fetchResources } = this.props
    fetchResources()
  }

  render(): React.Node {
    const { resources } = this.props

    return (
      <React.Fragment>
        {Object.keys(resources).map((key: string): React.Node => (
          <section key={key}>
            <Paper>
              <div className="title">
                <Typography variant="title" color="secondary">
                  {capitalizeFirst(key)}
                </Typography>
              </div>
              {/* <CollapsibleList items={resources[key]} subItemsKey={getVersionKey(key)} /> */}
            </Paper>
          </section>
        ))}

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
})

export default connect(mapStateToProps, { fetchResources: fetchResourcesAction })(Resources)
