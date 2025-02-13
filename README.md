To run the project:
- cd api && npm run dev
- cd web && npm run dev

Create a postgres image
- docker-compose up --build 

OR

Create  new user with your superadmin user
User: curotech
Password: curotech
Database: curotech

Once DB is set, run:
> npx prisma generate
> npx prisma migrate dev
> npx prisma db seed

Now log into http://localhost:3000
and click in Login (doesnt matter what you type,
we are just faking a login page and user saved state)

PS: at the docker-compose.yml, I had web, api and postgres setup,
but got some weird issue where data was coming from the DB
(it shows it the network tab), but doesn't render in the page
