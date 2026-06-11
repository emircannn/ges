import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/nivaart/login",
  },
});

export const config = {
  matcher: ["/nivaart/dashboard/:path*"],
};
