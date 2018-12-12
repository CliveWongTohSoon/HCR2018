import * as React from 'react';
import { List, ListItem, ListItemText, MenuItem, Menu } from '@material-ui/core';
import { openMenu, closeMenu, updateStatus, selectMenu } from './action';
import { connect } from 'react-redux'; 
import { Dispatch } from 'redux';

const options = ["Please select a destination", "Samuel's Room", "Jin Yee's Room", "Guo Liang's Room"];
const offset = 51.224998;

const locationMap = [
    {
        pos_x: 66.7656402588 - offset,
        pos_y: 46.7647209167 - offset,
        pos_z: 0.00,
        orient_x: 0.00,
        orient_y: 0.00,
        orient_z: 0.223521280461,
        orient_w: 0.974699049543
    },
    {
        pos_x: 65.3328781128 - offset,
        pos_y: 49.8089485168 - offset,
        pos_z: 0.00,
        orient_x: 0.00,
        orient_y: 0.00,
        orient_z: 0.2477,
        orient_w: 0.9788
    },
    {
        pos_x: 64.1570129395 - offset,
        pos_y: 48.6008529663 - offset,
        pos_z: 0.00,
        orient_x: 0.00,
        orient_y: 0.00,
        orient_z: 0.966374223104,
        orient_w: -0.257139769229
    }
]

export namespace MenuList {
    export interface Props {
        socket: SocketIOClient.Socket;
        selectedIndex: number;
        anchorEl: any;
        postStatus: (socket: SocketIOClient.Socket, statusData: any) => (dispatch: Dispatch) => void;
        openMenu: (event: any) => Dispatch;
        closeMenu: () => Dispatch;
        select: (index: number) => Dispatch;
    }
}

export class MenuList extends React.Component<MenuList.Props> {

    handleClickListItem = (event: any) => {
        this.props.openMenu(event);
    };

    handleMenuItemClick = (index: number) => {
        const { postStatus, socket, select } = this.props;
        const locationData = locationMap[index-1];
        const statusData = {status: 'dispatch', data: locationData}
        // TODO:- locationData needs modified
        select(index);
        console.log(index);
        postStatus(socket, statusData);
        // selectMenu(index, socket);
    };

    handleClose = () => {
        this.props.closeMenu();
    };

    render() {
        const { selectedIndex, anchorEl } = this.props;

        return (
            <div>
                <List component="nav">
                    <ListItem
                        button
                        aria-haspopup="true"
                        aria-controls="lock-menu"
                        onClick={this.handleClickListItem}
                    >
                        <ListItemText
                            secondary={options[selectedIndex]}
                        />
                    </ListItem>
                </List>
                <Menu
                    id="lock-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    {options.map((option, index) => (
                        <MenuItem
                            key={option}
                            disabled={index === 0}
                            selected={index === selectedIndex}
                            onClick={event => this.handleMenuItemClick(index)}
                        >
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </div>
        );
    }
}

const mapStateToProps = (state: any) => ({
    selectedIndex: state.status.selectedIndex,
    anchorEl: state.status.anchorEl
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    openMenu: (event: any) => dispatch(openMenu(event)),
    closeMenu: () => dispatch(closeMenu()),
    postStatus: (socket: SocketIOClient.Socket, statusData: any) => updateStatus(socket, statusData)(dispatch),
    select: (index: number) => dispatch(selectMenu(index))
});

export default (connect(mapStateToProps, mapDispatchToProps) as any)(MenuList);
