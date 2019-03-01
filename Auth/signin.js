const User = require('../../models/User')

module.exports = (app) => {
    /*
    app.get('/api/counters', (req, res, next) => {
      Counter.find()
        .exec()
        .then((counter) => res.json(counter))
        .catch((err) => next(err));
    });
  
    app.post('/api/counters', function (req, res, next) {
      const counter = new Counter();
  
      counter.save()
        .then(() => res.json(counter))
        .catch((err) => next(err));
    });
    */

    app.post('/api/account/signin', (req, res, next) => {
        const { body } = req;
        const {
            password
        } = body;
        let {
            email
        } = body;

        if(!firstName) {
            return res.send({
                succes: false,
                message: 'Error: First name cannot be blank'
            });
        }
        if(!lastName) {
            return res.send({
                succes: false,
                message: 'Error: Last name cannot be blank'
            });
        }
        if(!email) {
            return res.send({
                succes: false,
                message: 'Error: Email cannot be blank'
            });
        }
        if(!password) {
            return res.send({
                succes: false,
                message: 'Error: password cannot be blank'
            });
        }

        email = email.toLowerCase();



        //1. Verify email doesnt exist 
        //2. Save 
        User.find({
            email: email,
        }, (err, previousUsers) => {
            if(err){
                return res.send({
                    succes: false,
                    message: 'Error: Username Error'
                });
            }else if(previousUsers.length > 0) {
                return res.send({
                    succes: false,
                    message: 'Error: UsernameError'
                });
            }

            //Save the new user
            const newUser = new User();

            newUser.email = email;
            newUser.firstName = firstName;
            newUser.lastName = lastName;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err){
                    return res.send({
                        succes: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    succes: true,
                });
            });
        });
    });
};

