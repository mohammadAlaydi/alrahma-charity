import { withAuth } from "next-auth/middleware";
import { ROUTES } from "./config/constants";

export default withAuth({
  pages: {
    signIn: ROUTES.LOGIN,
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
  ],
};
