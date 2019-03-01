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

    app.post('/api/account/signup', (req, res, next) => {
        const { body } = req;
        const {
            firstName,
            lastName,
            email,
            password
        } = body;

        if(!firstName) {
            res.end({
                succes: false,
                message: 'Error: First name cannot be blank'
            });
        }
        if(!lastName) {
            res.end({
                succes: false,
                message: 'Error: Last name cannot be blank'
            });
        }
        if(!email) {
            res.end({
                succes: false,
                message: 'Error: Email cannot be blank'
            });
        }
        if(!password) {
            res.end({
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
                res,end({
                    succes: false,
                    message: 'Error: Server error'
                });
            }else if(previousUsers.length > 0) {
                res,end({
                    succes: false,
                    message: 'Error: Server error'
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
                    res,end({
                        succes: false,
                        message: 'Error: Server error'
                    });
                }
                res,end({
                    succes: true,
                    message: 'Signed Up'
                });
            }


        });


    });

};

