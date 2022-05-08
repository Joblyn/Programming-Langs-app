import ReactGA from "react-ga";

const useAnalyticsEventTracker = (category = "Select Assessment") => {

  
  const eventTracker = (action = "test action", label = "test label") => {
    console.log("here");
    ReactGA.event({ category, action, label });
  };
  return eventTracker;
};

export { useAnalyticsEventTracker };