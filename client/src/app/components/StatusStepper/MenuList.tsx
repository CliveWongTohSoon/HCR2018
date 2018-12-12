import * as React from 'react';
import { List, ListItem, ListItemText, MenuItem, Menu } from '@material-ui/core';
import { openMenu, closeMenu, updateStatus, selectMenu } from './action';
import { connect } from 'react-redux'; 
import { Dispatch } from 'redux';

const options = ["Please select a destination", "Room 508", "Room 507", "Docking Area"];

const locationMap = [
    {
        pos_x: 6.37785959244,
        pos_y: -1.27935290337,
        pos_z: 0.00,
        orient_x: 0.00,
        orient_y: 0.00,
        orient_z: 0.207591423898,
        orient_w: 0.978215620773
    },
    {
        pos_x: 5.26348829269,
        pos_y: 1.72698867321,
        pos_z: 0.00,
        orient_x: 0.00,
        orient_y: 0.00,
        orient_z: 0.214523431334,
        orient_w: 0.97676718842558
    },
    {
        pos_x: 3.64510726929,
        pos_y: -7.12953662872,
        pos_z: 0.00,
        orient_x: 0.00,
        orient_y: 0.00,
        orient_z: 0.853072113367,
        orient_w: 0.521793033104
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
