import React from "react";
import Grid from "@mui/material/Grid";
import oneone from "assets/oneone.png";
import onen from "assets/onen.png";
import avata from "assets/avata.png";
import Box from "@mui/material/Box";

export default function AnnouncementStep1(props) {
  return (
    <div className="announcement-select" hidden={props.value !== 0}>
      <Grid container spacing={10} justifyContent="center" alignItems="center">
        <Grid item xs={4}>
          <Box
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
              },
            }}
          >
            <img src={oneone} alt="logo" width="100%" />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <img src={onen} alt="logo" width="100%" />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: [0.9, 0.8, 0.7],
              },
            }}
          >
            <img src={avata} alt="logo" width="100%" />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
