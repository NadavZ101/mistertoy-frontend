import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


import { Link } from "react-router-dom"

export function ToyPreview({ toy, onRemoveToy }) {
    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="140"
                    image={`https://robohash.org/${toy.name}?set=set2`}
                    alt=""
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {toy.name}

                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: <span>${toy.price}</span>
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>

                <Link className="link" to={`/toy/edit/${toy._id}`}>Edit</Link>

                &nbsp; | &nbsp;

                <Link className="link" to={`/toy/${toy._id}`}>Details</Link>
                {/* <Button className="btn" onClick={() => onRemoveToy(toy._id)}></Button> */}

                &nbsp; | &nbsp;

                <DeleteIcon className="btn" onClick={() => onRemoveToy(toy._id)} />
                {/* <Button className="btn" onClick={() => onRemoveToy(toy._id)}>X</Button> */}
            </CardActions>
        </Card>
    )







    // return <article className="toy-preview">
    //     <h4>{toy.name}</h4>
    //     <p>Price: <span>${toy.price}</span></p>

    //     <Link to={`/toy/edit/${toy._id}`}>Edit✍️</Link>
    //     &nbsp; | &nbsp;
    //     <Link to={`/toy/${toy._id}`}>Details</Link>
    // </article>
}




