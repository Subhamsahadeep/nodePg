
sequelize-auto to build the models for existing table ::
> ./node_modules/sequelize-auto/bin/sequelize-auto -h localhost -d nodelogin -u subhamsaha -p password -e postgres  -t 'users' 

to generate the random jwt secret key
> require('crypto').randomBytes(64).toString('hex')
