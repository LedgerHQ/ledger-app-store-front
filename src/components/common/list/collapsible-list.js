// @flow
/* globals SyntheticEvent */
import * as React from 'react'
import Collapse from 'material-ui/transitions/Collapse'
import IconButton from 'material-ui/IconButton'
import List, { ListItem, ListItemText, ListSubheader } from 'material-ui/List'

import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Delete from 'material-ui-icons/Delete'
import Edit from 'material-ui-icons/ModeEdit'

import Table from '../table'
import DeleteDialog from '../dialog/delete-dialog'
import EditDialogConnected from '../dialog/edit-dialog'

type Props = {
  items: Object[],
  subItemsKey?: string,
  title?: string,
  type: string,
  deleteResource: Function,
  updateResource: Function,
}
type State = {
  selected: number,
  deleteDialog: boolean,
  editDialog: boolean,
  resource?: Object,
  type: string,
}

class CollapsibleList extends React.Component<Props, State> {
  props: Props
  state: State

  static defaultProps = {
    title: '',
    subItemsKey: '',
  }

  state = {
    selected: -1,
    deleteDialog: false,
    editDialog: false,
    resource: undefined,
    type: '',
  }

  toggleCollapse = (idx: number): Function => (evt: SyntheticEvent<HTMLButtonElement>): void => {
    evt.preventDefault()
    this.setState(state => ({
      ...state,
      selected: idx === state.selected ? -1 : idx,
    }))
  }

  openModal = (type: string, modal: string): Function => (item: Object): Function => (): void =>
    this.setState(state => ({
      ...state,
      [modal]: true,
      resource: item,
      type,
    }))

  closeModal = (): void =>
    this.setState(state => ({
      ...state,
      deleteDialog: false,
      editDialog: false,
      resource: undefined,
      type: '',
    }))

  delete = (id: number | string): Function => (evt: SyntheticEvent<HTMLButtonElement>): void => {
    evt.preventDefault()
    const { deleteResource } = this.props
    const { type } = this.state
    deleteResource(type, id)
    this.closeModal()
  }

  render() {
    const { items, subItemsKey, type, title, updateResource } = this.props

    return (
      <React.Fragment>
        <List
          component="nav"
          subheader={!!title && <ListSubheader component="div">{title}</ListSubheader>}
        >
          {items.map((item, idx) => (
            <React.Fragment key={item.name}>
              {subItemsKey ? (
                <React.Fragment>
                  <ListItem>
                    <ListItemText primary={item.name} />
                    {item[subItemsKey].length > 0 && (
                      <IconButton onClick={this.toggleCollapse(idx)}>
                        {this.state.selected === idx ? <ExpandLess /> : <ExpandMore />}
                      </IconButton>
                    )}
                    <IconButton onClick={this.openModal(type, 'deleteDialog')(item)}>
                      <Delete />
                    </IconButton>
                    <IconButton onClick={this.openModal(type, 'editDialog')(item)}>
                      <Edit />
                    </IconButton>
                  </ListItem>
                  <Collapse in={this.state.selected === idx} timeout="auto" unmountOnExit>
                    <div>
                      <Table
                        items={item[subItemsKey]}
                        openEditModal={this.openModal(subItemsKey, 'editDialog')}
                        openDeleteModal={this.openModal(subItemsKey, 'deleteDialog')}
                      />
                    </div>
                  </Collapse>
                </React.Fragment>
              ) : (
                <ListItem>
                  <ListItemText primary={item.name} />
                  <IconButton onClick={this.openModal(type, 'deleteDialog')(item)}>
                    <Delete />
                  </IconButton>
                  <IconButton onClick={this.openModal(type, 'editDialog')(item)}>
                    <Edit />
                  </IconButton>
                </ListItem>
              )}
            </React.Fragment>
          ))}
        </List>
        <DeleteDialog
          open={this.state.deleteDialog}
          closeAction={this.closeModal}
          deleteAction={this.delete}
          resource={this.state.resource}
          type={this.state.type}
        />
        <EditDialogConnected
          open={this.state.editDialog}
          closeAction={this.closeModal}
          editAction={updateResource}
          resource={this.state.resource}
          type={this.state.type}
        />
      </React.Fragment>
    )
  }
}

export default CollapsibleList
