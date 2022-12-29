import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import VolumeUpRounded from "@mui/icons-material/VolumeUpRounded";
import VolumeDownRounded from "@mui/icons-material/VolumeDownRounded";
import { Box } from "@mui/material";
import RepeatOneIcon from "@mui/icons-material/RepeatOne";
import RepeatIcon from "@mui/icons-material/Repeat";
import ShuffleIcon from "@mui/icons-material/Shuffle";

const Widget = styled("div")(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: 343,
  maxWidth: "100%",
  margin: "auto",
  position: "relative",
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === "dark" ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.4)",
  backdropFilter: "blur(40px)",
}));

const CoverImage = styled("div")({
  width: 100,
  height: 100,
  objectFit: "cover",
  overflow: "hidden",
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: "rgba(0,0,0,0.08)",
  "& > img": {
    width: "100%",
  },
});

const TinyText = styled(Typography)({
  fontSize: "0.75rem",
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

const HomePage = () => {
  const musics = [
    {
      id: 1,
      single: "Karik, OnlyC",
      src: "data/CoChoiCoChiu.mp3",
      name: "Có Chơi Có Chịu",
      img: "data/img1.jpg",
    },
    {
      id: 2,
      single: "NO SAY BEN-LEG",
      src: "https://res.cloudinary.com/dd4k5r61c/video/upload/v1672154911/Music%20Website/audio/Thu%E1%BB%91c_l%C3%A0o_Ngh%E1%BB%87_an_dl1a6f.mp3?fbclid=IwAR2AxMb7QchxAj4ULtD1DDKCZ5Oq8WFVr-0yCY4FTAfHvK_X03ILjOoPtW4",
      name: "Thuốc lào Nghệ an (không say)",
      img: "data/img3.jpg",
    },
    {
      id: 3,
      single: "Takeshi",
      src: "data/SieuNhanCuongPhong.mp3",
      name: "Hurricaneger Sanjō (Siêu Nhân Cuồng Phong OST) ",
      img: "data/img2.jpg",
    },
  ];

  const audioRef = React.useRef();
  const [index, setIndex] = React.useState(0);
  const theme = useTheme();
  const duration = 200; // seconds
  const [position, setPosition] = React.useState(0);
  const [durations, setDurations] = useState(0);
  const [paused, setPaused] = React.useState(false);

  // play and pause
  const handlePausePlayClick = () => {
    if (paused) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPaused(!paused);
  };

  // load data
  const handleLoadedData = () => {
    setDurations(audioRef.current.duration);
    if (!paused) {
      audioRef.current.play();
      setPaused(!paused);
    }
  };

  // change slide
  const handleTimeSliderChange = (value) => {
    audioRef.current.currentTime = value;
    setPosition(value);

    if (!paused) {
      setPaused(true);
      audioRef.current.play();
    }
  };

  const handleNext = () => {
    if (index == musics.length - 1) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const handlePrev = () => {
    if (index == 0) {
      setIndex(musics.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

  // formart duration
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }

  // theme
  const mainIconColor = theme.palette.mode === "dark" ? "#fff" : "#000";
  const lightIconColor =
    theme.palette.mode === "dark" ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)";
  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        background:
          "linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)",
      }}
    >
      <audio
        onLoadedData={handleLoadedData}
        ref={audioRef}
        src={musics[index].src}
        onEnded={() => {
          setPaused(false);
          handleNext();
        }}
        onTimeUpdate={() => setPosition(audioRef.current.currentTime)}
      ></audio>
      <Widget>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CoverImage>
            <img alt="can't win - Chilling Sunday" src={musics[index].img} />
          </CoverImage>
          <Box sx={{ ml: 1.5, minWidth: 0 }}>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              {musics[index].single}
            </Typography>
            <Typography noWrap>
              <b>{musics[index].name}</b>
            </Typography>
          </Box>
        </Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => {
            setPosition(Math.round(value));
            handleTimeSliderChange(value);
          }}
          sx={{
            color: theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
            height: 4,
            "& .MuiSlider-thumb": {
              width: 8,
              height: 8,
              transition: "0.3s cubic-bezier(.47,1.64,.41,.8)",
              "&:before": {
                boxShadow: "0 2px 12px 0 rgba(0,0,0,0.4)",
              },
              "&:hover, &.Mui-focusVisible": {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === "dark"
                    ? "rgb(255 255 255 / 16%)"
                    : "rgb(0 0 0 / 16%)"
                }`,
              },
              "&.Mui-active": {
                width: 20,
                height: 20,
              },
            },
            "& .MuiSlider-rail": {
              opacity: 0.28,
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(Math.round(position))}</TinyText>
          <TinyText>
            -{formatDuration(Math.round(duration) - Math.round(position))}
          </TinyText>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: -1,
          }}
        >
          <IconButton aria-label="song">
            <ShuffleIcon fontSize="medium" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton aria-label="previous song" onClick={handlePrev}>
            <FastRewindRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton
            aria-label={paused ? "play" : "pause"}
            onClick={() => {
              setPaused(!paused);
              handlePausePlayClick();
            }}
          >
            {!paused ? (
              <PlayArrowRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded
                sx={{ fontSize: "3rem" }}
                htmlColor={mainIconColor}
              />
            )}
          </IconButton>
          <IconButton aria-label="next song" onClick={handleNext}>
            <FastForwardRounded fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          <IconButton aria-label="song">
            <RepeatOneIcon fontSize="medium" htmlColor={mainIconColor} />
          </IconButton>
        </Box>
        <Stack
          spacing={2}
          direction="row"
          sx={{ mb: 1, px: 1 }}
          alignItems="center"
        >
          <VolumeDownRounded htmlColor={lightIconColor} />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            min={0}
            max={100}
            onChange={(e) => {
              audioRef.current.volume = e.target.value / 100;
            }}
            sx={{
              color:
                theme.palette.mode === "dark" ? "#fff" : "rgba(0,0,0,0.87)",
              "& .MuiSlider-track": {
                border: "none",
              },
              "& .MuiSlider-thumb": {
                width: 24,
                height: 24,
                backgroundColor: "#fff",
                "&:before": {
                  boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                },
                "&:hover, &.Mui-focusVisible, &.Mui-active": {
                  boxShadow: "none",
                },
              },
            }}
          />
          <VolumeUpRounded htmlColor={lightIconColor} />
        </Stack>
      </Widget>
    </Box>
  );
};

export default HomePage;
