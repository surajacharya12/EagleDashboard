const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://eagle-backend-suraj-acharyas-projects-0bbb95ae.vercel.app"
    : "http://localhost:3001";

export default API_URL;
