import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const MovieItem = ({ title, releaseDate, posterUrl, id }) => {
  const navigate = useNavigate();
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const handleButtonClick = () => {
    if (isUserLoggedIn) {
      console.log("inside the handlechange");
      navigate(`/booking/${id}`);
    } else {
      navigate("/auth");
    }
  };
  return (
    <Card
      title={title}
      sx={{
        padding: 1,
        margin: 2,
        width: 250,
        height: "fit-content",
        borderRadius: 5,
        ":hover": {
          boxShadow: "10px 10px 20px #ccc",
        },
      }}
    >
      <div
        style={{
          height: "320px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <img height="100%" width="auto" src={posterUrl} alt={title} />
      </div>
      <CardContent>
        <Typography
          noWrap
          gutterBottom
          variant="h5"
          component="div"
          title={title}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(releaseDate).toDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          sx={{
            margin: "auto",
            bgcolor: "#F53163",
            ":hover": {
              bgcolor: "#121217",
            },
          }}
          onClick={handleButtonClick}
          Card="small"
        >
          Book
        </Button>
      </CardActions>
    </Card>
  );
};

export default MovieItem;
