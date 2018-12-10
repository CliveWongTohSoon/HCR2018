import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';

const styles = (theme: any) => ({
    card: {
        maxWidth: 400,
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    actions: {
        display: 'flex',
    },
    avatar: {
        backgroundColor: red[500],
    }
});

class RecipeReviewCard extends React.Component {

    constructor(props: any) {
        super(props);
        const { socket }: any = props;
        socket.on('image', (data: any) => {
            console.log(data);
        })
    }

    render() {
        const { classes }: any = this.props;
        
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/paella.jpg"
                    title="Paella dish"
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

export default withStyles(styles)(RecipeReviewCard);
