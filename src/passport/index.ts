import passport from 'passport'
import {
  Strategy as FBStrategy,
  StrategyOptionWithRequest as FBStrategyOptionWithRequest,
} from 'passport-facebook'
import { AppRequest } from '../types'

const { FACEBOOK_APP_ID, FACEBOOK_APP_SECRET } = process.env

const FBConfig: FBStrategyOptionWithRequest = {
  clientID: FACEBOOK_APP_ID!,
  clientSecret: FACEBOOK_APP_SECRET!,
  callbackURL: 'http://localhost:5000/auth/facebook/callback',
  profileFields: ['id', 'email', 'displayName', 'name'],
  passReqToCallback: true,
}

export const PassportFB = () =>
  passport.use(
    new FBStrategy(FBConfig, (req, _, __, profile, done) => {
      try {
        if (profile) {
          ;(req as AppRequest).userProfile = profile
          done(null, profile)
        }
      } catch (error) {
        done(error)
      }
    })
  )
