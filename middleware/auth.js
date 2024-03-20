const passport = require('passport');
const {Strategy, ExtractJwt}= require('passport-jwt');
const Estudiante = require('../models/estudianteModel');

const jwt_secret = 'mysecrettoken'

const strategy = new Strategy(
    {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey:jwt_secret
    },
    async(jwtPayload, done) => {
        try {
            const estudiante = await Estudiante.findById({userId: jwtPayload.id});
            if(!estudiante){
                const error = new Error('Estudiante no encontrado')
                console.log(error)
            }
            done(null, estudiante);
        } catch (error) {
            done(error)
        }
    }
);

passport.use(strategy);

const initialize = ()=>{
    return passport.initialize();
}

const authenticate  = ()=>{
    return passport.authenticate('jwt',{session:false});
}

module.exports = {
    initialize,
    authenticate,
}