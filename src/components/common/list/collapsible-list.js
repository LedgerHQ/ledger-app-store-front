// @flow
/* globals SyntheticEvent */
import * as React from 'react'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'

import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Delete from 'material-ui-icons/Delete'
import Edit from 'material-ui-icons/ModeEdit'

import Table from '../table'
import DeleteDialog from '../dialog/delete-dialog'
import EditDialogConnected from '../dialog/edit-dialog'
import SuccessSnack from '../snackbar/success-snack'
import ErrorSnack from '../snackbar/error-snack'

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
  mode: 'edit' | 'delete' | '',
}

class CollapsibleList extends React.Component<Props, State> {
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
    mode: '',
  }

  toggleCollapse = (idx: number): Function => (evt: SyntheticEvent<HTMLButtonElement>): void => {
    evt.preventDefault()
    this.setState(state => ({
      ...state,
      selected: idx === state.selected ? -1 : idx,
    }))
  }

  openModal = (type: string, modal: string): Function => (item: Object): Function => (): void => {
    this.setState(state => ({
      ...state,
      [modal]: true,
      resource: item,
      type,
      mode: modal === 'editDialog' ? 'edit' : 'delete',
    }))
  }

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

  getSuccesMode = (): string => {
    const { mode } = this.state

    switch (mode) {
      case 'edit':
        return 'updated'
      case 'delete':
        return 'deleted'
      default:
        return ''
    }
  }

  getErrorMode = (): string => {
    const { mode } = this.state

    switch (mode) {
      case 'edit':
        return 'updating'
      case 'delete':
        return 'deleting'
      default:
        return ''
    }
  }

  getSubItemType = (key: string): string => {
    switch (key) {
      case 'se_firmware_final_versions':
        return 'firmware_final_versions'

      case 'osu_versions':
        return 'firmware_osu_versions'

      default:
        return key
    }
  }

  render() {
    const { items, subItemsKey, type, title, updateResource } = this.props

    if (type === 'applications') {
      console.log(items)
    }

    return (
      <React.Fragment>
        <List
          component="nav"
          subheader={!!title && <ListSubheader component="div">{title}</ListSubheader>}
        >
          {items.map((item, idx) => (
            <React.Fragment key={`${item.name}_${item.id}`}>
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
                        openEditModal={this.openModal(
                          this.getSubItemType(subItemsKey),
                          'editDialog',
                        )}
                        openDeleteModal={this.openModal(
                          this.getSubItemType(subItemsKey),
                          'deleteDialog',
                        )}
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

        <SuccessSnack mode={this.getSuccesMode()} />
        <ErrorSnack mode={this.getErrorMode()} />
      </React.Fragment>
    )
  }
}

export default CollapsibleList
