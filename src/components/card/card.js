import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/context";
import { useAnalyticsEventTracker } from "../../utilities/googleanalytics/analyticsEventTracker";

export default function CustomCard({ title, image, alt, href, ...restProps }) {
  const navigate = useNavigate();
  const { setRoute } = useContext(AppContext);

  const gaEventTracker = useAnalyticsEventTracker("Select Assessment");

  const handleAction = () => {
    gaEventTracker(title, "assessment click");
    setRoute(href);
    navigate("/assessment/name");
  };

  return (
    <Card sx={{ maxWidth: 345 }} {...restProps} className="w-80 custom-card">
      <CardActionArea onClick={handleAction}>
        <CardMedia
          component="img"
          width="345"
          height="140"
          image={image}
          alt={alt}
          style={{ height: 200 }}
        />
        <CardContent className="bg-white">
          <Typography
            gutterBottom
            variant="p"
            component="div"
            className="text-xl"
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
