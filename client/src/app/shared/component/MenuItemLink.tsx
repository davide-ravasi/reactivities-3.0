import { MenuItem } from "@mui/material";
import { NavLink } from "react-router";

export default function MenuItemLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <MenuItem
      component={NavLink}
      to={to}
      sx={{
        fontSize: "1.2em",
        textTransform: "uppercase",
        fontWeight: "bold",
        color: "#fff",
        "&.active": {
          color: "#fff",
          backgroundColor: "#218aae",
          borderRadius: "5px",
        },
      }}
    >
      {children}
    </MenuItem>
  );
}
