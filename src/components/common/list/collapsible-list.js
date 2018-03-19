// @flow
/* globals SyntheticEvent */
import * as React from 'react'
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'

import Table from '../table'

type Props = {
  items: Object[],
  subItemsKey: string,
  title?: string,
}
type State = {
  selected: number,
}

class CollapsibleList extends React.Component<Props, State> {
  props: Props
  state: State

  static defaultProps = {
    title: '',
  }

  state = {
    selected: -1,
  }

  toggleCollapse = (idx: number): Function => (evt: SyntheticEvent<HTMLButtonElement>): void => {
    evt.preventDefault()
    this.setState(state => ({
      ...state,
      selected: idx === state.selected ? -1 : idx,
    }))
  }

  render() {
    const { items, subItemsKey, title } = this.props
    return (
      <List
        component="nav"
        subheader={!!title && <ListSubheader component="div">{title}</ListSubheader>}
      >
        {items.map((item, idx) => (
          <React.Fragment key={item.name}>
            <ListItem button onClick={this.toggleCollapse(idx)}>
              <ListItemText primary={item.name} />
              {this.state.selected === idx ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={this.state.selected === idx} timeout="auto" unmountOnExit>
              <div>
                <Table items={item[subItemsKey]} />
              </div>
            </Collapse>
          </React.Fragment>
        ))}
      </List>
    )
  }
}

export default CollapsibleList
