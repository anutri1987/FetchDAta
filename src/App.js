import React, { useEffect, useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary
  }));

  useEffect(() => {
    const loadPost = async () => {
      setLoading(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/posts/"
      );

      setPosts(response.data);

      setLoading(false);
    };

    loadPost();
  }, []);
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {loading ? (
            <h4>Loading...</h4>
          ) : (
            posts.map((item) => (
              <Grid item xs={4}>
                <Card variant="outlined">
                  <Typography variant="h6" component="div">
                    {item.body}
                  </Typography>
                  <CardContent>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                      component="div"
                    >
                      {item.title}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      </Box>
    </div>
  );
}
