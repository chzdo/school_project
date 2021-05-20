import { withIronSession } from 'next-iron-session'

export default function withSession(handler) {
  return withIronSession(handler, {
    password: 'this-is-a-very-long-secret-to-keep-even-though-its-not-mine',
    cookieName: 'user',
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === 'production' ? true : false,
    },
  })
}

export const options = {
  password: process.env.SECRET,
  autoCommit: true,
  cookieName: 'user',
  cookieOptions: {
    // the next line allows to use the session in non-https environments like
    // Next.js dev mode (http://localhost:3000)
    secure: process.env.NODE_ENV === 'production' ? true : false,
  },
}