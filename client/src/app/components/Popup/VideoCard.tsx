import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import { connect } from 'react-redux'; 

const styles = (theme: any) => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 50,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor: red[500],
    }
});

export namespace RecipeReviewCard {
    export interface Props {
        classes: any;
        imgSrc: string;
    }
}

class RecipeReviewCard extends React.Component<RecipeReviewCard.Props> {

    constructor(props: any) {
        super(props);
    }

    render() {
        const { classes, imgSrc } = this.props;
        const img = new Image()
        img.src = imgSrc;

        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    title="Video Stream"
                    image={img.src}
                />
                <CardContent>
                    <Typography component="p">
                        Destination Arrived! Would you like to open?
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}

export const mapStateToProps = (state: any) => ({
    imgSrc: state.popup.src
});

export default (connect(mapStateToProps) as any)((withStyles(styles) as any)(RecipeReviewCard));
