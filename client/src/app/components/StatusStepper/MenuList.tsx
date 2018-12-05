import * as React from 'react';
import { List, ListItem, ListItemText, MenuItem, Menu } from '@material-ui/core';
// import Button from '@material-ui/core/Button';
// import Paper from '@material-ui/core/Paper';
import { openMenu, closeMenu, selectMenu } from './action';
import { connect } from 'react-redux'; 
import { Dispatch } from 'redux';

const options = ["Please select a destination", "Samuel's Room", "Jin Yee's Room", "Guo Liang's Room"];

export namespace MenuList {
    export interface Props {
        selectedIndex: number;
        anchorEl: any;
        openMenu: (event: any) => Dispatch;
        closeMenu: () => Dispatch;
        selectMenu: (index: number) => Dispatch;
    }
}

export class MenuList extends React.Component<MenuList.Props> {

    handleClickListItem = (event: any) => {
        this.props.openMenu(event);
    };

    handleMenuItemClick = (index: number) => {
        console.log(index);
        this.props.selectMenu(index);
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
    selectMenu: (index: number) => dispatch(selectMenu(index))
});

export default (connect(mapStateToProps, mapDispatchToProps) as any)(MenuList);


