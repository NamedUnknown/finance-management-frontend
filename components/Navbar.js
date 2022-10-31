import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';

import { useSelector, useDispatch } from "react-redux"
import { logOutUser, getIsAuthenticated, getUser } from "../store/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);
  const user = useSelector(getUser);
  const loginMethods = [
    {
      name: "github",
      img: "/github.png"
    },
    {
      name: "google",
      img: "/google.png"
    }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: "10px" }}>
      <AppBar position="static" sx={{
        backgroundColor: "#272730",
        borderRadius: "50px",
        height: "fit-content",
        py: "10px",
        px: "20px"
      }}>
        <Box sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}>
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            mr: 3
          }}>
            LOG IN:
          </Box>
          {
            loginMethods.map((method, index) =>
              <Box key={index} sx={{
                width: "38px", height: "38px",
                borderRadius: 2,
                backgroundColor: "white",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(8.5px)",
                "-webkit-backdrop-filter": "blur(8.5px)",
                mx: "10px",
                "&:hover": {
                  transition: "0.3s ease-in",
                  transform: "scale(1.07)"
                },
                cursor: "pointer"
              }}>
                <Box
                  component="img"
                  sx={{
                    width: "30px",
                    height: "30px",
                    position: "relative",
                    top: "4px",
                    left: "4px",
                  }}
                  src={method.img}
                  alt={method.name} />
              </Box>)
          }
        </Box>
      </AppBar>
    </Box>
  );
}