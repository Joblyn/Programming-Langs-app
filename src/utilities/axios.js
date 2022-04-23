import axios from "axios";

export const client = axios.create({
  baseURL: "http://woshipbackend.interviewblindspots.com/survey/x3/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
