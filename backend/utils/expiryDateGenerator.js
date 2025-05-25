export const handleExpireTime = (expirationTime) => {
  const now = Date.now(); 

  let expiresAt;

  switch (expirationTime) {
    case "6h":
      expiresAt = now + 6 * 60 * 60 * 1000; // 6 hours
      break;
    case "12h":
      expiresAt = now + 12 * 60 * 60 * 1000; // 12 hours
      break;
    case "24h":
      expiresAt = now + 24 * 60 * 60 * 1000; // 24 hours
      break;
    case "7d":
      expiresAt = now + 7 * 24 * 60 * 60 * 1000; // 7 days
      break;
    case "30d":
      expiresAt = now + 30 * 24 * 60 * 60 * 1000; // 30 days
      break;
    case "90d":
      expiresAt = now + 90 * 24 * 60 * 60 * 1000; // 90 days
      break;
    default:
      expiresAt = now + 24 * 60 * 60 * 1000; // default to 24 hours
  }

  return new Date(expiresAt);
};