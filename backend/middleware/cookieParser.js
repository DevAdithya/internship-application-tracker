/**
 * Lightweight zero-dependency cookie parser middleware
 */
export default function cookieParser() {
  return (req, res, next) => {
    req.cookies = req.cookies || {};
    const cookieHeader = req.headers.cookie;

    if (cookieHeader) {
      cookieHeader.split(";").forEach((cookie) => {
        const parts = cookie.split("=");
        const name = parts.shift().trim();
        const value = decodeURIComponent(parts.join("="));
        if (name) {
          req.cookies[name] = value;
        }
      });
    }

    next();
  };
}
