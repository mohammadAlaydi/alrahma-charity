import { withAuth } from "next-auth/middleware";
import { ROUTES, PROTECTED_ROUTES } from "@/config/constants";

export default withAuth({
  pages: {
    signIn: ROUTES.LOGIN,
  },
});

export const config = {
  matcher: PROTECTED_ROUTES.map((route) => `${route}/:path*`),
};
