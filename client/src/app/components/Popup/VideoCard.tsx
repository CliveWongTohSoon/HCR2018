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
        socket: SocketIOClient.Socket;
    }
}

class RecipeReviewCard extends React.Component<RecipeReviewCard.Props> {

    constructor(props: any, public image: HTMLImageElement) {
        super(props);
        const { socket }: any = props;
        // Change this to http since it's static
        socket.on('image', (data: any) => {
            this.image = new Image();
            this.image.src = `data:image/jpeg;base64,${data}`;
        })
    }

    render() {
        const { classes }: any = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                    title="Video Stream"
                    image={this.image.src}
                    src={this.image.src}
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

export default (withStyles(styles) as any)(RecipeReviewCard);
