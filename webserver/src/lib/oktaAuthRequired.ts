import { oktaJwtVerifier } from './oktaJwtVerifier';

export const oktaAuthRequired = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization || '';
  console.log({authHeader});
  const match = authHeader.match(/Bearer (.+)/);
  console.log({match});

  if (!match) {
    res.status(401);
    return next('Unauthorized');
  }

  const accessToken = match[1];
  const audience = 'api://default';
  return (
    oktaJwtVerifier
      .verifyAccessToken(accessToken, audience)
      .then((jwt: any) => {
        req.jwt = jwt;
        console.log(jwt);
        next();
      })
      .catch((err: any) => {
        res.status(401).send(err.message);
        console.log(err.message);
      })
  );
};

