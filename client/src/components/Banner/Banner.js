import { Container, makeStyles, Typography } from "@material-ui/core";
import Carousel from "./Carousel";

const useStyles = makeStyles((theme) => ({
  banner: {
    backgroundImage: 'url(./cryptoImg2.jpg)',
    backgroundPosition: 'center', 
    backgroundSize: 'cover', 
    backgroundRepeat: 'no-repeat',
    maxWidth : "100%",
    height : "auto",
    },
  bannerContent: {
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagline: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },
}));

function Banner() {
  const classes = useStyles();

  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: "bold",
              marginBottom: 15,
              fontFamily: "Montserrat",
            }}
          >
            Crypto Ranking
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: "#124358",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
            }}
          >
            Entrez le nom d'une cryptomonnaie dans la barre de recherche
          </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
}

export default Banner;
